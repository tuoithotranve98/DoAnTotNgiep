package com.doan.maintenancecard.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "maintenance_card_details")
public class MaintenanceCardDetail extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "maintenance_card_id")
    private MaintenanceCard maintenanceCard;

    @JoinColumn(name = "product_id")
    private long productId;

    @Column(name = "product_name", nullable = false, length = 100)
    private String productName;

    @Column(name = "product_code", nullable = false, length = 11)
    private String productCode;

    @Column(name = "product_image", length = 255)
    private String productImage;

    @Column(name = "product_unit", length = 100)
    private String productUnit;

    @Column(name = "product_type")
    private byte productType;

    @Column(name = "product_price_per_unit")
    private BigDecimal productPricePerUnit;

    @Column(name = "status")
    private byte status;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "is_delete")
    private byte isDelete;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "maintenanceCardDetail", fetch = FetchType.LAZY)
    private List<MaintenanceCardDetailStatusHistory> maintenanceCardDetailStatusHistories;

}
