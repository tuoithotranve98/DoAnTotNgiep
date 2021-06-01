package com.doan.maintenancecard.service.impl;

import com.doan.maintenancecard.converter.MaintenanceCardConverter;
import com.doan.maintenancecard.converter.PaymentHistoryConverter;
import com.doan.maintenancecard.dto.MaintenanceCardDTO;
import com.doan.maintenancecard.dto.PaymentHistoryDTO;
import com.doan.maintenancecard.entity.MaintenanceCard;
import com.doan.maintenancecard.entity.PaymentHistory;
import com.doan.maintenancecard.entity.PaymentMethod;
import com.doan.maintenancecard.exception.commonException.NotFoundException;
import com.doan.maintenancecard.exception.commonException.UnknownException;
import com.doan.maintenancecard.exception.maintenanceCardException.MoneyExceedException;
import com.doan.maintenancecard.model.MessageModel;
import com.doan.maintenancecard.model.PaymentHistoryByIdCustomer;
import com.doan.maintenancecard.repository.MaintenanceCardRepository;
import com.doan.maintenancecard.repository.PaymentHistoryRepository;
import com.doan.maintenancecard.repository.PaymentMethodRepository;
import com.doan.maintenancecard.service.PaymentHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentHistoryServiceImpl implements PaymentHistoryService {

    private final PaymentHistoryRepository paymentHistoryRepository;
    private final MaintenanceCardRepository maintenanceCardRepository;
    private final MaintenanceCardConverter maintenanceCardConverter;
    private final PaymentHistoryConverter paymentHistoryConverter;
    private final PaymentMethodRepository paymentMethodRepository;

    @Override
    public MaintenanceCardDTO insertPaymentHistory(List<PaymentHistoryDTO> paymentHistoryDTOs, String tenantId) throws NotFoundException, MoneyExceedException {
        long total = 0L;
        Date now = new Date();
        MaintenanceCard maintenanceCard = maintenanceCardRepository.findById(paymentHistoryDTOs.get(0).getMaintenanceCard().getId()).orElse(null);
        List<PaymentMethod> paymentMethods = paymentMethodRepository.findAll();
        if (paymentMethods.isEmpty()) {
            insertPaymentMethod();
            paymentMethods = paymentMethodRepository.findAll();
        }
        if (maintenanceCard != null) {
            for (PaymentHistory paymentHistory1 : maintenanceCard.getPaymentHistories()) {
                total += paymentHistory1.getMoney().longValue();
            }
            for (PaymentHistoryDTO paymentHistoryDTO : paymentHistoryDTOs) {
                PaymentHistory paymentHistory = paymentHistoryConverter.convertToEntity(paymentHistoryDTO);
                PaymentMethod paymentMethod = paymentMethods.
                    stream().
                    filter(i -> i.getId().equals(paymentHistoryDTO.getPaymentMethod().getId())).
                    findFirst().orElse(null);
                if (!ObjectUtils.isEmpty(paymentMethod)) {
                    paymentHistory.setPaymentMethod(paymentMethod);
                }
                paymentHistory.setCreatedDate(now);
                paymentHistory.setModifiedDate(now);
                paymentHistory.setTenantId(Long.parseLong(tenantId));
                total += paymentHistory.getMoney().longValue();
                if (maintenanceCard.getPaymentHistories() == null) {
                    List<PaymentHistory> paymentHistories = new ArrayList<>();
                    paymentHistories.add(paymentHistory);
                    maintenanceCard.setPaymentHistories(paymentHistories);
                } else {
                    maintenanceCard.getPaymentHistories().add(paymentHistory);
                }
            }

            byte status = 1;
            if (total == maintenanceCard.getPrice().longValue()) {
                maintenanceCard.setPayStatus(status);
            } else if (total > maintenanceCard.getPrice().longValue()) {
                throw new MoneyExceedException();
            }
            try {
                MaintenanceCard maintenanceCard1 = maintenanceCardRepository.save(maintenanceCard);
                MessageModel messageModel = new MessageModel();
                messageModel.setType(2);
                messageModel.setMaintenanceCardCode(maintenanceCard1.getCode());
                messageModel.setAuthor(maintenanceCard1.getCoordinatorEmail());
                messageModel.setCoordinatorEmail(maintenanceCard1.getCoordinatorEmail());
                messageModel.setRepairmanEmail(maintenanceCard1.getRepairmanEmail());

                return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
            } catch (Exception e) {
                e.printStackTrace();
                throw new UnknownException();
            }

        } else {
            throw new NotFoundException("Not found maintenance card");
        }
    }

    @Override
    public Map<String, Object> getPaymentHistoryByIdCustomer(
        PaymentHistoryByIdCustomer paymentHistoryByIdCustomer) {

        int pageNumber = paymentHistoryByIdCustomer.getPage();
        int size = paymentHistoryByIdCustomer.getSize();
        String search = paymentHistoryByIdCustomer.getSearch();
        Long[] payMethods = paymentHistoryByIdCustomer.getPayMethods();
        Pageable paging = PageRequest.of(pageNumber - 1, size, Sort.by("modifiedDate").descending());
        Long id = paymentHistoryByIdCustomer.getId();

        Page<PaymentHistory> historyPage = paymentHistoryRepository.getPaymentHistoryByIdCustomer(paging, id, search, payMethods);
        List<PaymentHistoryDTO> paymentHistoryDTOS = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<PaymentHistory> paymentHistories = historyPage.getContent();

        for (PaymentHistory paymentHistory : paymentHistories) {
            paymentHistoryDTOS.add(paymentHistoryConverter.convertPaymentHistoryDTO(paymentHistory));
        }
        map.put("paymentHistories", paymentHistoryDTOS);
        map.put("currentPage", historyPage.getNumber() + 1);
        map.put("totalItems", historyPage.getTotalElements());
        map.put("totalPages", historyPage.getTotalPages());
        return map;
    }

    private void insertPaymentMethod() {
        for (int i = 1; i <= 2; i++) {
            PaymentMethod paymentMethod = new PaymentMethod();
            paymentMethod.setId(Long.parseLong(String.valueOf(i)));
            paymentMethod.setCreatedDate(new Date());
            paymentMethod.setModifiedDate(new Date());
            if (i == 1 ) paymentMethod.setName("Tiền mặt");
            if (i == 2 ) paymentMethod.setName("Chuyển khoản");
            paymentMethodRepository.save(paymentMethod);
        }
    }
}






