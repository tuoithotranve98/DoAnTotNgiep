package com.doan.maintenancecard.controller;
import com.doan.maintenancecard.dto.MaintenanceCardDTO;
import com.doan.maintenancecard.dto.PaymentHistoryDTO;
import com.doan.maintenancecard.exception.commonException.NotFoundException;
import com.doan.maintenancecard.exception.maintenanceCardException.MoneyExceedException;
import com.doan.maintenancecard.model.PaymentHistoryByIdCustomer;
import com.doan.maintenancecard.security.AppAuthHelper;
import com.doan.maintenancecard.service.PaymentHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("admin")
public class PaymentHistoryController {

    private final PaymentHistoryService paymentHistoryService;
    private final AppAuthHelper appAuthHelper;

    @PostMapping("paymentHistories")
    public ResponseEntity<MaintenanceCardDTO> insertPaymentHistory(@RequestBody List<PaymentHistoryDTO> paymentHistoryDTOs) throws NotFoundException, MoneyExceedException {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        MaintenanceCardDTO maintenanceCardDTO = paymentHistoryService.insertPaymentHistory(paymentHistoryDTOs, tenantId);
        return new ResponseEntity<>(maintenanceCardDTO, HttpStatus.OK);
    }

    @GetMapping("paymentHistories/customer")
    public ResponseEntity<Map<String,Object>> getPaymentHistoriesByIdCustomer(@ModelAttribute("paymentHistoryByIdCustomer") PaymentHistoryByIdCustomer paymentHistoryByIdCustomer){
        Map<String,Object> allPaymentHistories = paymentHistoryService.getPaymentHistoryByIdCustomer(paymentHistoryByIdCustomer);
        return new ResponseEntity<>(allPaymentHistories, HttpStatus.OK);
    }

}
