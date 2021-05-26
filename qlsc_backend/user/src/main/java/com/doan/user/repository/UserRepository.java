package com.doan.user.repository;

import com.doan.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT u FROM User u WHERE u.status = 1 and (u.fullName like  %?1% or " +
        "u.email like %?1% or u.phoneNumber like %?1% or " +
        "u.code like  %?1% or u.address like %?1%) and u.tenant.id = ?2")
    Page<User> getAllUser(Pageable pageable, String param, Long tenantId);

    @Query(value = "select u from User u where u.role = 2 and u.tenant.id = ?1")
    List<User> getAllUserV1(String tenantId);

    @Query(value = "SELECT u FROM User u WHERE u.status =1 and u.role = 2 and (u.fullName like  %:param% or " +
        "u.email like %:param% or u.phoneNumber like %:param% or " +
        "u.code like  %:param% or u.address like %:param%) ")
    Page<User> getAllRepairman(Pageable pageable, String param);

    Page<User> findAll(Pageable pageable);

    @Modifying
    @Query(value = "update Users set Users.status = 0 where Users.id =:UserId", nativeQuery = true)
    Integer updateStatusUser(@Param("UserId") Long UserId);

    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM users WHERE code LIKE '%ND%' ORDER BY newcode DESC LIMIT 1 offset :index", nativeQuery = true)
    String getMaxCodeUser(@Param("index") int index);

    @Query(value = "select u from User u where u.email =:username and u.password =:password")
    User checkLogin(@Param("username") String username, @Param("password") String password);

    @Query(value = "select u from User u where u.email =:username")
    User checkExistEmail(@Param("username") String username);

    @Modifying
    @Query(value = "update User set password =:passwords where id =:userId")
    int changePassword(String passwords, Long userId);

    @Query(value = "select u from User u where u.role =3")
    List<User> getAllManager();

}
