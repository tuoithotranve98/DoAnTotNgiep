package com.nk.customer.dto.main;

import com.nk.customer.dto.base.BaseDTO;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CustomerDTO extends BaseDTO {

    private String name;
    private String phoneNumber;
    private String code;
    private String email;
    private String description;
    private WardDTO ward;
    private String address;
    private byte status;
    private String payStatus;
    private int totalNotPay;
    private BigDecimal currentDebt;
}
