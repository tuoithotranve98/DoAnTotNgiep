package com.doan.maintenancecard.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BusinessToday {

    private BigDecimal totalMoney;
    private int totalMaintenanceCard;
    private int totalMaintenanceCardRepair;
    private int totalMaintenanceCardSuccess;
    private int totalMaintenanceCardScNotPay;
    private int totalMaintenanceCardScPayed;
}
