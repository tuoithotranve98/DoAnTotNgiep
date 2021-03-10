package com.nk.customer.dto.base;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BaseDTO {

    private Long id;
    private Date createdDate;
    private Date modifiedDate;

}
