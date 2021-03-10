package com.nk.customer.dto.main;

import com.nk.customer.dto.base.BaseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VehicleDTO extends BaseDTO {

    private String color;
    private String model;
    private String plateNumber;

}
