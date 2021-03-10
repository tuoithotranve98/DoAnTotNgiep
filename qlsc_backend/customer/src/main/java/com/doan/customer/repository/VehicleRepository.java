package com.doan.customer.repository;

import com.doan.customer.entity.main.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {

    @Query(value = "SELECT * FROM vehicles v WHERE v.customer_id = :customerId ;", nativeQuery = true)
    List<Vehicle> getAllByCustomer(@Param("customerId") long customerId);

    Vehicle getVehicleByPlateNumber(String plateNumber);

}
