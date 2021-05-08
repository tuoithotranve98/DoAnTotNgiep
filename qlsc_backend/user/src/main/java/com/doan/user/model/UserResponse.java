package com.doan.user.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private boolean success;
    private String message;

    public UserResponse(boolean success) {
        this.success = success;
    }
}
