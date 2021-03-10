package com.nk.customer.dto.main;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DistrictDTO {

    private String name;
    private String code;
    private ProvinceDTO province;

}
