package com.doan.maintenancecard.service.impl;

import com.doan.maintenancecard.model.BusinessResponse;
import com.doan.maintenancecard.model.BusinessToday;
import com.doan.maintenancecard.model.TotalMoney;
import com.doan.maintenancecard.repository.BusinessInformationCustom;
import com.doan.maintenancecard.service.BusinessInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class BusinessInformationServiceImpl implements BusinessInformationService {

    private final BusinessInformationCustom businessInformationCustom;
    private static final String DATE_FORMAT = "dd/MM/yyyy";

    @Override
    public BusinessResponse getReport(String from, String to, String tenantId) {
        BusinessResponse businessResponse = new BusinessResponse();
        try {
            Date eDatetime = new Date(new SimpleDateFormat(DATE_FORMAT).parse(to).getTime() + (1000 * 60 * 60 * 24));
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String sDate = dateFormat.format(new SimpleDateFormat(DATE_FORMAT).parse(from));
            String eDate = dateFormat.format(eDatetime);
            Long newTenantId = Long.parseLong(tenantId);
            businessResponse.setTopStaffs(businessInformationCustom.getTopRepairMan(sDate, eDate, newTenantId));
            businessResponse.setTopServices(businessInformationCustom.getTopService(sDate, eDate, newTenantId));
            businessResponse.setTopAccessories(businessInformationCustom.getTopAccessories(sDate, eDate, newTenantId));
            businessResponse.setTotalMonies(getTotalMonies(from, to, newTenantId));
            String dateNow = getDateNow();
            BusinessToday businessToday = new BusinessToday();
            businessToday.setTotalMoney(businessInformationCustom.getMoney(dateNow, newTenantId).getTotal());
            businessToday.setTotalMaintenanceCardRepair(businessInformationCustom.getTotalMaintenanceCardIsRepair(dateNow, newTenantId));
            businessToday.setTotalMaintenanceCard(businessInformationCustom.getTotalMaintenanceCard(dateNow, newTenantId));
            businessToday.setTotalMaintenanceCardSuccess(businessInformationCustom.getTotalMaintenanceCardSuccess(dateNow, newTenantId));
            businessToday.setTotalMaintenanceCardScPayed(businessInformationCustom.getTotalMaintenanceCardSuccessPayed(dateNow, newTenantId));
            businessToday.setTotalMaintenanceCardScNotPay(businessInformationCustom.getTotalMaintenanceCardSuccessNotPay(dateNow, newTenantId));
            businessResponse.setBusinessToday(businessToday);
        } catch (Exception e) {
            return businessResponse;
        }
        return businessResponse;
    }

    private String getDateNow() {
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat(DATE_FORMAT);
        return formatter.format(date);
    }

    private List<TotalMoney> getTotalMonies(String from, String to, Long newTenantId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        LocalDate newFrom = LocalDate.parse(from, formatter);
        LocalDate newTo = LocalDate.parse(to, formatter).plusDays(1);
        List<LocalDate> dates = getDatesBetween(newFrom, newTo);
        DateTimeFormatter format = DateTimeFormatter.ofPattern(DATE_FORMAT);
        List<String> strDates = new ArrayList<>();
        dates.forEach(date -> strDates.add(date.format(format)));
        List<TotalMoney> monies = new ArrayList<>();
        try {
            strDates.forEach(date -> {
                TotalMoney totalMoney = businessInformationCustom.getMoney(date, newTenantId);
                if (totalMoney.getTime() == null) {
                    totalMoney.setTime(date.substring(0, 5));
                    totalMoney.setDateText(date);
                }
                if (totalMoney.getTotal() == null) {
                    totalMoney.setTotal(BigDecimal.valueOf(0));
                }
                monies.add(totalMoney);
            });
        } catch (Exception e) {
            return new ArrayList<>();
        }
        return monies;
    }

    public static List<LocalDate> getDatesBetween(LocalDate startDate, LocalDate endDate) {
        long numOfDaysBetween = ChronoUnit.DAYS.between(startDate, endDate);
        return IntStream.iterate(0, i -> i + 1)
            .limit(numOfDaysBetween)
            .mapToObj(startDate::plusDays)
            .collect(Collectors.toList());
    }
}
