package com.doan.maintenancecard.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Arrays;

@Setter
@Getter
@ToString
public class MaintenanceCardFilter {

    final byte[] PAY_STATUS = {0, 1};
    final byte[] WORK_STATUS = {0, 1, 2};
    private int page;
    private int size;
    private String search;
    private String nameField;
    private String order;
    private byte[] payStatus;
    private byte[] workStatus;
    private Long tenantId;

    public MaintenanceCardFilter() {
        this.size = 10;
        this.page = 1;
        this.search = "";
        this.nameField = "";
        this.order = "";
        this.payStatus = PAY_STATUS;
        this.workStatus = WORK_STATUS;
        this.tenantId = 0L;
    }

    @ModelAttribute("maintenanceCardFilter")
    public MaintenanceCardFilter getMaintenanceCardFilter() {
        MaintenanceCardFilter maintenanceCardFilter = new MaintenanceCardFilter();
        maintenanceCardFilter.setPage(1);
        maintenanceCardFilter.setNameField("");
        maintenanceCardFilter.setOrder("");
        maintenanceCardFilter.setSearch("");
        maintenanceCardFilter.setSize(5);
        maintenanceCardFilter.setTenantId(0L);
        return maintenanceCardFilter;
    }
}
