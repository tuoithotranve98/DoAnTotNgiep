package com.doan.customer.service.impl;

import com.doan.customer.dto.main.VehicleDTO;
import com.doan.customer.entity.main.Vehicle;
import com.doan.customer.repository.VehicleRepository;
import com.doan.customer.service.VehicleService;
import com.doan.customer.converter.VehicleConverter;
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
