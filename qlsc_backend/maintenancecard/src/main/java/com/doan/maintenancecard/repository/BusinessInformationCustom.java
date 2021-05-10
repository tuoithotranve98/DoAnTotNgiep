package com.doan.maintenancecard.repository;

import com.doan.maintenancecard.dto.StatisticRepairmanDTO;
import com.doan.maintenancecard.dto.TotalMoneyDTO;

import java.util.List;

public interface BusinessInformationCustom {

    int getTotalMaintenanceCard(String date);

    int getTotalMaintenanceCardSuccess(String date);

    int getTotalMaintenanceCardSuccessNotPay(String date);

    int getTotalMaintenanceCardSuccessPayed(String date);

    TotalMoneyDTO getMoneyDto(String date);

    List<StatisticRepairmanDTO> getTopService(String startDate, String endDate);

    List<StatisticRepairmanDTO> getTopRepairMan(String startDate, String endDate);

}
