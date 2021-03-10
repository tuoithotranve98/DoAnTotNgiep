package com.nk.customer.entity.main;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "provinces")
@Getter
@Setter
public class Province {

    @Column(length = 50)
    public String name;

    @Id
    @Column(name = "code_province", length = 50)
    public String code;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "province")
    public List<District> districts;

}
