package com.doan.maintenancecard.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserModel {

    private String code;
    private String email;
    private String password;
    private String name;
    private String phone;
    private String address;
    private byte status;
    private byte role;
    private String text;
    @JsonProperty("message_number")
    private int messageNumber;
    private int totalMaintenanceCard;
}
