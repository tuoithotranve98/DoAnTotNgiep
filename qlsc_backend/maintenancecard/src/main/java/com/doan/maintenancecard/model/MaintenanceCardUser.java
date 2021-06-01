package com.doan.maintenancecard.model;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.bind.annotation.ModelAttribute;

@Getter
@Setter
@ToString
public class MaintenanceCardUser {

    final byte[] PAY_STATUS = {0, 1};
    final byte[] WORK_STATUS = {0, 1, 2};
    private int page;
    private int size;
    private String sortBy;
    private boolean descending;
    private String code;
    private byte[] payStatus;
    private byte[] workStatus;

    @NotNull
    private Long id;

    public MaintenanceCardUser() {
        this.size = 10;
        this.page = 1;
        this.sortBy = "";
        this.id = 0L;
        this.descending = false;
        this.code = "";
        this.payStatus = PAY_STATUS;
        this.workStatus = WORK_STATUS;
    }

    @ModelAttribute("maintenanceCardUser")
    public MaintenanceCardUser getMaintenanceCardUser() {
        MaintenanceCardUser maintenanceCardUser = new MaintenanceCardUser();
        maintenanceCardUser.setPage(1);
        maintenanceCardUser.setSize(10);
        maintenanceCardUser.setSortBy("");
        maintenanceCardUser.setDescending(false);
        maintenanceCardUser.setCode("");
        return maintenanceCardUser;
    }
}
