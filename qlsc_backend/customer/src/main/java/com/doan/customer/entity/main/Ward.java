package com.doan.customer.entity.main;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "wards")
@Getter
@Setter
public class Ward {

    @Column(length = 50)
    public String name;
    @Id
    @Column(name = "code_ward", length = 50)
    public String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "code_district")
    public District district;

    @OneToMany(mappedBy = "ward",cascade = CascadeType.ALL)
    public List<Customer> customers;

}
