package com.doan.product.converter;

import com.doan.product.dto.ProductDTO;
import com.doan.product.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter {

    public ProductDTO convertToDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setCode(product.getCode());
        productDTO.setUnit(product.getUnit());
        productDTO.setPricePerUnit(product.getPricePerUnit());
        productDTO.setQuantity(product.getQuantity());
        productDTO.setDescription(product.getDescription());
        productDTO.setImages(product.getImages());
        productDTO.setCreatedDate(product.getCreatedDate());
        productDTO.setModifiedDate(product.getModifiedDate());
        productDTO.setStatus(product.getStatus());
        productDTO.setType(product.getType());
        return productDTO;
    }

}
