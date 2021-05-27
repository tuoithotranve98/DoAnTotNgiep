package com.doan.maintenancecard.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class StatisticRepairman {

    private String name;
    private int total;
    private BigDecimal money;

    public StatisticRepairman(String name, int total) {
        this.name = name;
        this.total = total;
    }

    public StatisticRepairman(String name, int total, BigDecimal money) {
        this.name = name;
        this.total = total;
        this.money = money;
    }

}
