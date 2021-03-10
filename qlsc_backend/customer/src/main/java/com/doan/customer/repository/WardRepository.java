package com.doan.customer.repository;

import com.doan.customer.entity.main.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WardRepository extends JpaRepository<Ward, Integer> {

    @Query(value = "FROM Ward w, District d WHERE w.district.code = d.code AND w.district.code = ?1")
    List<Ward> getWardByDistrict(String district);

}
