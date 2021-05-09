package com.doan.customer.controller;

import com.doan.customer.dto.main.CustomerDTO;
import com.doan.customer.model.CustomerRes;
import com.doan.customer.model.SearchCustomer;
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

    @PostMapping("customers")
    public CustomerRes addCustomer(
            @RequestBody CustomerDTO customerDTO)
            throws ParseException, DataTooLongException {
        return customerService.addCustomer(customerDTO);
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
        Map<String, Object> allCustomer = customerService.searchCustomer(searchCustomer);
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

    @DeleteMapping("customers/updateStatus")
    public ResponseEntity<Object> updateMultipleStatusCustomer(
            @RequestParam(name = "ids", required = false, defaultValue = "") List<Long> ids) {
        customerService.updateMultipleStatusCustomer(ids);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("testCustomer")
    public String testApi() {
        return "Success";
    }

}
