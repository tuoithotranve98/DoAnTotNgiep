package com.doan.customer.converter;

import com.doan.customer.dto.main.WardDTO;
import com.doan.customer.entity.main.Ward;
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
