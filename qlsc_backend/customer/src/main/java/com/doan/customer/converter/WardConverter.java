package com.doan.customer.converter;

import com.doan.customer.dto.main.WardDTO;
import com.doan.customer.entity.main.Ward;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WardConverter {

    private final DistrictConverter districtConverter;

    public WardDTO convertToDTO(Ward ward) {
        WardDTO wardDTO = new WardDTO();
        wardDTO.setCode(ward.getCode());
        wardDTO.setName(ward.getName());
        wardDTO.setText(ward.getName());
        wardDTO.setDistrict(districtConverter.convertToDTO(ward.getDistrict()));
        return wardDTO;
    }

    public Ward convertToEntity(WardDTO wardDTO) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(wardDTO, Ward.class);
    }

}
