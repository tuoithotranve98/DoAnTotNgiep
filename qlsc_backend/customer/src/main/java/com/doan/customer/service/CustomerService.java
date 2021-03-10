package com.doan.customer.service;

import com.doan.customer.dto.main.CustomerDTO;
import com.doan.customer.exception.DataTooLongException;
import com.doan.customer.model.SearchCustomer;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface CustomerService {

    CustomerDTO addCustomer(CustomerDTO customerDTO) throws ParseException, DataTooLongException;
    Map<String, Object> searchCustomer(SearchCustomer searchCustomer);
    CustomerDTO updateCustomer(CustomerDTO customerDTO, Long idCustomer);
    void deleteCustomer(Long idCustomer);
    void updateMultipleStatusCustomer(List<Long> ids);
    CustomerDTO getById(Long idCustomer);
    boolean checkPhoneNumber(String phoneNumber);
}
