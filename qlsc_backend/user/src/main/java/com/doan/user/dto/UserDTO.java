package com.doan.user.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO extends BaseDTO{

    private String code;
    private String email;
    private String password;
    private String name;
    private String phone;
    private String address;
    private byte status;
    private byte role;
    @JsonProperty("message_number")
    private int messageNumber;
    private int totalMaintenanceCard;

}
