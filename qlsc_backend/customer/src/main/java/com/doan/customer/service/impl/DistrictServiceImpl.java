package com.doan.customer.service.impl;

import com.doan.customer.dto.main.DistrictDTO;
import com.doan.customer.entity.main.District;
import com.doan.customer.repository.DistrictRepository;
import com.doan.customer.service.DistrictService;
import com.doan.customer.converter.DistrictConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DistrictServiceImpl implements DistrictService {

    private final DistrictRepository districtRepository;
    private final DistrictConverter districtConverter;

    @Override
    public List<DistrictDTO> getDistricts() {
        List<DistrictDTO> districtDTOS;
        List<District> districts = districtRepository.getDistinct();
        districtDTOS = districts.stream().map(districtConverter::convertToDTO).collect(Collectors.toList());
        return districtDTOS;
    }
}
