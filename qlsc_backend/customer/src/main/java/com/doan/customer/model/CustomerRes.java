package com.doan.customer.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerRes {

    private boolean success;
    private String message;

    public CustomerRes(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
