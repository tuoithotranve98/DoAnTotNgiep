package com.doan.user.controller;

import com.doan.user.dto.PasswordRequest;
import com.doan.user.model.UserResponse;
import com.doan.user.security.AppAuthHelper;
import com.doan.user.service.UserService;
import com.doan.user.dto.UserDTO;
import com.doan.user.exception.commonException.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("admin")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final AppAuthHelper appAuthHelper;

    @GetMapping("users")
    public ResponseEntity<Map<String, Object>> getAllUsers(@RequestParam(name = "page", defaultValue = "1", required = false) int pageNum,
                                                           @RequestParam(name = "size", defaultValue = "10", required = false) int pageSize,
                                                           @RequestParam(value = "sortBy", defaultValue = "modifiedDate") String sortBy,
                                                           @RequestParam(value = "descending", defaultValue = "desc") String descending,
                                                           @RequestParam(value = "search", defaultValue = "") String param) {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        Map<String, Object> allUser = userService.getListUser(pageNum, pageSize, sortBy, descending, param, tenantId);
        return new ResponseEntity<>(allUser, HttpStatus.OK);
    }
    // lấy full nhân viên sửa chữa
    @GetMapping("users-v1")
    public ResponseEntity<Map<String, Object>> getAllUsersV1() {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        Map<String, Object> allUser = userService.getListUserV1(tenantId);
        return new ResponseEntity<>(allUser, HttpStatus.OK);
    }

    @GetMapping("users/maintenanceCard")
    public ResponseEntity<Map<String, Object>> getTotalMaintenanceCardByRepairman(@RequestParam(defaultValue = "1", required = false) int page,
                                                             @RequestParam(defaultValue = "20",
                                                                 required = false) int size,
                                                             @RequestParam(defaultValue = "", required = false) String key) {
        HashMap<String, Object> allUser = userService.getTotalMaintenanceCardByRepairman(page, size, key);
        return new ResponseEntity<>(allUser, HttpStatus.OK);
    }

    @GetMapping("users/{id}")
    public ResponseEntity<UserDTO> getInfoUser(@PathVariable("id") Long id) throws NotFoundException {
        UserDTO userDTO = userService.getUserById(id);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PostMapping("users")
    public UserResponse insertUser(@RequestBody UserDTO userDTO) {
        try {
            String tenantId = appAuthHelper.httpCredential().getTenantId();
            userService.insertUser(userDTO, tenantId);
            return new UserResponse(Boolean.TRUE);
        } catch (Exception e) {
            return new UserResponse(Boolean.FALSE);
        }
    }

    @PostMapping("users/{id}")
    public UserResponse updateUser(@RequestBody UserDTO userDTO, @PathVariable("id") Long id) {
        return userService.updateUser(userDTO, id);
    }

    @PostMapping("users/delete")
    public UserResponse deleteUsers(@RequestParam("ids") List<Long> ids) {
        return userService.deleteUserById(ids);
    }

    @PutMapping("users/changePassword")
    public UserResponse changePassword(@RequestBody PasswordRequest request) throws NotFoundException {
        return userService.changePassword(request);
    }

    @GetMapping("checkUser")
    public UserDTO getInformationUser() throws NotFoundException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        return userService.checkUserNameUser(authentication.getName());
    }

}
