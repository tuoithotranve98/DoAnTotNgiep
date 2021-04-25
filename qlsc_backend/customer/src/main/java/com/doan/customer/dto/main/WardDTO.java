package com.doan.customer.dto.main;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WardDTO {

    private int id;
    private String name;
    private String code;
    private DistrictDTO district;
    private String text;

}
