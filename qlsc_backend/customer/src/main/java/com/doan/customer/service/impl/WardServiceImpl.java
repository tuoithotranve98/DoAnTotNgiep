package com.doan.customer.service.impl;

import com.doan.customer.converter.WardConverter;
import com.doan.customer.dto.main.WardDTO;
import com.doan.customer.entity.main.Ward;
import com.doan.customer.repository.WardRepository;
import com.doan.customer.service.WardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WardServiceImpl implements WardService {

    private final WardRepository wardRepository;
    private final WardConverter wardConverter;

    @Override
    public List<WardDTO> getWardOfDistrict(String district) {
        List<WardDTO> wardDTOS;
        List<Ward> wards = wardRepository.getWardByDistrict(district);
        wardDTOS = wards.stream().map(wardConverter::convertToDTO).collect(Collectors.toList());
        return wardDTOS;
    }
}
