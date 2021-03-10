package com.nk.customer.controller;

import com.nk.customer.dto.main.CustomerDTO;
import com.nk.customer.exception.DataTooLongException;
import com.nk.customer.model.SearchCustomer;
import com.nk.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/customers")
    public ResponseEntity<CustomerDTO> addCustomer(
            @RequestBody CustomerDTO customerDTO)
            throws ParseException, DataTooLongException {
        CustomerDTO customer = customerService.addCustomer(customerDTO);
        return ResponseEntity.ok(customer);
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<Object> getCustomerById(
            @PathVariable("id") Long idCustomer) {
        CustomerDTO customerDTO = customerService.getById(idCustomer);
        return ResponseEntity.ok(customerDTO);
    }

    @GetMapping("/customers")
    public ResponseEntity<Object> searchCustomer(
            @ModelAttribute("searchCustomer") SearchCustomer searchCustomer) {
        Map<String, Object> allCustomer = customerService.searchCustomer(searchCustomer);
        return ResponseEntity.ok(allCustomer);
    }

    @PutMapping("/customers/{idCustomer}")
    public ResponseEntity<Object> updateCustomer(
            @RequestBody CustomerDTO customerDTO,
            @PathVariable("idCustomer") Long idCustomer) {
        CustomerDTO customer = customerService.updateCustomer(customerDTO, idCustomer);
        return ResponseEntity.ok(customer);
    }

    @DeleteMapping("/customers/{idCustomer}")
    public ResponseEntity<Object> deleteCustomer(
            @PathVariable("idCustomer") Long idCustomer) {
        customerService.deleteCustomer(idCustomer);
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("/customers/updateStatus")
    public ResponseEntity<Object> updateMultipleStatusCustomer(
            @RequestParam(name = "ids", required = false, defaultValue = "") List<Long> ids) {
        customerService.updateMultipleStatusCustomer(ids);
        return ResponseEntity.ok("Success");
    }

}
