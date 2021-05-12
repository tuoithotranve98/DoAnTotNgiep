package com.doan.user.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {

    private boolean success;
    private String message;

    public UserResponse(boolean success) {
        this.success = success;
    }
}
