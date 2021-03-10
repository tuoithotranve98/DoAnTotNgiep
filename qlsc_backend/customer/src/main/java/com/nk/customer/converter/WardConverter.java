package com.nk.customer.converter;

import com.nk.customer.dto.main.WardDTO;
import com.nk.customer.entity.main.Ward;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class WardConverter {

    public WardDTO convertToDTO(Ward ward) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(ward, WardDTO.class);
    }

    public Ward convertToEntity(WardDTO wardDTO) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(wardDTO, Ward.class);
    }

}
