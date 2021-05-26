package com.doan.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TenantRequest {

    private String email;
    @NotBlank
    @JsonProperty("full_name")
    private String fullName;
    @NotBlank
    @JsonProperty("name_tenant")
    private String nameTenant;
    @NotBlank
    @JsonProperty("phone_number")
    private String phoneNumber;
    private String address;
    @JsonProperty("password")
    private String password;
}
