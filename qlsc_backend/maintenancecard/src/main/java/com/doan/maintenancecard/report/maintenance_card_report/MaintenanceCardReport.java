package com.doan.maintenancecard.report.maintenance_card_report;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class MaintenanceCardReport {

    private String time;
    private Date date;
    private int totalMc;
    private int success;
    private int unfinished;
    private BigDecimal revenue;
    private String dateText;

    public MaintenanceCardReport(Date date, int totalMc, int success, int unfinished, BigDecimal revenue) {
        this.date = date;
        this.totalMc = totalMc;
        this.success = success;
        this.unfinished = unfinished;
        this.revenue = revenue;
    }
}
