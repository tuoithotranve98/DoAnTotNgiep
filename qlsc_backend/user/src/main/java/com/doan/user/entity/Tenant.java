package com.doan.user.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "tenants")
public class Tenant extends BaseEntity {

    @NotBlank
    @NotNull
    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String email;

    @NotBlank
    @NotNull
    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @NotBlank
    @NotNull
    @Column(name = "name_tenant", nullable = false, length = 100)
    private String nameTenant;

    @NotBlank
    @Column(name = "phone_number", nullable = false, length = 10)
    private String phoneNumber;

    @Column(name = "address", columnDefinition = "text(5000)")
    private String address;

    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL)
    private List<User> users;
}
