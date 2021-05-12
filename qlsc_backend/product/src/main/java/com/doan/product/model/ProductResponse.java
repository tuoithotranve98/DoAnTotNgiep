package com.doan.product.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private Boolean success;
    private String message;

    public ProductResponse(boolean success) {
        this.success = success;
    }
}
