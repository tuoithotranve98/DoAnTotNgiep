package com.doan.customer.controller;

import com.doan.customer.dto.main.CustomerDTO;
import com.doan.customer.model.CustomerRes;
import com.doan.customer.model.SearchCustomer;
import com.doan.customer.security.AppAuthHelper;
import com.doan.customer.service.CustomerService;
import com.doan.customer.exception.DataTooLongException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping("admin")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    private final AppAuthHelper appAuthHelper;

    @PostMapping("customers")
    public CustomerRes addCustomer(
            @RequestBody CustomerDTO customerDTO)
            throws ParseException, DataTooLongException {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        return customerService.addCustomer(customerDTO, tenantId);
    }

    @GetMapping("customers/{id}")
    public ResponseEntity<Object> getCustomerById(
            @PathVariable("id") Long idCustomer) {
        CustomerDTO customerDTO = customerService.getById(idCustomer);
        return ResponseEntity.ok(customerDTO);
    }

    @GetMapping("customers")
    public ResponseEntity<Object> searchCustomer(
            @ModelAttribute("searchCustomer") SearchCustomer searchCustomer) {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        Map<String, Object> allCustomer = customerService.searchCustomer(searchCustomer, tenantId);
        return ResponseEntity.ok(allCustomer);
    }

    @PostMapping("customers/{idCustomer}")
    public CustomerRes updateCustomer(
            @RequestBody CustomerDTO customerDTO,
            @PathVariable("idCustomer") Long idCustomer) {
        return customerService.updateCustomer(customerDTO, idCustomer);
    }

    @DeleteMapping("customers/{idCustomer}")
    public ResponseEntity<Object> deleteCustomer(
            @PathVariable("idCustomer") Long idCustomer) {
        customerService.deleteCustomer(idCustomer);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("customers/updateStatus")
    public CustomerRes updateMultipleStatusCustomer(
            @RequestParam(name = "ids", required = false, defaultValue = "") List<Long> ids) {
        return customerService.updateMultipleStatusCustomer(ids);
    }

}
