package com.doan.customer.converter;

import com.doan.customer.dto.main.VehicleDTO;
import com.doan.customer.entity.main.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class VehicleConverter {

    public VehicleDTO convertToDTO(Vehicle entity) {
        VehicleDTO vehicleDTO = new VehicleDTO();
        vehicleDTO.setColor(entity.getColor());
        vehicleDTO.setModel(entity.getModel());
        vehicleDTO.setPlateNumber(entity.getPlateNumber());
        vehicleDTO.setId(entity.getId());
        return vehicleDTO;
    }

}
