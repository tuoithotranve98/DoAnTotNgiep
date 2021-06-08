package com.doan.maintenancecard.converter;

import com.doan.maintenancecard.dto.PaymentHistoryDTO;
import com.doan.maintenancecard.dto.PaymentMethodDTO;
import com.doan.maintenancecard.entity.PaymentHistory;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentHistoryConverter {

    private final MaintenanceCardConverter maintenanceCardConvert;

    public PaymentHistory convertToEntity(PaymentHistoryDTO paymentHistoryDTO) {
        ModelMapper modelmapper = new ModelMapper();
        return modelmapper.map(paymentHistoryDTO, PaymentHistory.class);
    }

    public PaymentHistoryDTO convertPaymentHistoryDTO(PaymentHistory paymentHistory) {
        PaymentHistoryDTO paymentHistoryDTO = new PaymentHistoryDTO();
        paymentHistoryDTO.setId(paymentHistory.getId());
        paymentHistoryDTO.setCreatedDate(paymentHistory.getCreatedDate());
        paymentHistoryDTO.setModifiedDate(paymentHistory.getModifiedDate());
        paymentHistoryDTO.setMoney(paymentHistory.getMoney());
        if (paymentHistory.getMaintenanceCard() != null) {
            paymentHistoryDTO.setMaintenanceCard(maintenanceCardConvert.convertToDTO(paymentHistory.getMaintenanceCard()));
        }
        if (paymentHistory.getPaymentMethod() != null) {
            PaymentMethodDTO paymentMethodDTO = new PaymentMethodDTO();
            paymentMethodDTO.setId(paymentHistory.getPaymentMethod().getId());
            paymentMethodDTO.setName(paymentHistory.getPaymentMethod().getName());
            paymentHistoryDTO.setPaymentMethod(paymentMethodDTO);
        }
        return paymentHistoryDTO;
    }

}
