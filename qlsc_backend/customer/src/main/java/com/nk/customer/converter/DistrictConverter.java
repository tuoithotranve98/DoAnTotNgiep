package com.nk.customer.converter;

import com.nk.customer.dto.main.DistrictDTO;
import com.nk.customer.entity.main.District;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class DistrictConverter {

    public DistrictDTO convertToDTO(District district) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(district, DistrictDTO.class);
    }

}
