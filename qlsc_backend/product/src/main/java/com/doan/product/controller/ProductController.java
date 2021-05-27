package com.doan.product.controller;

import com.doan.product.entity.Product;
import com.doan.product.exception.NotANumberException;
import com.doan.product.exception.productException.ProductNotFoundException;
import com.doan.product.model.ProductRequest;
import com.doan.product.model.ProductResponse;
import com.doan.product.model.SearchProduct;
import com.doan.product.security.AppAuthHelper;
import com.doan.product.service.ProductService;
import com.doan.product.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {

    private final ProductService productService;
    private final AppAuthHelper appAuthHelper;

    //Type 1: accessories
    //Type 2: services
    @GetMapping("products")
    public ResponseEntity<Object> getAll(@ModelAttribute("searchProduct") SearchProduct searchProduct) {
        String tenantId = appAuthHelper.httpCredential().getTenantId();
        Map<String, Object> products = productService.getAll(searchProduct, tenantId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("products/{id}")
    public ResponseEntity<ProductDTO> getOne(@PathVariable("id") String pathId, @RequestParam(value = "type", required = false) String type) throws ProductNotFoundException {
        Long id = Long.parseLong(pathId);
        ProductDTO productDTO = productService.getOneById(id);
        if (StringUtils.isNotBlank(type)) {
            Byte newType = Byte.parseByte(type);
            productDTO = productService.getOneByIdAndType(id, newType);
        }
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @PostMapping("products")
    public ProductResponse create(@RequestBody ProductRequest productRequest) {
        try {
            String tenantId = appAuthHelper.httpCredential().getTenantId();
            return productService.save(productRequest, tenantId);
        } catch (Exception e) {
            return new ProductResponse(Boolean.FALSE, "false", new Product());
        }
    }

    @SneakyThrows
    @PostMapping("products/{id}")
    public ProductResponse update(@RequestBody ProductRequest productRequest,
                                  @PathVariable("id") String id) {
        return productService.update(productRequest, Long.parseLong(id));
    }

    @SneakyThrows
    @DeleteMapping("products/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") String pathId) {
        // check if path id is numeric and check its existence
        if (!StringUtils.isNumeric(pathId)) {
            throw new NotANumberException("Invalid product id: the id is not a number");
        }
        Long id = Long.parseLong(pathId);
        productService.deleteById(id);
        return new ResponseEntity<>("Deleted product with id " + pathId, HttpStatus.OK);
    }

    // multiple delete
    @PostMapping("products/delete")
    public ProductResponse multipleDelete(@RequestParam("ids") List<Long> ids) {
        return productService.multiDelete(ids);
    }

}
