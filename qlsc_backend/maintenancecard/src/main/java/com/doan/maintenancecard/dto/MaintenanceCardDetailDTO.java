package com.doan.maintenancecard.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaintenanceCardDetailDTO extends BaseDTO {

    private MaintenanceCardDTO maintenanceCard;
    private ProductDTO product;
    private byte status;
    private BigDecimal price;
    private int quantity;
    private byte isGuarantee;
}
