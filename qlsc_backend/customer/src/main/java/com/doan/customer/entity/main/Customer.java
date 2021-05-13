package com.doan.customer.entity.main;

import com.doan.customer.dto.main.CustomerDTO;
import com.doan.customer.validation.anotation.CustomerPhone;
import com.doan.customer.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "customers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "phone",nullable = false, length = 11)
    @CustomerPhone
    private String phone;

    @Column(length = 11, unique = true, nullable = false)
    private String code;

    @Column(length = 100)
    private String email;

    @Column(columnDefinition = "text(5000)")
    private String description;

    @ManyToOne
    @JoinColumn(name = "ward_code")
    private Ward ward;

    @Column(columnDefinition = "text(5000)")
    private String address;

    @Column(nullable = false)
    private byte status;

    @OneToMany(mappedBy = "customer")
    private List<Vehicle> vehicles;

    public void setCustomer(CustomerDTO customerDTO) {
        this.code = customerDTO.getCode();
        this.name = customerDTO.getName();
        this.phone = customerDTO.getPhone();
        this.email = customerDTO.getEmail();
        this.description = customerDTO.getDescription();
        this.status = customerDTO.getStatus();
        this.address = customerDTO.getAddress();
    }

}
