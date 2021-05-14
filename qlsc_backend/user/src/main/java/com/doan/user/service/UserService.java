package com.doan.user.service;

import com.doan.user.dto.PasswordPoJo;
import com.doan.user.dto.UserDTO;
import com.doan.user.exception.CodeExistedException;
import com.doan.user.exception.commonException.NotFoundException;
import com.doan.user.exception.userException.DuplicateEmailException;
import com.doan.user.model.UserResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface UserService {

    Map<String, Object> getListUser(int page, int size, String sortBy, String descending, String search);
    Map<String, Object> getAllUser(int pageNumber, int size);
    Map<String, Object> getListUserV1();
    HashMap<String, Object> getTotalMaintenanceCardByRepairman(int page, int size, String key);
    UserDTO getUserById(Long id) throws NotFoundException;
    UserDTO insertUser(UserDTO userDTO) throws DuplicateEmailException, CodeExistedException;
    UserDTO updateUser(UserDTO userDTO, Long id) throws CodeExistedException;
    UserResponse deleteUserById(List<Long> arrayID);
    String generateCode();
    Boolean checkLogin(UserDTO userDTO);
    UserDTO checkUserNameUser(String username) throws NotFoundException;
    UserDTO changePassword(PasswordPoJo passwordPoJo) throws NotFoundException;
}
