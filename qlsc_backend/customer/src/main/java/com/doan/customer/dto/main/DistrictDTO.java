package com.doan.customer.dto.main;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DistrictDTO {

    private int id;
    private String name;
    private String code;
    private ProvinceDTO province;
    private String text;
}
