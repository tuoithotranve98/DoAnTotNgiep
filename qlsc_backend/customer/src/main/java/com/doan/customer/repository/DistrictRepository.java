package com.doan.customer.repository;

import com.doan.customer.entity.main.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, String> {

    @Query(value = "FROM District d, Province p WHERE d.province.code = p.code")
    List<District> getDistinct();
}
