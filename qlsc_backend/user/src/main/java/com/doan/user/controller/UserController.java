package com.doan.user.controller;

import com.doan.user.model.UserResponse;
import com.doan.user.service.UserService;
import com.doan.user.dto.PasswordPoJo;
import com.doan.user.dto.UserDTO;
import com.doan.user.exception.CodeExistedException;
import com.doan.user.exception.commonException.NotFoundException;
import com.doan.user.exception.userException.DuplicateEmailException;
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

    @GetMapping("users")
    public ResponseEntity<Map<String, Object>> getAllUsers(@RequestParam(name = "page", defaultValue = "1", required = false) int pageNum,
                                                           @RequestParam(name = "size", defaultValue = "5", required = false) int pageSize,
                                                           @RequestParam(value = "sortBy", defaultValue = "modifiedDate") String sortBy,
                                                           @RequestParam(value = "descending", defaultValue = "desc") String descending,
                                                           @RequestParam(value = "search", defaultValue = "") String param) {
        Map<String, Object> allUser = userService.getListUser(pageNum, pageSize, sortBy, descending, param);
        return new ResponseEntity<>(allUser, HttpStatus.OK);
    }

    @GetMapping("users/maintenanceCard")
    public ResponseEntity<Map<String, Object>> getTotalMaintenanceCardByRepairman(@RequestParam(defaultValue = "1", required = false) int page,
                                                             @RequestParam(defaultValue = "5", required = false) int size,
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
            userService.insertUser(userDTO);
            return new UserResponse(Boolean.TRUE);
        } catch (Exception e) {
            return new UserResponse(Boolean.FALSE);
        }
    }

    @PostMapping("users/{id}")
    public UserResponse updateUser(@RequestBody UserDTO userDTO, @PathVariable("id") Long id) {
        try {
            userService.updateUser(userDTO, id);
            return new UserResponse(Boolean.TRUE);
        } catch (Exception e) {
            return new UserResponse(Boolean.FALSE);
        }

    }

    @DeleteMapping("users/delete")
    public ResponseEntity<String> deleteUsers(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = userService.deleteUserById(listID);
        if (isDelete) {
            return new ResponseEntity<>("Delete SuccessFully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Delete Failed", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("users/changePassword")
    public ResponseEntity<UserDTO> changePassword(@RequestBody PasswordPoJo passwordPoJo) throws NotFoundException {
        return new ResponseEntity<>(userService.changePassword(passwordPoJo), HttpStatus.OK);
    }

    @GetMapping("checkUser")
    public UserDTO getInformationUser() throws NotFoundException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        return userService.checkUserNameUser(authentication.getName());
    }

    @GetMapping("test")
    public String testApi() {
        return "Success";
    }
}
