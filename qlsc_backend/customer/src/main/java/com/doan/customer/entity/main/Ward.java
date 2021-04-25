package com.doan.customer.entity.main;

import com.doan.customer.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "wards")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ward {

    @Column(length = 50)
    public String name;

    @Id
    @Column(name = "code_ward", length = 50)
    public String code;

    @ManyToOne
    @JoinColumn(name = "code_district")
    public District district;

    @OneToMany(mappedBy = "ward")
    public List<Customer> customers;

}
