package com.doan.user.service.impl;

import com.doan.user.converter.UserConverter;
import com.doan.user.service.UserService;
import com.doan.user.dto.PasswordPoJo;
import com.doan.user.dto.UserDTO;
import com.doan.user.entity.User;
import com.doan.user.exception.CodeExistedException;
import com.doan.user.exception.commonException.NotFoundException;
import com.doan.user.exception.userException.DuplicateEmailException;
import com.doan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public Map<String, Object> getListUser(int page, int size, String sortBy, String descending, String search) {
        page = page - 1;
        if (sortBy.isEmpty()) {
            sortBy = "totalMaintenanceCard";
        }
        if (descending.isEmpty()) {
            descending = "desc";
        }
        Pageable paging = PageRequest.of(page, size, Sort.by("totalMaintenanceCard").descending());

        paging = PageRequest.of(page, size, Sort.by(sortBy));
        if (descending.equals("desc")) {
            paging = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }
        Page<User> map = userRepository.getAllUser(paging, search);
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
    public Map<String, Object> getAllUser(int pageNumber, int size) {
        Pageable paging = PageRequest.of(pageNumber - 1, size, Sort.by("id").descending());
        Page<User> userPage = userRepository.findAll(paging);
        List<UserDTO> userDTOs = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<User> users = userPage.getContent();
        for (User user : users) {
            userDTOs.add(userConverter.convertToDTO(user));
        }
        map.put("suppliers", userDTOs);
        map.put("currentPage", userPage.getNumber() + 1);
        map.put("totalItems", userPage.getTotalElements());
        map.put("totalPages", userPage.getTotalPages());
        return map;
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
    public UserDTO insertUser(UserDTO userDTO) throws CodeExistedException {
        User user = new User();
        user.setId(userDTO.getId());
        user.setAddress(userDTO.getAddress());
        user.setStatus(Byte.parseByte(String.valueOf(1)));
        user.setCode(userDTO.getCode() == null ? generateCode() : userDTO.getCode());
        user.setModifiedDate(new Date());
        user.setCreatedDate(new Date());
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setPhoneNumber(userDTO.getPhone());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setFullName(userDTO.getName());

        try {
            return userConverter.convertToDTO(userRepository.save(user));
        } catch (Exception e) {
            throw new CodeExistedException("Duplicate Code. Try Again");
        }

    }

    @Override
    public UserDTO updateUser(UserDTO userDTO, Long id) throws CodeExistedException {
        User user = userRepository.getOne(id);
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
            return userConverter.convertToDTO(userRepository.saveAndFlush(user));
        } catch (Exception e) {
            throw new CodeExistedException("Duplicate Code. Try Again");
        }
    }

    @Override
    public Boolean deleteUserById(List<Long> arrayID) throws Exception {
        Integer rs = 0;
        AtomicBoolean allowDetele = new AtomicBoolean(true);
        List<User> list = userRepository.findAll().stream().filter(user -> user.getRole() == 3).collect(Collectors.toList());
        arrayID.forEach(val -> {
            list.forEach(user -> {
                if (user.getId() == val) {
                    allowDetele.set(false);
                }
            });
        });
        if (Boolean.parseBoolean(String.valueOf(allowDetele))) {
            if (arrayID.size() > 0) {
                for (Long id : arrayID
                ) {
                    rs += userRepository.updateStatusUser(id);
                }
            }
            return true;
        } else {
            throw new Exception("Không được phép xóa người quản lý");
        }


    }

    @Override
    public String generateCode() {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = userRepository.getMaxCodeUser(index);
        do {
            getMaxCode = userRepository.getMaxCodeUser(index);
            if (getMaxCode == null) {
                getMaxCode = "0";
            } else {
                boolean result = StringUtils.isNumeric(getMaxCode);
                if (!result) {
                    getMaxCode = null;
                    index++;
                } else {
                    getMaxCode = getMaxCode;
                }
            }
        } while (getMaxCode == null);
        codeNumber = Long.parseLong(getMaxCode) + 1;
        newCodeString = "ND00" + codeNumber.toString();
        return newCodeString;

    }

    @Override
    public Boolean checkLogin(UserDTO userDTO) {
        String username = userDTO.getEmail();
        String password = userDTO.getPassword();
        User user = userRepository.checkLogin(username, password);
        if (user != null) {
            return true;
        }
        return false;
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
    public UserDTO changePassword(PasswordPoJo passwordPoJo) throws NotFoundException {

        User user = userRepository.getOne(passwordPoJo.getId());
        if (encoder.matches(passwordPoJo.getOldPassword(), user.getPassword())) {
            userRepository.changePassword(encoder.encode(passwordPoJo.getPassword()), passwordPoJo.getId());
            return getUserById(passwordPoJo.getId());
        } else {
            throw new NotFoundException("Password not matches");
        }
    }


}
