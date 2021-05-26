package com.doan.user.dto;


import com.doan.user.entity.Tenant;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO extends BaseDTO{

    private String code;
    private String email;
    private String password;
    @JsonProperty("new_password")
    private String newPassword;
    @JsonProperty("old_password")
    private String oldPassword;
    private String name;
    private String phone;
    private String address;
    private byte status;
    private byte role;
    private String text;
    @JsonProperty("message_number")
    private int messageNumber;
    private int totalMaintenanceCard;
    private Tenant tenant;

}
