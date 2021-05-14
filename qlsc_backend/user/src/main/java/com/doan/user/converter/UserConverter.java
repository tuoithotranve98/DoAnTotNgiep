package com.doan.user.converter;

import com.doan.user.dto.UserDTO;
import com.doan.user.entity.User;
import com.doan.user.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
        return userDTO;
    }

}
