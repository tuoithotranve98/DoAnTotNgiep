package com.doan.maintenancecard.service;

import com.doan.maintenancecard.model.BusinessResponse;

public interface BusinessInformationService {

    BusinessResponse getReport(String from, String to, String tenantId);

}
