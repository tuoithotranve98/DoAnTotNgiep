package com.doan.maintenancecard.service.impl;

import com.doan.maintenancecard.converter.MaintenanceCardConverter;
import com.doan.maintenancecard.dto.MaintenanceCardDTO;
import com.doan.maintenancecard.entity.MaintenanceCard;
import com.doan.maintenancecard.entity.MaintenanceCardDetail;
import com.doan.maintenancecard.entity.MaintenanceCardDetailStatusHistory;
import com.doan.maintenancecard.entity.PaymentHistory;
import com.doan.maintenancecard.exception.CodeExistedException;
import com.doan.maintenancecard.exception.commonException.NotFoundException;
import com.doan.maintenancecard.exception.commonException.UnknownException;
import com.doan.maintenancecard.exception.maintenanceCardException.NotEnoughProductException;
import com.doan.maintenancecard.exception.maintenanceCardException.NotFoundRepairmanException;
import com.doan.maintenancecard.exception.maintenanceCardException.NotUpdateException;
import com.doan.maintenancecard.kafka.ProductModel;
import com.doan.maintenancecard.kafka.SendMessage;
import com.doan.maintenancecard.kafka.SendToClient;
import com.doan.maintenancecard.kafka.VehicleModel;
import com.doan.maintenancecard.model.MaintenanceCardCustomer;
import com.doan.maintenancecard.model.MaintenanceCardFilter;
import com.doan.maintenancecard.model.MaintenanceCardUser;
import com.doan.maintenancecard.model.MaintenanceCardsFilterRequest;
import com.doan.maintenancecard.model.MaintenanceCardsMapper;
import com.doan.maintenancecard.model.MaintenanceCardsModel;
import com.doan.maintenancecard.model.MaintenanceCardsResponse;
import com.doan.maintenancecard.model.MessageModel;
import com.doan.maintenancecard.repository.MaintenanceCardDetailRepository;
import com.doan.maintenancecard.repository.MaintenanceCardRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.doan.maintenancecard.service.MaintenanceCardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class MaintenanceCardServiceImpl implements MaintenanceCardService {

    private final MaintenanceCardConverter maintenanceCardConverter;
    private final MaintenanceCardRepository maintenanceCardRepository;
    private final MaintenanceCardDetailRepository maintenanceCardDetailRepository;
    private final MaintenanceCardsMapper maintenanceCardsMapper;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final SendMessage sendMessage;
    private final SendToClient sendToClient;

    @Override
    public MaintenanceCardDTO insertMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO, String tenantId) throws CodeExistedException {
        MaintenanceCard maintenanceCard = maintenanceCardConverter.convertToEntity(maintenanceCardDTO);
        maintenanceCard.setCreatedDate(new Date());
        maintenanceCard.setModifiedDate(new Date());
        maintenanceCard.setTenantId(Long.parseLong(tenantId));
        long total = 0L;
        boolean check = true;
        for (MaintenanceCardDetail mcDetail : maintenanceCard.getMaintenanceCardDetails()) {
            mcDetail.setCreatedDate(new Date());
            mcDetail.setModifiedDate(new Date());
            mcDetail.setMaintenanceCard(maintenanceCard);
            mcDetail.setMaintenanceCardDetailStatusHistories(new ArrayList<>());
            // check them so luong
            // Giam so luong trong kho: so luong con lai = so luong hien tai - so luong trong phieu sua chua
            // type = 1: linh kien
            // type = 2: dich vu
            if (mcDetail.getProductId() != 0 && mcDetail.getProductType() == 1) {
                ProductModel productModel = new ProductModel();
                productModel.setAmountChargeInUnit(mcDetail.getQuantity());
                productModel.setCode(mcDetail.getProductCode());
                productModel.setStatus(0);
                CompletableFuture.runAsync(() -> sendMessage.sendToProduct(productModel, String.valueOf(mcDetail.getProductId())));
            }
            MaintenanceCardDetailStatusHistory mcDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
            mcDetailStatusHistory.setCreatedDate(new Date());
            mcDetailStatusHistory.setModifiedDate(new Date());
            mcDetailStatusHistory.setMaintenanceCardDetail(mcDetail);
            mcDetailStatusHistory.setStatus((byte) 0);
            mcDetail.getMaintenanceCardDetailStatusHistories().add(mcDetailStatusHistory);
            total += mcDetail.getPrice().longValue() * mcDetail.getQuantity();
            check = false;
        }
        maintenanceCard.setPrice(BigDecimal.valueOf(total));
        maintenanceCard.setPlatesNumber(maintenanceCard.getPlatesNumber().toLowerCase());
        // code = null -> generate code
        if (StringUtils.isBlank(maintenanceCard.getCode())) {
            maintenanceCard.setCode(createNewCode());
        } else {
            int checkCode = maintenanceCardRepository.checkCode(maintenanceCard.getCode().toLowerCase(), 0L);
            if (checkCode != 0) throw new CodeExistedException("Code existed");
            maintenanceCard.setCode(maintenanceCard.getCode().toLowerCase());
        }
        // set trạng thái phiếu
        if (!(!check || maintenanceCard.getMaintenanceCardDetails().isEmpty())) {
            maintenanceCard.setWorkStatus((byte) 2);
        } else {
            maintenanceCard.setWorkStatus((byte) 0);
        }
        MaintenanceCard newMC = maintenanceCardRepository.save(maintenanceCard);
        //gửi thông báo đến nhân viên
        if (newMC.getRepairmanId() != 0) {
            CompletableFuture.runAsync(() -> sendToClient.sendNotificationToClient(newMC, 1));
        }
        //cập nhật xe, nhân viên
        CompletableFuture.runAsync(() -> {
            sendMessage.sendToCustomer(newMC);
            sendMessage.sendToUser(String.valueOf(newMC.getRepairmanId()), "1");
        });
        return maintenanceCardConverter.convertAllToDTO(newMC);
    }

    @Override
    public Map<String, Object> searchMaintenanceCard(MaintenanceCardFilter maintenanceCardFilter, String email, int role) {
        int page = maintenanceCardFilter.getPage();
        int size = maintenanceCardFilter.getSize();
        String search = maintenanceCardFilter.getSearch();
        String nameField = maintenanceCardFilter.getNameField();
        String order = maintenanceCardFilter.getOrder();
        byte[] workStatus = maintenanceCardFilter.getWorkStatus();
        byte[] payStatus = maintenanceCardFilter.getPayStatus();
        Long tenantId = maintenanceCardFilter.getTenantId();
        Pageable paging = PageRequest.of(page - 1, size, Sort.by("modifiedDate").descending());

        if (!nameField.equals("")) {
            paging = PageRequest.of(page - 1, size, Sort.by(nameField));
            if (order.equals("descend")) {
                paging = PageRequest.of(page - 1, size, Sort.by(nameField).descending());
            }
        }
        Page<MaintenanceCard> maintenanceCardPage = maintenanceCardRepository.search(paging, search, workStatus, payStatus, email, role, tenantId);
        List<MaintenanceCardDTO> maintenanceCardDTOList = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<MaintenanceCard> maintenanceCards = maintenanceCardPage.getContent();
        for (MaintenanceCard maintenanceCard : maintenanceCards) {
            maintenanceCardDTOList.add(maintenanceCardConverter.convertToDTO(maintenanceCard));
        }
        map.put("maintenanceCards", maintenanceCardDTOList);
        map.put("currentPage", maintenanceCardPage.getNumber() + 1);
        map.put("totalItems", maintenanceCardPage.getTotalElements());
        map.put("totalPages", maintenanceCardPage.getTotalPages());
        return map;
    }

    @Override
    public MaintenanceCardDTO getMaintenanceCardById(Long id, String email, int role) throws NotFoundException {

        MaintenanceCard maintenanceCard = maintenanceCardRepository.getMaintenanceCardByIdAndEmail(id, email, role);
        if (maintenanceCard == null) {
            throw new NotFoundException("Not found maintenance card");
        }
        return maintenanceCardConverter.convertAllToDTO(maintenanceCard);

    }

    @Override
    public MaintenanceCardDTO updateMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO, String email, int role) throws NotFoundException, CodeExistedException, NotUpdateException, UnknownException, JsonProcessingException {

        MaintenanceCard maintenanceCardUpdate = maintenanceCardRepository.getMaintenanceCardByIdAndCoordinatorEmail(maintenanceCardDTO.getId(), email, role);
        if (maintenanceCardUpdate == null) {
            throw new NotFoundException("Not found maintenance card");
        }
        if (maintenanceCardUpdate.getReturnDate() != null) {
            throw new NotUpdateException();
        }
        byte status = 0;
        boolean check = true;
        boolean checkNull = true;

        MaintenanceCard maintenanceCard = maintenanceCardConverter.convertToEntity(maintenanceCardDTO);
        if (maintenanceCard.getMaintenanceCardDetails().isEmpty()) {
            checkNull = false;
        }
        ObjectMapper mapper = new ObjectMapper();
        maintenanceCard.setCreatedDate(maintenanceCardUpdate.getCreatedDate());
        maintenanceCard.setModifiedDate(new Date());
        long total = 0L;
        Long[] maintenanceCardDetailId = new Long[10000];
        int dem = 0;
        for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCard.getMaintenanceCardDetails()) {
            maintenanceCardDetailId[dem] = maintenanceCardDetail.getId();
            dem++;
            MaintenanceCardDetail maintenanceCardDetail1Update = null;
            if (maintenanceCardDetail.getId() != null) {
                maintenanceCardDetail1Update = maintenanceCardDetailRepository.findById(maintenanceCardDetail.getId()).orElse(null);
            }
            // neu them moi
            if (maintenanceCardDetail1Update == null) {
                maintenanceCardDetail.setCreatedDate(new Date());
                maintenanceCardDetail.setModifiedDate(new Date());
                maintenanceCardDetail.setMaintenanceCard(maintenanceCard);
                if (maintenanceCardDetail.getProductId() != 0 && maintenanceCardDetail.getProductType() == 1) {
                    ProductModel productModel = new ProductModel();
                    productModel.setAmountChargeInUnit(maintenanceCardDetail.getQuantity());
                    productModel.setCode(maintenanceCardDetail.getProductCode());
                    productModel.setStatus(1);
                    String jsonString = mapper.writeValueAsString(productModel);
                    ProducerRecord<String, String> record = new ProducerRecord<String, String>("dk3w4sws-product", maintenanceCardDetail.getProductId() + "", jsonString);
                    kafkaTemplate.send(record);
                    total += maintenanceCardDetail.getPrice().longValue() * maintenanceCardDetail.getQuantity();
                } else if (maintenanceCardDetail.getProductId() != 0) {
                    MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                    maintenanceCardDetailStatusHistory.setCreatedDate(new Date());
                    maintenanceCardDetailStatusHistory.setModifiedDate(new Date());
                    maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                    maintenanceCardDetailStatusHistory.setStatus((byte) 0);
                    List<MaintenanceCardDetailStatusHistory> maintenanceCardDetailStatusHistories = new ArrayList<>();
                    maintenanceCardDetailStatusHistories.add(maintenanceCardDetailStatusHistory);
                    maintenanceCardDetail.setMaintenanceCardDetailStatusHistories(maintenanceCardDetailStatusHistories);
                    total += maintenanceCardDetail.getPrice().longValue();
                    check = false;
                }
            }
            // neu da ton tai
            else {
                maintenanceCardDetail.setCreatedDate(maintenanceCardDetail1Update.getCreatedDate());
                maintenanceCardDetail.setMaintenanceCard(maintenanceCard);
                maintenanceCardDetail.setStatus(maintenanceCardDetail1Update.getStatus());
                maintenanceCardDetail.setModifiedDate(new Date());
                // so luong con lai = so luong trong kho - chenh lech giua phieu sua chua truoc va sau
                if (maintenanceCardDetail.getProductId() != 0 && maintenanceCardDetail.getProductType() == 1) {
                    if (maintenanceCardDetail.getQuantity() - maintenanceCardDetail1Update.getQuantity() != 0) {
                        ProductModel productModel = new ProductModel();
                        productModel.setAmountChargeInUnit(maintenanceCardDetail.getQuantity() - maintenanceCardDetail1Update.getQuantity());
                        productModel.setCode(maintenanceCardDetail.getProductCode());
                        if (maintenanceCardDetail.getQuantity() - maintenanceCardDetail1Update.getQuantity() > 0) {
                            productModel.setStatus(2);
                        } else {
                            productModel.setStatus(1);
                        }
                        String jsonString = mapper.writeValueAsString(productModel);
                        ProducerRecord<String, String> record = new ProducerRecord<String, String>("dk3w4sws-product", maintenanceCardDetail.getProductId() + "", jsonString);
                        kafkaTemplate.send(record);
                    }
                    total += maintenanceCardDetail.getPrice().longValue() * maintenanceCardDetail.getQuantity();
                } else if (maintenanceCardDetail.getProductId() != 0) {
                    total += maintenanceCardDetail.getPrice().longValue();
                    if (maintenanceCardDetail1Update.getStatus() != 0) {
                        status = 1;
                    }
                    if (maintenanceCardDetail1Update.getStatus() != 2) {
                        check = false;
                    }
                }
                maintenanceCardDetail.setMaintenanceCardDetailStatusHistories(maintenanceCardDetail1Update.getMaintenanceCardDetailStatusHistories());
            }
        }
        maintenanceCard.setPrice(BigDecimal.valueOf(total));
        for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCardUpdate.getMaintenanceCardDetails()) {
            if (!ArrayUtils.contains(maintenanceCardDetailId, maintenanceCardDetail.getId())) {
                if (maintenanceCardDetail.getIsDelete() == 0) {
                    if (!(maintenanceCardDetail.getProductType() == 2 && maintenanceCardDetail.getStatus() != 0)) {
                        if (maintenanceCardDetail.getProductId() != 0 && maintenanceCardDetail.getProductType() == 1) {
                            ProductModel productModel = new ProductModel();
                            productModel.setAmountChargeInUnit(-maintenanceCardDetail.getQuantity());
                            productModel.setCode(maintenanceCardDetail.getProductCode());
                            productModel.setStatus(2);
                            String jsonString = mapper.writeValueAsString(productModel);
                            ProducerRecord<String, String> record = new ProducerRecord<String, String>("dk3w4sws-product", maintenanceCardDetail.getProductId() + "", jsonString);
                            kafkaTemplate.send(record);
                        } else {
                            MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                            maintenanceCardDetailStatusHistory.setCreatedDate(new Date());
                            maintenanceCardDetailStatusHistory.setModifiedDate(new Date());
                            maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                            maintenanceCardDetailStatusHistory.setStatus((byte) (-1));
                            maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);
                        }
                        maintenanceCardDetail.setIsDelete((byte) 1);

                    }
                }
                maintenanceCard.getMaintenanceCardDetails().add(maintenanceCardDetail);
            }
        }
        maintenanceCard.setCode(maintenanceCard.getCode().toLowerCase());
        if (maintenanceCard.getCode() == null || maintenanceCard.getCode().length() == 0) {
            maintenanceCard.setCode(maintenanceCardUpdate.getCode());
        } else {
            if (maintenanceCardRepository.checkCode(maintenanceCard.getCode(), maintenanceCard.getId()) > 0) {
                throw new CodeExistedException("Code existed");
            }
        }
        if (check) {
            maintenanceCard.setWorkStatus((byte) 2);

        } else {
            maintenanceCard.setWorkStatus(status);
        }
        if (!checkNull) {
            maintenanceCard.setWorkStatus((byte) 0);
        }
        long temp = 0L;
        for (PaymentHistory paymentHistory : maintenanceCardUpdate.getPaymentHistories()) {
            temp += paymentHistory.getMoney().longValue();
        }
        if (temp < total || !checkNull) {
            maintenanceCard.setPayStatus((byte) 0);
        } else {
            maintenanceCard.setPayStatus((byte) 1);
        }
        maintenanceCard.setCoordinatorEmail(maintenanceCardUpdate.getCoordinatorEmail());
        maintenanceCard.setCoordinatorId(maintenanceCardUpdate.getCoordinatorId());
        maintenanceCard.setCoordinatorName(maintenanceCardUpdate.getCoordinatorName());
        maintenanceCard.setCustomerId(maintenanceCardUpdate.getCustomerId());
        maintenanceCard.setCustomerName(maintenanceCardUpdate.getCustomerName());
        maintenanceCard.setCustomerPhone(maintenanceCardUpdate.getCustomerPhone());
        maintenanceCard.setPaymentHistories(maintenanceCardUpdate.getPaymentHistories());
        maintenanceCard.setModifiedDate(new Date());
        if (maintenanceCard.getWorkStatus() != 2 || maintenanceCard.getPayStatus() != 1) {
            maintenanceCard.setReturnDate(null);
        } else {
            if (maintenanceCard.getReturnDate() != null) {
                ProducerRecord<String, String> record2 = new ProducerRecord<String, String>("dk3w4sws-user", maintenanceCard.getRepairmanId() + "", "-1");
                kafkaTemplate.send(record2);
                Date returnDate = maintenanceCard.getReturnDate();
                if (returnDate.compareTo(new Date()) > 0) {
                    throw new UnknownException();
                }
            }
        }
        maintenanceCard.setPlatesNumber(maintenanceCardDTO.getPlatesNumber().toLowerCase());
        if (maintenanceCardUpdate.getRepairmanId() != 0) {
            maintenanceCard.setRepairmanEmail(maintenanceCardUpdate.getRepairmanEmail());
            maintenanceCard.setRepairmanId(maintenanceCardUpdate.getRepairmanId());
            maintenanceCard.setRepairmanName(maintenanceCardUpdate.getRepairmanName());
        } else {
            if (maintenanceCard.getRepairmanId() != 0) {
                maintenanceCard.setRepairmanName(maintenanceCardDTO.getRepairman().getName());
                ProducerRecord<String, String> record2 = new ProducerRecord<String, String>("dk3w4sws-user", maintenanceCard.getRepairmanId() + "", "1");
                kafkaTemplate.send(record2);
                MessageModel messageModel = new MessageModel();
                messageModel.setMaintenanceCardCode(maintenanceCard.getCode());
                messageModel.setAuthor(email);
                messageModel.setCoordinatorEmail(maintenanceCard.getCoordinatorEmail());
                messageModel.setRepairmanEmail(maintenanceCard.getRepairmanEmail());
                messageModel.setType(1);
                String jsonString = mapper.writeValueAsString(messageModel);
                ProducerRecord<String, String> record = new ProducerRecord<String, String>("dk3w4sws-message", maintenanceCard.getId() + "", jsonString);
                kafkaTemplate.send(record);
            }
        }
        try {
            MaintenanceCard maintenanceCard1 = maintenanceCardRepository.save(maintenanceCard);
            MessageModel messageModel = new MessageModel();
            messageModel.setMaintenanceCardCode(maintenanceCard1.getCode());
            messageModel.setAuthor(email);
            messageModel.setCoordinatorEmail(maintenanceCard1.getCoordinatorEmail());
            messageModel.setRepairmanEmail(maintenanceCard1.getRepairmanEmail());
            if (maintenanceCard1.getWorkStatus() == 2 && maintenanceCard1.getPayStatus() == 0) {
                messageModel.setType(2);
            } else {
                messageModel.setType(3);
            }
            String jsonString = mapper.writeValueAsString(messageModel);
            ProducerRecord<String, String> record = new ProducerRecord<String, String>("dk3w4sws-message", maintenanceCard1.getId() + "", jsonString);
            kafkaTemplate.send(record);
            VehicleModel vehicleModel = new VehicleModel();
            vehicleModel.setColor(maintenanceCard.getColor());
            vehicleModel.setModel(maintenanceCard.getModel());
            vehicleModel.setPlateNumber(maintenanceCard.getPlatesNumber());
            String jsonString2 = mapper.writeValueAsString(vehicleModel);
            ProducerRecord<String, String> record2 = new ProducerRecord<String, String>("dk3w4sws-customer", maintenanceCard1.getCustomerId() + "", jsonString2);
            kafkaTemplate.send(record2);
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);

        } catch (Exception e) {
            e.printStackTrace();
            throw new UnknownException();
        }
    }

    @Override
    public MaintenanceCardDTO updateAllStatusMaintenanceCard(Long id, String email, int role) throws NotFoundException, NotFoundRepairmanException, JsonProcessingException {
        Date now = new Date();
        MaintenanceCard maintenanceCard = maintenanceCardRepository.getMaintenanceCardByIdAndRepairmanEmail(id, email, role);
        if (maintenanceCard == null) {
            throw new NotFoundException("Not found maintenance card");
        }
        if (maintenanceCard.getRepairmanId() != 0) {
            byte workStatus = 2;
            maintenanceCard.setWorkStatus(workStatus);
            for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCard.getMaintenanceCardDetails()) {
                if (maintenanceCardDetail.getProductType() == 2) {
                    byte dis = 1;
                    for (byte i = (byte) (maintenanceCardDetail.getStatus() + dis); i <= 2; i++) {
                        MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                        maintenanceCardDetailStatusHistory.setCreatedDate(now);
                        maintenanceCardDetailStatusHistory.setModifiedDate(now);
                        maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                        maintenanceCardDetailStatusHistory.setStatus((byte) (i));
                        maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);
                    }
                    maintenanceCardDetail.setStatus(workStatus);

                }
            }
            MaintenanceCard maintenanceCard1 = maintenanceCardRepository.save(maintenanceCard);
            MessageModel messageModel = new MessageModel();
            messageModel.setMaintenanceCardCode(maintenanceCard1.getCode());
            messageModel.setAuthor(email);
            messageModel.setCoordinatorEmail(maintenanceCard1.getCoordinatorEmail());
            messageModel.setRepairmanEmail(maintenanceCard1.getRepairmanEmail());
            if (maintenanceCard1.getWorkStatus() == 2 && maintenanceCard1.getPayStatus() == 0) {
                messageModel.setType(2);
            } else {
                messageModel.setType(3);
            }
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(messageModel);
            ProducerRecord<String, String> record = new ProducerRecord<String, String>("dk3w4sws-message", maintenanceCard1.getId() + "", jsonString);
            kafkaTemplate.send(record);
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
        } else {
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard);
        }
    }

    @Override
    public boolean deleteMaintenanceCard(Long id) throws NotFoundException, NotFoundRepairmanException, NotEnoughProductException, UnknownException, JsonProcessingException {
        MaintenanceCard maintenanceCard = maintenanceCardRepository.findById(id).orElse(null);
        if (maintenanceCard == null) {
            throw new NotFoundException("Not found maintenance card");
        }
        ObjectMapper mapper = new ObjectMapper();
        if (maintenanceCard.getWorkStatus() == 0 && maintenanceCard.getPayStatus() == 0 && maintenanceCard.getPaymentHistories().size() == 0) {

            for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCard.getMaintenanceCardDetails()) {
                if (maintenanceCardDetail.getProductType() == 2) {
                    ProductModel productModel = new ProductModel();
                    productModel.setAmountChargeInUnit(-maintenanceCardDetail.getQuantity());
                    productModel.setCode(maintenanceCardDetail.getProductCode());
                    productModel.setStatus(2);
                    String jsonString = mapper.writeValueAsString(productModel);
                    ProducerRecord<String, String> record = new ProducerRecord<String, String>("dk3w4sws-product", maintenanceCardDetail.getProductId() + "", jsonString);
                    kafkaTemplate.send(record);
                }
                maintenanceCardDetail.setIsDelete((byte) 1);
            }
            maintenanceCardRepository.delete(maintenanceCard);
            return true;
        } else {
            throw new UnknownException();
        }

    }

    @Override
    public Map<String, Object> getMaintenanceCardByRepairMan(MaintenanceCardUser user) {
        Page<MaintenanceCard> page;
        Pageable pageable;
        if (user.isDescending()) {
            pageable = PageRequest.of(user.getPage() - 1, user.getSize(),
                Sort.by(user.getSortBy().length() == 0 ? "id" : user.getSortBy()).descending());
        } else {
            pageable = PageRequest.of(user.getPage() - 1, user.getSize(), Sort.by(user.getSortBy().length() == 0 ? "id" : user.getSortBy()).ascending());
        }
        if ((user.getPayStatus() != null && user.getPayStatus().length > 0) || (user.getWorkStatus() != null && user.getWorkStatus().length > 0)) {
            page = maintenanceCardRepository.filterByWsandPs(pageable, user.getId(), user.getWorkStatus(), user.getPayStatus(), user.getCode());
        } else {
            page = maintenanceCardRepository.getMaintenanceCardByRepairMan(pageable, user.getId(), user.getCode());
        }
        List<MaintenanceCardDTO> maintenanceCardDTO = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        page.toList().forEach(maintenanceCard -> maintenanceCardDTO.add(maintenanceCardConverter.convertToDTO(maintenanceCard)));
        map.put("staffHistoryMainCards", maintenanceCardDTO);
        map.put("totalPages", page.getTotalPages());
        map.put("totalItems", page.getTotalElements());
        map.put("currentPage", user.getPage());
        return map;

    }

    @Override
    public MaintenanceCardDTO setReturnDate(long id) {
        MaintenanceCard maintenanceCard = maintenanceCardRepository.findById(id).orElse(null);
        Date now = new Date();
        maintenanceCard.setReturnDate(now);
        return maintenanceCardConverter.convertAllToDTO(maintenanceCard);
    }

    public String createNewCode() {
        long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode;
        getMaxCode = maintenanceCardRepository.getMaxCode(index);
        if (getMaxCode == null) {
            getMaxCode = "0";
        } else {
            boolean result = StringUtils.isNumeric(getMaxCode);
            if (!result) {
                getMaxCode = null;
                index++;
            } else {
                getMaxCode = getMaxCode;
            }
        }
        while (getMaxCode == null) {
            getMaxCode = maintenanceCardRepository.getMaxCode(index);
            if (getMaxCode == null) {
                getMaxCode = "0";
            } else {
                boolean result = StringUtils.isNumeric(getMaxCode);
                if (!result) {
                    getMaxCode = null;
                    index++;
                } else {
                    getMaxCode = getMaxCode;
                }
            }
        }
        codeNumber = Long.parseLong(getMaxCode) + 1;
        newCodeString = "mc00" + Long.toString(codeNumber);
        return newCodeString;
    }

    @Override
    public Map<String, Object> getMaintenanceCardByIdCustomer(
        MaintenanceCardCustomer maintenanceCardCustomer) {

        int page = maintenanceCardCustomer.getPage();
        int size = maintenanceCardCustomer.getSize();
        String search = maintenanceCardCustomer.getSearch();
        Long id = maintenanceCardCustomer.getId();
        String nameField = maintenanceCardCustomer.getNameField();
        String order = maintenanceCardCustomer.getOrder();
        byte[] payStatus = maintenanceCardCustomer.getPayStatus();
        byte[] workStatus = maintenanceCardCustomer.getWorkStatus();
        Pageable paging = PageRequest.of(page - 1, size, Sort.by("modifiedDate").descending());

        if (!nameField.equals("")) {
            paging = PageRequest.of(page - 1, size, Sort.by(nameField));
            if (order.equals("descend")) {
                paging = PageRequest.of(page - 1, size, Sort.by(nameField).descending());
            }
        }

         Page<MaintenanceCard> maintenanceCardPage =
             maintenanceCardRepository.getMaintenanceCardByIdCustomer(paging, id, search, payStatus, workStatus);

        List<MaintenanceCardDTO> maintenanceCardDTOS = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<MaintenanceCard> maintenanceCards = maintenanceCardPage.getContent();
        for (MaintenanceCard maintenanceCard : maintenanceCards) {
            maintenanceCardDTOS.add(maintenanceCardConverter.convertToDTO(maintenanceCard));
        }
        if (maintenanceCardPage.getContent().size() == 0) {
            map.put("historyMainCards", maintenanceCardDTOS);
            map.put("currentPage", 0);
            map.put("totalItems", 0);
            map.put("totalPages", 0);
            return map;
        }
        map.put("historyMainCards", maintenanceCardDTOS);
        map.put("currentPage", maintenanceCardPage.getNumber() + 1);
        map.put("totalItems", maintenanceCardPage.getTotalElements());
        map.put("totalPages", maintenanceCardPage.getTotalPages());
        return map;
    }

    @Override
    public MaintenanceCardsResponse getMaintenanceCard(MaintenanceCardsFilterRequest filter){
        MaintenanceCardsResponse maintenanceCardsResponse = new MaintenanceCardsResponse();
        maintenanceCardsResponse.getMetadata().setPage(filter.getPage());
        maintenanceCardsResponse.getMetadata().setLimit(filter.getLimit());
        filter.setPage(maintenanceCardsResponse.getMetadata().getPage());
        filter.setLimit(maintenanceCardsResponse.getMetadata().getLimit());
        List<MaintenanceCardsModel> maintenanceCardsModels = getMaintenanceCards(filter);
        maintenanceCardsResponse.setMaintenanceCardsModels(maintenanceCardsModels);
        maintenanceCardsResponse.getMetadata().setTotal(setFilterCount(filter));
        return maintenanceCardsResponse;
    }

    public List<MaintenanceCardsModel> getMaintenanceCards(MaintenanceCardsFilterRequest filter) {
        int offset = (filter.getPage() - 1) * filter.getLimit();
        String payStatusIds = StringUtils.join(filter.getPayStatus(), ",");
        String workStatusIds = StringUtils.join(filter.getWorkStatus(), ",");
        List<MaintenanceCard> maintenanceCards = filter(offset, filter.getLimit(), filter.getQuery(), payStatusIds, workStatusIds, filter.getFrom(), filter.getTo());
        if (maintenanceCards.isEmpty()) return new ArrayList<>();
        return maintenanceCardsMapper.getMaintenanceCardsModels(maintenanceCards);
    }

    private List<MaintenanceCard> filter(int offset, int size, String query, String payStatusIds, String workStatusIds, Long from, Long to) {

        try {
            if (from != null){
                Date dateFrom = getDateFromTimestamp(from);
                Date dateTo = getDateFromTimestamp(to);
                return maintenanceCardRepository.filter(query, payStatusIds, workStatusIds, dateFrom, dateTo, size, offset);
            } else {
                return maintenanceCardRepository.filter(query, payStatusIds, workStatusIds, null, null
                    , size, offset);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public int setFilterCount(MaintenanceCardsFilterRequest filterRequest) {
        try {
            String payStatusIds = StringUtils.join(filterRequest.getPayStatus(), ",");
            String workStatusIds = StringUtils.join(filterRequest.getWorkStatus(), ",");
            if (filterRequest.getFrom() != null) {
                Date dateFrom = getDateFromTimestamp(filterRequest.getFrom());
                Date dateTo = getDateFromTimestamp(filterRequest.getTo());
                return maintenanceCardRepository.filterCount(filterRequest.getQuery(), workStatusIds,
                    payStatusIds,dateFrom, dateTo);
            }else {
                return maintenanceCardRepository.filterCount(filterRequest.getQuery(), workStatusIds,
                    payStatusIds,null, null);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    private Date getDateFromTimestamp(Long timestamp) {
        return new Date(timestamp * 1000);
    }
}
