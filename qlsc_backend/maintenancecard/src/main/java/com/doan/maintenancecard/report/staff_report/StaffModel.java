package com.doan.maintenancecard.report.staff_report;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class StaffModel {

    private String code;
    private int totalMain;
    private Long id;
    private BigDecimal revenue;
    private String name;
    private Long repairmanId;

    public StaffModel(int totalMain, BigDecimal revenue, Long repairmanId) {
        this.totalMain = totalMain;
        this.revenue = revenue;
        this.repairmanId = repairmanId;
    }
}
