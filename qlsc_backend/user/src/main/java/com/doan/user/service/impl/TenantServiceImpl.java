package com.doan.user.service.impl;

import com.doan.user.entity.Tenant;
import com.doan.user.entity.User;
import com.doan.user.model.TenantRequest;
import com.doan.user.model.UserResponse;
import com.doan.user.repository.TenantRepository;
import com.doan.user.repository.UserRepository;
import com.doan.user.service.TenantService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public UserResponse initTenant(TenantRequest request) {
        Tenant tenant = new Tenant();
        tenant.setFullName(request.getFullName());
        tenant.setPhoneNumber(request.getPhoneNumber());
        tenant.setEmail(request.getEmail());
        tenant.setAddress(request.getAddress());
        tenant.setNameTenant(request.getNameTenant());
        tenant.setCreatedDate(new Date());
        tenant.setModifiedDate(new Date());

        //init User
        User user = new User();
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        user.setEmail(request.getEmail());
        user.setRole((byte) 3);
        user.setCreatedDate(new Date());
        user.setModifiedDate(new Date());
        user.setCode("NV001");
        user.setStatus((byte) 1);
        if (StringUtils.isNotBlank(encoder.encode(request.getPassword()))) {
            user.setPassword("admin");
        } else {
            user.setPassword(encoder.encode(request.getPassword()));
        }
        List<User> users = new ArrayList<>();
        users.add(user);
        tenant.setUsers(users);
        try {
            Tenant newTenant = tenantRepository.save(tenant);
            User newUser = newTenant.getUsers().get(0);
            newUser.setTenant(newTenant);
            userRepository.save(newUser);
            return new UserResponse(Boolean.TRUE, "success");
        } catch (Exception e) {
            e.printStackTrace();
            return new UserResponse(Boolean.FALSE);
        }
    }

}
