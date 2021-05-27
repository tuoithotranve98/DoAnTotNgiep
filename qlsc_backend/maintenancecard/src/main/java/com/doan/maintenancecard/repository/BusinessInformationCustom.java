package com.doan.maintenancecard.repository;

import com.doan.maintenancecard.model.Accessories;
import com.doan.maintenancecard.model.StatisticRepairman;
import com.doan.maintenancecard.model.TotalMoney;

import java.util.List;

public interface BusinessInformationCustom {

    int getTotalMaintenanceCard(String date, Long tenantId);

    int getTotalMaintenanceCardSuccess(String date, Long tenantId);

    int getTotalMaintenanceCardIsRepair(String date, Long tenantId);

    int getTotalMaintenanceCardSuccessNotPay(String date, Long tenantId);

    int getTotalMaintenanceCardSuccessPayed(String date, Long tenantId);

    TotalMoney getMoney(String date, Long tenantId);

    List<StatisticRepairman> getTopService(String startDate, String endDate, Long tenantId);

    List<Accessories> getTopAccessories(String startDate, String endDate, Long tenantId);

    List<StatisticRepairman> getTopRepairMan(String startDate, String endDate, Long tenantId);

}
