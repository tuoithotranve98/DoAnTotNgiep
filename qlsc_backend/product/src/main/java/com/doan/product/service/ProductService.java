package com.doan.product.service;

import com.doan.product.exception.NotANumberException;
import com.doan.product.exception.productException.ProductNotFoundException;
import com.doan.product.model.ProductRequest;
import com.doan.product.dto.ProductDTO;
import com.doan.product.model.ProductResponse;
import com.doan.product.model.SearchProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ProductService {

    Map<String, Object> getAll(SearchProduct searchProduct);
    ProductResponse save(ProductRequest productRequest, String tenantId) throws Exception;
    ProductResponse update(ProductRequest productRequest, Long id) throws Exception;
    String createNewCode() throws NotANumberException;
    ProductDTO getOneById(Long id) throws ProductNotFoundException;
    void deleteById(Long id) throws ProductNotFoundException;
    boolean isCodeExist(String code);
    ProductDTO getOneByIdAndType(Long id, Byte type) throws ProductNotFoundException;
    ProductResponse multiDelete(List<Long> ids);
}
