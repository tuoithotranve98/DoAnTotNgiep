package com.doan.customer.entity.main;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "provinces")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Province {

    @Column(length = 50)
    public String name;

    @Id
    @Column(name = "code_province", length = 50)
    public String code;

    @OneToMany(mappedBy = "province",fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    public List<District> districts;

}
