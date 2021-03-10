package com.nk.customer.controller;

import com.nk.customer.dto.main.VehicleDTO;
import com.nk.customer.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping("/vehicle/customer/{customerId}")
    public ResponseEntity<Object> getAllByCustomer(
            @PathVariable("customerId") Long customerId) {
        List<VehicleDTO> vehicleDTOS = vehicleService.getListVehicleByCustomer(customerId);
        return ResponseEntity.ok(vehicleDTOS);
    }

}
