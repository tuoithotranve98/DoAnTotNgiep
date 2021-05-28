package com.doan.maintenancecard.report.accessories_report;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AccessoriesModel {

    private Long id;
    private String code;
    private String name;
    private int quantity;
    private int countProduct;
    private BigDecimal revenue;
    private Long productId;

    public AccessoriesModel(int countProduct, BigDecimal revenue, Long productId, String code) {
        this.countProduct = countProduct;
        this.revenue = revenue;
        this.productId = productId;
        this.code = code;
    }
}
