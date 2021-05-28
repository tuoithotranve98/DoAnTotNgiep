package com.doan.user.controller;

import com.doan.user.model.StaffReportModel;
import com.doan.user.security.AppAuthHelper;
import com.doan.user.service.StaffReport;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("report")
@CrossOrigin(origins = "*")
public class StaffReportController {

    private final StaffReport staffReport;
    private final AppAuthHelper appAuthHelper;
    private final ObjectMapper json;

    @GetMapping("staff_report")
    public String getReport() {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        try {
            return json.writeValueAsString(staffReport.getStaffReport(Long.parseLong(tenantId)));
        } catch (JsonProcessingException e) {
            return "Error";
        }
    }
}
