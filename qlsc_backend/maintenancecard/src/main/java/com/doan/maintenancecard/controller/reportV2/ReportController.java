package com.doan.maintenancecard.controller.reportV2;

import com.doan.maintenancecard.report.accessories_report.AccessoriesModel;
import com.doan.maintenancecard.report.accessories_report.AccessoriesReport;
import com.doan.maintenancecard.report.accessories_report.AccessoriesReportService;
import com.doan.maintenancecard.report.staff_report.StaffModel;
import com.doan.maintenancecard.report.staff_report.StaffReport;
import com.doan.maintenancecard.report.staff_report.StaffReportService;
import com.doan.maintenancecard.security.AppAuthHelper;
import com.doan.maintenancecard.service.AppRequestService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("report_v2")
@RequiredArgsConstructor
public class ReportController {

    private final ObjectMapper json;
    private final AppAuthHelper appAuthHelper;
    private final AppRequestService appRequestService;
    private final HttpServletRequest request;
    private final StaffReportService staffReportService;
    private final AccessoriesReportService accessoriesService;
    private static final String STAFF_URI = "http://user/report/staff_report";
    private static final String PRODUCT_URI = "http://product/report/product_report";

    @GetMapping("staff_report")
    public List<StaffReport> staffReport() {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        ResponseEntity<String> response = this.appRequestService.get(STAFF_URI, request.getHeader("X-APP-PAGE-TOKEN"));
        List<StaffReport> staffReports = new ArrayList<>();
        try {
            if (response.getStatusCode().equals(HttpStatus.OK)) {
                List<StaffModel> staffModels = json.readValue(response.getBody(), new TypeReference<>() {});
                List<StaffModel> staffModelList = staffReportService.staffReport(Long.parseLong(tenantId));
                staffModels.forEach(staffModel -> {
                    StaffReport staffReport = new StaffReport();
                    staffReport.setCode(staffModel.getCode());
                    staffReport.setName(staffModel.getName());
                    StaffModel staff = staffModelList
                        .stream().filter(s -> s.getRepairmanId().equals(staffModel.getId()))
                        .findFirst().orElse(null);
                    if (!ObjectUtils.isEmpty(staff)) {
                        staffReport.setNumberOfMc(staff.getTotalMain());
                        staffReport.setRevenue(staff.getRevenue());
                    }
                    staffReports.add(staffReport);
                });
            }
            return staffReports;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    @GetMapping("accessories_report")
    public List<AccessoriesReport> accessoriesReport() {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        ResponseEntity<String> response = this.appRequestService.get(PRODUCT_URI, request.getHeader("X-APP-PAGE-TOKEN"));
        List<AccessoriesReport> accessoriesReports = new ArrayList<>();
        try {
            if (response.getStatusCode().equals(HttpStatus.OK)) {
                List<AccessoriesModel> accessoriesModels = json.readValue(response.getBody(), new TypeReference<>() {});
                List<AccessoriesModel> accessoriesModelList = accessoriesService.accessoriesReport(Long.parseLong(tenantId));
                accessoriesModels.forEach(accessoriesModel -> {
                    AccessoriesReport accessoriesReport = new AccessoriesReport();
                    accessoriesReport.setCode(accessoriesModel.getCode());
                    accessoriesReport.setName(accessoriesModel.getName());
                    accessoriesReport.setQuantity(accessoriesModel.getQuantity());
                    AccessoriesModel accessories = accessoriesModelList
                        .stream().filter(s -> s.getProductId().equals(accessoriesModel.getId()))
                        .findFirst().orElse(null);
                    if (!ObjectUtils.isEmpty(accessories)) {
                        accessoriesReport.setCountProduct(accessories.getCountProduct());
                        accessoriesReport.setRevenue(accessories.getRevenue());
                    }
                    accessoriesReports.add(accessoriesReport);
                });
            }
            return accessoriesReports;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
