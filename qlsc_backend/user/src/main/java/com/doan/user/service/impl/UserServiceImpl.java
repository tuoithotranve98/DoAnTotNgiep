package com.doan.user.service.impl;

import com.doan.user.converter.UserConverter;
import com.doan.user.dto.PasswordRequest;
import com.doan.user.entity.Tenant;
import com.doan.user.model.UserResponse;
import com.doan.user.repository.TenantRepository;
import com.doan.user.service.UserService;
import com.doan.user.dto.UserDTO;
import com.doan.user.entity.User;
import com.doan.user.exception.CodeExistedException;
import com.doan.user.exception.commonException.NotFoundException;
import com.doan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserConverter userConverter;
    private final TenantRepository tenantRepository;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public Map<String, Object> getListUser(int page, int size, String sortBy, String descending, String search, String tenantId) {
        page = page - 1;
        if (sortBy.isEmpty()) {
            sortBy = "totalMaintenanceCard";
        }
        if (descending.isEmpty()) {
            descending = "desc";
        }
        Pageable paging;

        paging = PageRequest.of(page, size, Sort.by(sortBy));
        if (descending.equals("desc")) {
            paging = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }
        Page<User> map = userRepository.getAllUser(paging, search, Long.parseLong(tenantId));
        Map<String, Object> hashMap = new HashMap<>();
        List<User> users = map.getContent();
        List<UserDTO> userDTOs = new ArrayList<>();
        users.forEach(user -> userDTOs.add(userConverter.convertToDTO(user)));
        hashMap.put("users", userDTOs);
        hashMap.put("totalPage", map.getTotalPages());
        hashMap.put("currentPage", page + 1);
        hashMap.put("totalElement", map.getTotalElements());
        return hashMap;
    }

    @Override
    public Map<String, Object> getListUserV1(String tenantId){
        Map<String, Object> hashMap = new HashMap<>();
        List<UserDTO> userDTOs = new ArrayList<>();
        List<User> users = userRepository.getAllUserV1(tenantId);
        users.forEach(user -> userDTOs.add(userConverter.convertToDTO(user)));
        hashMap.put("users", userDTOs);
        return hashMap;
    }

    @Override
    public HashMap<String, Object> getTotalMaintenanceCardByRepairman(int page, int size, String key) {
        Pageable paging = PageRequest.of(page - 1, size, Sort.by("totalMaintenanceCard").descending());
        Page<User> map = userRepository.getAllRepairman(paging, key);
        List<User> users = map.getContent();
        List<UserDTO> userDTOS = new ArrayList<>();
        for (User user : users) {
            userDTOS.add(userConverter.convertToDTO(user));
        }
        HashMap<String, Object> mapAll = new HashMap<>();
        long totalElement = map.getTotalElements();
        mapAll.put("total", totalElement);
        mapAll.put("listUser", userDTOS);
        return mapAll;
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.getOne(id);
        return userConverter.convertToDTO(user);

    }

    @Override
    public UserDTO insertUser(UserDTO userDTO, String tenantId) throws CodeExistedException {
        User user = new User();
        user.setId(userDTO.getId());
        user.setAddress(userDTO.getAddress());
        user.setStatus(Byte.parseByte(String.valueOf(1)));
        user.setCode(StringUtils.isBlank(userDTO.getCode()) ? generateCode() : userDTO.getCode());
        user.setModifiedDate(new Date());
        user.setCreatedDate(new Date());
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setPhoneNumber(userDTO.getPhone());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setFullName(userDTO.getName());
        Optional<Tenant> tenant = tenantRepository.findById(Long.parseLong(tenantId));
        tenant.ifPresent(user::setTenant);
        if (tenant.isEmpty()) throw new CodeExistedException("Tenant Not Found");
        try {
            return userConverter.convertToDTO(userRepository.save(user));
        } catch (Exception e) {
            throw new CodeExistedException("Duplicate Code. Try Again");
        }
    }

    @Override
    public UserResponse updateUser(UserDTO userDTO, Long id) {
        Optional<User> isUser = userRepository.findById(id);
        if(isUser.isEmpty()) return new UserResponse(Boolean.FALSE, "Không tồn tại", "400");
        User user = isUser.get();
        if (StringUtils.isNotBlank(userDTO.getNewPassword())) {
            if (encoder.matches(userDTO.getOldPassword(), user.getPassword())) {
                user.setPassword(encoder.encode(userDTO.getNewPassword()));
            } else {
                return new UserResponse(Boolean.FALSE, "Mật khẩu cũ không đúng", "400");
            }
        }
        user.setCode(userDTO.getCode() == null ? user.getCode() : userDTO.getCode());
        user.setId(user.getId());
        user.setAddress(userDTO.getAddress());
        user.setStatus(Byte.parseByte(String.valueOf(1)));
        user.setModifiedDate(new Date());
        user.setCreatedDate(user.getCreatedDate());
        user.setPhoneNumber(userDTO.getPhone());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setFullName(userDTO.getName());
        try {
            userRepository.saveAndFlush(user);
            return new UserResponse(Boolean.TRUE, "Thành công", "200");
        } catch (Exception e) {
            return new UserResponse(Boolean.FALSE, "Lỗi không xác định", "400");
        }
    }

    @Override
    public UserResponse deleteUserById(List<Long> ids) {
        AtomicBoolean allowDelete = new AtomicBoolean(Boolean.TRUE);
        List<User> list = userRepository.findAll().stream().filter(user -> user.getRole() == 3).collect(Collectors.toList());
        ids.forEach(val -> list.forEach(user -> {
            if (user.getId().equals(val)) {
                allowDelete.set(Boolean.FALSE);
            }
        }));
        if (!Boolean.parseBoolean(String.valueOf(allowDelete))) {
            return new UserResponse(Boolean.FALSE, "Không được phép xóa người quản lý");
        }
        try {
            ids.forEach(userRepository::updateStatusUser);
            return new UserResponse(Boolean.TRUE);
        } catch (Exception e) {
            e.printStackTrace();
            return new UserResponse(Boolean.FALSE);
        }
    }

    @Override
    public String generateCode() {
        long codeNumber;
        String newCodeString;
        int index = 0;
        String getMaxCode;
        do {
            getMaxCode = userRepository.getMaxCodeUser(index);
            if (getMaxCode == null) {
                getMaxCode = "0";
            } else if (!StringUtils.isNumeric(getMaxCode)) {
                getMaxCode = null;
                index++;
            }
        } while (getMaxCode == null);
        codeNumber = Long.parseLong(getMaxCode) + 1;
        newCodeString = "ND00" + codeNumber;
        return newCodeString;

    }

    @Override
    public UserDTO checkUserNameUser(String username) throws NotFoundException {
        User user = userRepository.checkExistEmail(username);
        if (user != null) {
            UserDTO userDTO = userConverter.convertToDTO(user);
            userDTO.setPassword(null);
            return userDTO;
        } else {
            throw new NotFoundException("Not Found User");
        }

    }

    @Override
    public UserResponse changePassword(PasswordRequest password) {
        try {
            User user = userRepository.getOne(password.getId());
            if (encoder.matches(password.getOldPassword(), user.getPassword())) {
                userRepository.changePassword(encoder.encode(password.getPassword()), password.getId());
                return new UserResponse(Boolean.TRUE, "Thành công", "200");
            } else {
                return new UserResponse(Boolean.FALSE, "Mật khẩu không đúng", "400");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new UserResponse(Boolean.FALSE);
        }
    }

}
