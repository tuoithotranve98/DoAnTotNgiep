package com.doan.customer.converter;

import com.doan.customer.dto.main.DistrictDTO;
import com.doan.customer.dto.main.ProvinceDTO;
import com.doan.customer.entity.main.District;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class DistrictConverter {

    public DistrictDTO convertToDTO(District district) {
        DistrictDTO districtDTO = new DistrictDTO();
        districtDTO.setName(district.getName());
        districtDTO.setCode(district.getCode());
        districtDTO.setProvince(new ProvinceDTO(district.getProvince()));
        districtDTO.setText(concatenateCity(district.getName(), district.getProvince().getName()));
        return districtDTO;
    }

    private String concatenateCity(String district, String province) {
        StringBuilder city;
        city = new StringBuilder();
        return city
            .append(district)
            .append(" ")
            .append("-")
            .append(" ")
            .append(province)
            .toString();
    }

}
