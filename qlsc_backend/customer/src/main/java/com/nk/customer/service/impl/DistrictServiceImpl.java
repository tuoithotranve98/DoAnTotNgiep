package com.nk.customer.service.impl;

import com.nk.customer.converter.DistrictConverter;
import com.nk.customer.dto.main.DistrictDTO;
import com.nk.customer.entity.main.District;
import com.nk.customer.repository.DistrictRepository;
import com.nk.customer.service.DistrictService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
