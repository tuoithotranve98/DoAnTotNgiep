package com.doan.customer.dto.main;

import com.doan.customer.dto.base.BaseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VehicleDTO extends BaseDTO {

    private String color;
    private String model;
    private String plateNumber;

}
