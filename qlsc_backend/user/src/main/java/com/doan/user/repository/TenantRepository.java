package com.doan.user.repository;

import com.doan.user.entity.Tenant;
import com.doan.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
    //
}
