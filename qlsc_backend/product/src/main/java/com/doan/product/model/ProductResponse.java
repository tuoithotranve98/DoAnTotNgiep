package com.doan.product.model;

import com.doan.product.entity.Product;
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
    private Product product;
    public ProductResponse(boolean success, Product product) {
        this.success = success;
        this.product = product;
    }
}
