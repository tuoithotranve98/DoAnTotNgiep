package com.doan.product.repository;

import com.doan.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT MAX(CONVERT(SUBSTRING(code, 5), UNSIGNED INTEGER)) as maxcode FROM "
        + "products WHERE code LIKE 'sp%' LIMIT 1", nativeQuery = true)
    List<String> getMaxCode();

    Optional<String> findByCode(String code);

    Optional<Product> findByIdAndType(Long id, Byte type);

    @Modifying
    @Transactional
    @Query("UPDATE Product SET status = 0 WHERE id =:id")
    void updateStatusProduct(@Param("id") Long id);

    @Query("SELECT p FROM Product p WHERE p.status = 1 AND (p.name LIKE %?1%"
        + " OR p.code LIKE %?1%) AND p.type IN ?2")
    Page<Product> search(Pageable pageable, String keyWork, Byte[] type);
}
