package com.doan.customer.converter;

import com.doan.customer.dto.main.DistrictDTO;
import com.doan.customer.entity.main.District;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class DistrictConverter {

    public DistrictDTO convertToDTO(District district) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(district, DistrictDTO.class);
    }

}
