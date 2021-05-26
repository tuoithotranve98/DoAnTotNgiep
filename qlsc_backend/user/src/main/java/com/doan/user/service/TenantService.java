package com.doan.user.service;

import com.doan.user.model.TenantRequest;
import com.doan.user.model.UserResponse;

public interface TenantService {

    UserResponse initTenant(TenantRequest tenant);
}
