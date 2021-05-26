package com.doan.customer.dto.main;

import com.doan.customer.dto.base.BaseDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO extends BaseDTO {

    private String name;
    private String phone;
    private String code;
    private String email;
    private String description;
    private WardDTO ward;
    private String address;
    private byte status;
    private String payStatus;
    private int totalNotPay;
    private BigDecimal currentDebt;
    private Long tenantId;
}
