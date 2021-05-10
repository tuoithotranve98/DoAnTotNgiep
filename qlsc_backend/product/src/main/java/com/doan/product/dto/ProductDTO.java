package com.doan.product.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO extends BaseDTO {

    private String name;
    private String code;
    private List<String> images;
    private int quantity;
    private String unit;
    private BigDecimal pricePerUnit;
    private String description;
    private byte status;
    private byte type;

}
