package com.doan.maintenancecard.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BusinessResponse {

    private List<StatisticRepairman> topStaffs;
    private List<StatisticRepairman> topServices;
    private List<Accessories> topAccessories;
    private List<TotalMoney> totalMonies;
    private BusinessToday businessToday;
}
