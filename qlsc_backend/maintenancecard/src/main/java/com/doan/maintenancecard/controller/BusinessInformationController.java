package com.doan.maintenancecard.controller;

import com.doan.maintenancecard.model.BusinessResponse;
import com.doan.maintenancecard.model.FilterReport;
import com.doan.maintenancecard.security.AppAuthHelper;
import com.doan.maintenancecard.service.BusinessInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@CrossOrigin
@RequestMapping("admin")
@RequiredArgsConstructor
public class BusinessInformationController {

    private final BusinessInformationService businessInformationService;
    private final AppAuthHelper appAuthHelper;

    @GetMapping("business/report")
    public BusinessResponse getReport(@Valid FilterReport filterReport) {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        return businessInformationService.getReport(filterReport.getFrom(), filterReport.getTo(), tenantId);
    }

}
