package com.doan.product.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductReportModel {

    private Long id;
    private String code;
    private String name;
    private int quantity;
}
