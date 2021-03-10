package com.nk.customer.service.impl;

import com.nk.customer.converter.VehicleConverter;
import com.nk.customer.dto.main.VehicleDTO;
import com.nk.customer.entity.main.Vehicle;
import com.nk.customer.repository.VehicleRepository;
import com.nk.customer.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleConverter vehicleConverter;

    @Override
    public List<VehicleDTO> getListVehicleByCustomer(long customerId) {
        List<Vehicle> vehicles = vehicleRepository.getAllByCustomer(customerId);
        List<VehicleDTO> vehicleDTOS;
        vehicleDTOS = vehicles.stream().map(vehicleConverter::convertToDTO).collect(Collectors.toList());
        return vehicleDTOS;
    }
}
