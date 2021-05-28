package com.doan.maintenancecard.report.staff_report;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class StaffReport {

    private static final String STAFF_POSITION = "Nhân viên sửa chữa";

    private String code;
    private String name;
    private String position = STAFF_POSITION;
    private int numberOfMc = 0;
    private BigDecimal revenue = new BigDecimal(0);

}
