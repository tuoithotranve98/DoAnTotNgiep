package com.nk.customer.service;

import com.nk.customer.dto.main.VehicleDTO;

import java.util.List;

public interface VehicleService {

    List<VehicleDTO> getListVehicleByCustomer(long customerId);

}
