package com.doan.user.service;

import com.doan.user.dto.PasswordRequest;
import com.doan.user.dto.UserDTO;
import com.doan.user.exception.CodeExistedException;
import com.doan.user.exception.commonException.NotFoundException;
import com.doan.user.exception.userException.DuplicateEmailException;
import com.doan.user.model.UserResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface UserService {

    Map<String, Object> getListUser(int page, int size, String sortBy, String descending, String search, String tenantId);
    Map<String, Object> getListUserV1(String tenantId);
    HashMap<String, Object> getTotalMaintenanceCardByRepairman(int page, int size, String key);
    UserDTO getUserById(Long id) throws NotFoundException;
    UserDTO insertUser(UserDTO userDTO, String tenantId) throws DuplicateEmailException, CodeExistedException;
    UserResponse updateUser(UserDTO userDTO, Long id) ;
    UserResponse deleteUserById(List<Long> arrayID);
    String generateCode();
    UserDTO checkUserNameUser(String username) throws NotFoundException;
    UserResponse changePassword(PasswordRequest password) throws NotFoundException;
}
