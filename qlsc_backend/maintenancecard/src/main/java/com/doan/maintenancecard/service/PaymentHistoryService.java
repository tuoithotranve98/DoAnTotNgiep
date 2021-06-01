package com.doan.maintenancecard.service;

import com.doan.maintenancecard.dto.MaintenanceCardDTO;
import com.doan.maintenancecard.dto.PaymentHistoryDTO;
import com.doan.maintenancecard.exception.commonException.NotFoundException;
import com.doan.maintenancecard.exception.maintenanceCardException.MoneyExceedException;
import com.doan.maintenancecard.model.PaymentHistoryByIdCustomer;

import java.util.List;
import java.util.Map;

public interface PaymentHistoryService {

    MaintenanceCardDTO insertPaymentHistory(List<PaymentHistoryDTO> paymentHistoryDTOs, String tenantId) throws NotFoundException, MoneyExceedException;

    Map<String, Object> getPaymentHistoryByIdCustomer(
        PaymentHistoryByIdCustomer paymentHistoryByIdCustomer);
}
