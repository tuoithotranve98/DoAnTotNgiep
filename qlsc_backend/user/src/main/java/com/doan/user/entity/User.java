package com.doan.user.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User extends BaseEntity {

    @Column(name = "code", nullable = false, length = 11, unique = true)
    private String code;
    @NotBlank
    @NotNull
    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String email;
    @NotBlank
    @NotNull
    @Column(name = "password", nullable = false, length = 255)
    private String password;
    @NotNull
    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;
    @NotBlank
    @Column(name = "phone_number", nullable = false, length = 10)
    private String phoneNumber;

    @Column(name = "address", columnDefinition = "text(5000)")
    private String address;

    @Column(name = "status", nullable = false, columnDefinition = "tinyint default 0")
    private byte status;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Message> messages;

    @Column(name = "role")
    private byte role;

    @Column(name = "total_maintenance_card")
    private int totalMaintenanceCard;

    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

}
