package com.doan.product.controller;

import com.doan.product.security.AppAuthHelper;
import com.doan.product.service.ProductReport;
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
public class ProductReportController {

    private final ProductReport productReport;
    private final AppAuthHelper appAuthHelper;
    private final ObjectMapper json;

    @GetMapping("product_report")
    public String getReport() {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        try {
            return json.writeValueAsString(productReport.getProductReport(Long.parseLong(tenantId)));
        } catch (JsonProcessingException e) {
            return "Error";
        }
    }
}
