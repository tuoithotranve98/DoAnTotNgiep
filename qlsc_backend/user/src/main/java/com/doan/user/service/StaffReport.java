package com.doan.user.service;

import com.doan.user.model.StaffReportModel;

import java.util.List;

public interface StaffReport {

    List<StaffReportModel> getStaffReport(Long tenantId);
}
