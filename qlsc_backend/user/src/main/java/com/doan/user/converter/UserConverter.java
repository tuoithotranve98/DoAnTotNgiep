package com.doan.user.converter;

import com.doan.user.dto.UserDTO;
import com.doan.user.entity.Tenant;
import com.doan.user.entity.User;
import com.doan.user.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

@Component
@RequiredArgsConstructor
public class UserConverter {

    private final MessageService messageService;

    public UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setCode(user.getCode());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getFullName());
        userDTO.setPhone(user.getPhoneNumber());
        userDTO.setPassword(user.getPassword());
        userDTO.setStatus(user.getStatus());
        userDTO.setCreatedDate(user.getCreatedDate());
        userDTO.setModifiedDate(user.getModifiedDate());
        userDTO.setId(user.getId());
        userDTO.setText(user.getFullName() +" - "+ user.getTotalMaintenanceCard());
        userDTO.setAddress(user.getAddress());
        userDTO.setRole(user.getRole());
        userDTO.setMessageNumber(messageService.countMessageByUserId(user.getId()));
        userDTO.setTotalMaintenanceCard(user.getTotalMaintenanceCard());
        if (!ObjectUtils.isEmpty(user.getTenant())) {
            Tenant tenant = new Tenant();
            tenant.setNameTenant(user.getTenant().getNameTenant());
            tenant.setId(user.getTenant().getId());
            tenant.setPhoneNumber(user.getTenant().getPhoneNumber());
            tenant.setAddress(user.getTenant().getAddress());
            tenant.setEmail(user.getTenant().getEmail());
            userDTO.setTenant(tenant);
        }
        return userDTO;
    }

}
