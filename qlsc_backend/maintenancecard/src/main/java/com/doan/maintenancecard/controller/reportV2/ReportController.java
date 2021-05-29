package com.doan.maintenancecard.controller.reportV2;

import com.doan.maintenancecard.model.FilterReport;
import com.doan.maintenancecard.report.accessories_report.AccessoriesModel;
import com.doan.maintenancecard.report.accessories_report.AccessoriesReport;
import com.doan.maintenancecard.report.accessories_report.AccessoriesReportService;
import com.doan.maintenancecard.report.maintenance_card_report.MaintenanceCardReport;
import com.doan.maintenancecard.report.maintenance_card_report.MaintenanceCardReportService;
import com.doan.maintenancecard.report.staff_report.StaffModel;
import com.doan.maintenancecard.report.staff_report.StaffReport;
import com.doan.maintenancecard.report.staff_report.StaffReportService;
import com.doan.maintenancecard.security.AppAuthHelper;
import com.doan.maintenancecard.service.AppRequestService;
import com.doan.maintenancecard.service.impl.BusinessInformationServiceImpl;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
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
    private final MaintenanceCardReportService maintenanceCardReportService;
    private static final String DATE_FORMAT = "dd/MM/yyyy";
    private static final String STAFF_URI = "http://user/report/staff_report";
    private static final String PRODUCT_URI = "http://product/report/product_report";

    @GetMapping("staff_report")
    public List<StaffReport> staffReport(@Valid FilterReport filterReport) {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        ResponseEntity<String> response = this.appRequestService.get(STAFF_URI, request.getHeader("X-APP-PAGE-TOKEN"));
        List<StaffReport> staffReports = new ArrayList<>();
        FilterReport newFilter = getTime(filterReport);
        try {
            if (response.getStatusCode().equals(HttpStatus.OK)) {
                List<StaffModel> staffModels = json.readValue(response.getBody(), new TypeReference<>() {});
                List<StaffModel> staffModelList = staffReportService.staffReport(newFilter.getFrom(), newFilter.getTo(), Long.parseLong(tenantId));
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
    public List<AccessoriesReport> accessoriesReport(@Valid FilterReport filterReport) throws ParseException {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        ResponseEntity<String> response = this.appRequestService.get(PRODUCT_URI, request.getHeader("X-APP-PAGE-TOKEN"));
        List<AccessoriesReport> accessoriesReports = new ArrayList<>();
        FilterReport newFilter = getTime(filterReport);
        try {
            if (response.getStatusCode().equals(HttpStatus.OK)) {
                List<AccessoriesModel> accessoriesModels = json.readValue(response.getBody(), new TypeReference<>() {});
                List<AccessoriesModel> accessoriesModelList = accessoriesService.accessoriesReport(newFilter.getFrom(), newFilter.getTo(), Long.parseLong(tenantId));

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

    @GetMapping("maintenance_card_report")
    public List<MaintenanceCardReport> maintenanceCardReport(@Valid FilterReport filterReport) {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        List<MaintenanceCardReport> maintenanceCardReports = new ArrayList<>();
        List<String> dates = getDates(filterReport);
        try {
            dates.forEach(date-> {
                MaintenanceCardReport report = maintenanceCardReportService.maintenanceCardReport(date, Long.parseLong(tenantId));
                report.setDateText(date);
                report.setTime(date.substring(0, 5));
                if (report.getRevenue() == null) report.setRevenue(new BigDecimal(0));
                maintenanceCardReports.add(report);
            });
            return maintenanceCardReports;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    private List<String> getDates(FilterReport filter) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        LocalDate newFrom = LocalDate.parse(filter.getFrom(), formatter);
        LocalDate newTo = LocalDate.parse(filter.getTo(), formatter).plusDays(1);
        List<LocalDate> dates = BusinessInformationServiceImpl.getDatesBetween(newFrom, newTo);
        List<String> dateList = new ArrayList<>();
        dates.forEach(date -> dateList.add(date.format(formatter)));
        return dateList;
    }

    private FilterReport getTime(FilterReport filterReport) {
        try {
            Date eDatetime = new Date(new SimpleDateFormat(DATE_FORMAT).parse(filterReport.getTo()).getTime() + (1000 * 60 * 60 * 24));
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String sDate = dateFormat.format(new SimpleDateFormat(DATE_FORMAT).parse(filterReport.getFrom()));
            String eDate = dateFormat.format(eDatetime);
            FilterReport newFilter = new FilterReport();
            newFilter.setFrom(sDate);
            newFilter.setTo(eDate);
            return newFilter;
        } catch (ParseException e) {
            e.printStackTrace();
            return new FilterReport();
        }
    }
}
