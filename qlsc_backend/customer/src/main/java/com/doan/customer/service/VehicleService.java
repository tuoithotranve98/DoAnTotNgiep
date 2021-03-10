package com.doan.customer.service;

import com.doan.customer.dto.main.VehicleDTO;

import java.util.List;

public interface VehicleService {

    List<VehicleDTO> getListVehicleByCustomer(long customerId);

}
