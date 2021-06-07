package com.doan.maintenancecard.converter;

import com.doan.maintenancecard.dto.CustomerDTO;
import com.doan.maintenancecard.dto.MaintenanceCardDTO;
import com.doan.maintenancecard.dto.MaintenanceCardDetailDTO;
import com.doan.maintenancecard.dto.MaintenanceCardDetailStatusHistoryDTO;
import com.doan.maintenancecard.dto.PaymentHistoryDTO;
import com.doan.maintenancecard.dto.PaymentMethodDTO;
import com.doan.maintenancecard.dto.ProductDTO;
import com.doan.maintenancecard.dto.UserDTO;
import com.doan.maintenancecard.entity.MaintenanceCard;
import com.doan.maintenancecard.entity.MaintenanceCardDetail;
import com.doan.maintenancecard.entity.MaintenanceCardDetailStatusHistory;
import com.doan.maintenancecard.entity.PaymentHistory;
import com.doan.maintenancecard.entity.PaymentMethod;
import com.doan.maintenancecard.model.MaintenanceCardsModel;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MaintenanceCardConverter {

    public MaintenanceCardDTO convertToDTO(MaintenanceCard maintenanceCard) {
        MaintenanceCardDTO maintenanceCardDTO = new MaintenanceCardDTO();
        maintenanceCardDTO.setCode(maintenanceCard.getCode());
        maintenanceCardDTO.setPlatesNumber(maintenanceCard.getPlatesNumber());
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(maintenanceCard.getCustomerId());
        customerDTO.setName(maintenanceCard.getCustomerName());
        customerDTO.setPhone(maintenanceCard.getCustomerPhone());
        maintenanceCardDTO.setCustomer(customerDTO);
        UserDTO repairman = new UserDTO();
        if (maintenanceCard.getRepairmanId() != 0) {
            repairman.setId(maintenanceCard.getRepairmanId());
            repairman.setName(maintenanceCard.getRepairmanName());
            repairman.setEmail(maintenanceCard.getRepairmanEmail());
            maintenanceCardDTO.setRepairman(repairman);
        }
        maintenanceCardDTO.setDescription(maintenanceCard.getDescription());
        maintenanceCardDTO.setReturnDate(maintenanceCard.getReturnDate());//
        maintenanceCardDTO.setPrice(maintenanceCard.getPrice());
        maintenanceCardDTO.setReturnDate(maintenanceCard.getReturnDate());
        maintenanceCardDTO.setWorkStatus(maintenanceCard.getWorkStatus());
        maintenanceCardDTO.setPayStatus(maintenanceCard.getPayStatus());
        maintenanceCardDTO.setModel(maintenanceCard.getModel());
        maintenanceCardDTO.setColor(maintenanceCard.getColor());
        UserDTO coordinator = new UserDTO();
        coordinator.setId(maintenanceCard.getCoordinatorId());
        coordinator.setName(maintenanceCard.getCoordinatorName());
        coordinator.setEmail(maintenanceCard.getCoordinatorEmail());
        maintenanceCardDTO.setCoordinator(coordinator);
        maintenanceCardDTO.setId(maintenanceCard.getId());
        maintenanceCardDTO.setCreatedDate(maintenanceCard.getCreatedDate());
        maintenanceCardDTO.setExpectedReturnDate(maintenanceCard.getExpectedReturnDate());
        return maintenanceCardDTO;
    }

    public MaintenanceCard convertToEntity(MaintenanceCardDTO maintenanceCardDTO) {
        MaintenanceCard maintenanceCard = new MaintenanceCard();
        UserDTO repairman = maintenanceCardDTO.getRepairman();
        //thông tin nhân viên sửa chữa
        if (repairman != null && repairman.getId() != null) {
            maintenanceCard.setRepairmanName(repairman.getName());
            maintenanceCard.setRepairmanId(repairman.getId());
            maintenanceCard.setRepairmanEmail(repairman.getEmail());
        }
        //thông tin khách hàng
        CustomerDTO customerDTO = maintenanceCardDTO.getCustomer();
        maintenanceCard.setCustomerPhone(customerDTO.getPhone());
        maintenanceCard.setCustomerName(customerDTO.getName());
        maintenanceCard.setCustomerId(customerDTO.getId());
        //thông tin trên phiếu
        UserDTO coordinator = maintenanceCardDTO.getCoordinator();
        maintenanceCard.setCoordinatorName(coordinator.getName());
        maintenanceCard.setCoordinatorId(coordinator.getId());
        maintenanceCard.setCoordinatorEmail(coordinator.getEmail());
        maintenanceCard.setWorkStatus(maintenanceCardDTO.getWorkStatus());
        maintenanceCard.setCode(maintenanceCardDTO.getCode());
        maintenanceCard.setPayStatus(maintenanceCardDTO.getPayStatus());
        maintenanceCard.setPlatesNumber(maintenanceCardDTO.getPlatesNumber());
        maintenanceCard.setPrice(maintenanceCardDTO.getPrice());
        maintenanceCard.setReturnDate(maintenanceCardDTO.getReturnDate());
        maintenanceCard.setColor(maintenanceCardDTO.getColor());
        maintenanceCard.setDescription(maintenanceCardDTO.getDescription());
        maintenanceCard.setExpectedReturnDate(maintenanceCardDTO.getExpectedReturnDate());
        //chi tiết phiếu
        List<MaintenanceCardDetail> maintenanceCardDetails = new ArrayList<>();
        if (!maintenanceCardDTO.getMaintenanceCardDetails().isEmpty()) {
            maintenanceCardDTO.getMaintenanceCardDetails().forEach(maintenanceCardDetailDTO -> {
                MaintenanceCardDetail maintenanceCardDetail = new MaintenanceCardDetail();
                ProductDTO productDTO = maintenanceCardDetailDTO.getProduct();
                maintenanceCardDetail.setProductCode(productDTO.getCode());
                maintenanceCardDetail.setMaintenanceCard(maintenanceCard);
                maintenanceCardDetail.setStatus(maintenanceCardDetailDTO.getStatus());
                maintenanceCardDetail.setPrice(maintenanceCardDetailDTO.getPrice());
                maintenanceCardDetail.setProductId(productDTO.getId());
                maintenanceCardDetail.setProductImage(productDTO.getImage());
                maintenanceCardDetail.setProductName(productDTO.getName());
                maintenanceCardDetail.setProductType(productDTO.getType());
                maintenanceCardDetail.setProductUnit(productDTO.getUnit());
                maintenanceCardDetail.setProductGuarantee(productDTO.getGuarantee());
                maintenanceCardDetail.setQuantity(maintenanceCardDetailDTO.getQuantity());
                maintenanceCardDetail.setId(maintenanceCardDetailDTO.getId());
                maintenanceCardDetail.setIsGuarantee(maintenanceCardDetailDTO.getIsGuarantee());
                maintenanceCardDetail.setProductPricePerUnit(productDTO.getPricePerUnit());
                maintenanceCardDetails.add(maintenanceCardDetail);
            });
        }
        maintenanceCard.setMaintenanceCardDetails(maintenanceCardDetails);
        maintenanceCard.setModel(maintenanceCardDTO.getModel());
        maintenanceCard.setId(maintenanceCardDTO.getId());
        return maintenanceCard;
    }

    public MaintenanceCardDTO convertAllToDTO(MaintenanceCard maintenanceCard) {
        MaintenanceCardDTO maintenanceCardDTO = convertToDTO(maintenanceCard);
        List<MaintenanceCardDetailDTO> maintenanceCardDetailDTOS = new ArrayList<>();
        List<MaintenanceCardDetailStatusHistoryDTO> maintenanceCardDetailStatusHistoryDTOS = new ArrayList<>();
        for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCard.getMaintenanceCardDetails()) {
            if (maintenanceCardDetail.getIsDelete() == 0) {
                MaintenanceCardDetailDTO maintenanceCardDetailDTO = new MaintenanceCardDetailDTO();
                maintenanceCardDetailDTO.setPrice(maintenanceCardDetail.getPrice());
                ProductDTO productDTO = new ProductDTO();
                productDTO.setType(maintenanceCardDetail.getProductType());
                productDTO.setCode(maintenanceCardDetail.getProductCode());
                productDTO.setId(maintenanceCardDetail.getProductId());
                productDTO.setImage(maintenanceCardDetail.getProductImage());
                productDTO.setName(maintenanceCardDetail.getProductName());
                productDTO.setUnit(maintenanceCardDetail.getProductUnit());
                productDTO.setGuarantee(maintenanceCardDetail.getProductGuarantee());
                productDTO.setPricePerUnit(maintenanceCardDetail.getProductPricePerUnit());
                maintenanceCardDetailDTO.setProduct(productDTO);
                maintenanceCardDetailDTO.setQuantity(maintenanceCardDetail.getQuantity());
                maintenanceCardDetailDTO.setStatus(maintenanceCardDetail.getStatus());
                maintenanceCardDetailDTO.setIsGuarantee(maintenanceCardDetail.getIsGuarantee());
                maintenanceCardDetailDTO.setCreatedDate(maintenanceCardDetail.getCreatedDate());
                maintenanceCardDetailDTO.setId(maintenanceCardDetail.getId());
                maintenanceCardDetailDTO.setModifiedDate(maintenanceCardDetail.getModifiedDate());
                maintenanceCardDetailDTOS.add(maintenanceCardDetailDTO);
            }
            List<MaintenanceCardDetailStatusHistory> maintenanceCardDetailStatusHistories = maintenanceCardDetail.getMaintenanceCardDetailStatusHistories();
            if (maintenanceCardDetailStatusHistories != null) {
                for (MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory : maintenanceCardDetailStatusHistories) {
                    MaintenanceCardDetailStatusHistoryDTO maintenanceCardDetailStatusHistoryDTO = new MaintenanceCardDetailStatusHistoryDTO();
                    maintenanceCardDetailStatusHistoryDTO.setName(maintenanceCardDetailStatusHistory.getMaintenanceCardDetail().getProductName());
                    maintenanceCardDetailStatusHistoryDTO.setStatus(maintenanceCardDetailStatusHistory.getStatus());
                    maintenanceCardDetailStatusHistoryDTO.setCreatedDate(maintenanceCardDetailStatusHistory.getCreatedDate());
                    maintenanceCardDetailStatusHistoryDTO.setId(maintenanceCardDetailStatusHistory.getId());
                    maintenanceCardDetailStatusHistoryDTO.setModifiedDate(maintenanceCardDetailStatusHistory.getModifiedDate());
                    maintenanceCardDetailStatusHistoryDTOS.add(maintenanceCardDetailStatusHistoryDTO);
                }
            }
        }
        maintenanceCardDTO.setMaintenanceCardDetailStatusHistories(maintenanceCardDetailStatusHistoryDTOS);
        List<PaymentHistoryDTO> paymentHistoryDTOS = new ArrayList<>();
        if (maintenanceCard.getPaymentHistories() != null) {
            for (PaymentHistory paymentHistory : maintenanceCard.getPaymentHistories()) {
                PaymentHistoryDTO paymentHistoryDTO = new PaymentHistoryDTO();
                paymentHistoryDTO.setMoney(paymentHistory.getMoney());
                PaymentMethodDTO paymentMethodDTO = new PaymentMethodDTO();
                PaymentMethod paymentMethod = paymentHistory.getPaymentMethod();
                if (paymentMethod != null && StringUtils.isNotBlank(paymentMethod.getName())) {
                    paymentMethodDTO.setName(paymentMethod.getName());
                }
                paymentHistoryDTO.setPaymentMethod(paymentMethodDTO);
                paymentHistoryDTO.setCreatedDate(paymentHistory.getCreatedDate());
                paymentHistoryDTO.setModifiedDate(paymentHistory.getModifiedDate());
                paymentHistoryDTO.setId(paymentHistory.getId());
                paymentHistoryDTOS.add(paymentHistoryDTO);
            }
            maintenanceCardDTO.setPaymentHistories(paymentHistoryDTOS);
        }
        maintenanceCardDTO.setMaintenanceCardDetails(maintenanceCardDetailDTOS);
        return maintenanceCardDTO;
    }

}
