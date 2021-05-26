package com.doan.user.controller;

import com.doan.user.model.TenantRequest;
import com.doan.user.model.UserResponse;
import com.doan.user.service.TenantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("admin")
@CrossOrigin(origins = "*")
public class TenantController {

    private final TenantService tenantService;

    @PostMapping("tenant")
    public UserResponse initTenant(@RequestBody TenantRequest tenantRequest) {
        return tenantService.initTenant(tenantRequest);
    }
}
