package com.doan.customer.model;

import com.doan.customer.dto.main.CustomerDTO;
import com.doan.customer.entity.main.Customer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerRes {

    private boolean success;
    private String message;
    private Customer customer;
    public CustomerRes(boolean success, String message, Customer customer) {
        this.success = success;
        this.message = message;
        this.customer = customer;
    }
}
