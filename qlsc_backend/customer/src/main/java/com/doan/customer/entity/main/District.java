package com.doan.customer.entity.main;

import com.doan.customer.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "districts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class District {

    @Column(length = 50)
    public String name;

    @Id
    @Column(name = "code_district", length = 50)
    public String code;

    @ManyToOne
    @JoinColumn(name = "code_province")
    public Province province;

    @OneToMany(mappedBy = "district",fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    public List<Ward> wards;

}
