package com.nk.customer.entity.main;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "districts")
@Getter
@Setter
public class District {

    @Column(length = 50)
    public String name;

    @Id
    @Column(name = "code_district", length = 50)
    public String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "code_province")
    public Province province;

    @OneToMany(mappedBy = "district",fetch = FetchType.LAZY)
    public List<Ward> wards;

}
