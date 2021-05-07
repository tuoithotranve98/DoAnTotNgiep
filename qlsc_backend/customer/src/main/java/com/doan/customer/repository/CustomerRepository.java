package com.doan.customer.repository;

import com.doan.customer.entity.main.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>, PagingAndSortingRepository<Customer, Long> {

    Customer findOneByCode(String code);

    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM customers WHERE code LIKE 'kh00%' ORDER BY newcode DESC LIMIT 1 offset :index", nativeQuery = true)
    String getMaxCode(@Param("index") int index);

    @Query("SELECT c FROM Customer c WHERE c.status = 1 AND (c.name LIKE %?1%"
            + " OR c.code LIKE %?1%"
            + " OR c.email LIKE %?1%"
            + " OR c.phone LIKE %?1%)")
    Page<Customer> search(Pageable pageable, String keyWork);

    @Query(value = "SELECT c FROM Customer c WHERE c.phone = ?1 ")
    Customer checkPhoneNumber(String phone);
}
