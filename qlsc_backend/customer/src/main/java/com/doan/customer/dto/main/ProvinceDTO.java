package com.doan.customer.dto.main;

import com.doan.customer.entity.main.Province;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProvinceDTO {

    private String name;
    private String code;

    public ProvinceDTO(Province province) {
        this.name = province.name;
        this.code = province.code;
    }
}
