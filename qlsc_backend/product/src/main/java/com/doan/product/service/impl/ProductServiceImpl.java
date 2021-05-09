package com.doan.product.service.impl;

import com.doan.product.entity.ProductHistory;
import com.doan.product.exception.productException.ProductNotFoundException;
import com.doan.product.model.ProductRequest;
import com.doan.product.model.ProductResponse;
import com.doan.product.model.SearchProduct;
import com.doan.product.repository.ProductHistoryRepository;
import com.doan.product.repository.ProductRepository;
import com.doan.product.service.ProductService;
import com.doan.product.converter.ProductConverter;
import com.doan.product.dto.ProductDTO;
import com.doan.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductConverter productConverter;
    private final ProductHistoryRepository productHistoryRepository;

    @Override
    public Map<String, Object> getAll(SearchProduct searchProduct) {

        int pageNumber = searchProduct.getPage();
        int size = searchProduct.getSize();
        String nameField = searchProduct.getNameField();
        String order = searchProduct.getOrder();
        String keyWork = searchProduct.getSearch();
        Byte[] type = convertIntToByte(searchProduct.getType());
        Pageable paging = PageRequest.of(pageNumber - 1, size, Sort.by("modifiedDate").descending());

        if (nameField.equals("code")) {
            if (order.equals("ascend")) {
                paging = PageRequest.of(pageNumber - 1, size, Sort.by("code"));
            } else if (order.equals("descend")) {
                paging = PageRequest.of(pageNumber - 1, size, Sort.by("code").descending());
            }
        } else if (nameField.equals("name")) {
            if (order.equals("ascend")) {
                paging = PageRequest.of(pageNumber - 1, size, Sort.by("name"));
            } else if (order.equals("descend")) {
                paging = PageRequest.of(pageNumber - 1, size, Sort.by("name").descending());
            }
        }

        Page<Product> productPage = productRepository.search(paging, keyWork, type);
        List<ProductDTO> productDTOS = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<Product> products = productPage.getContent();
        products.forEach(product -> productDTOS.add(productConverter.convertToDTO(product)));
        map.put("productServices", productDTOS);
        map.put("currentPage", productPage.getNumber() + 1);
        map.put("totalItem", productPage.getTotalElements());
        map.put("totalPage", productPage.getTotalPages());
        return map;
    }

    @Override
    public String createNewCode() {
        StringBuilder newCode = new StringBuilder("sp00");
        List<String> fetchedCode = productRepository.getMaxCode();
        long codeNumber;
        if (StringUtils.isBlank(fetchedCode.get(0))) {
            return newCode.append(1).toString();
        } else {
            codeNumber = Long.parseLong(fetchedCode.get(0));
            String codeNumberString;
            do {
                newCode = new StringBuilder("sp00");
                codeNumber++;
                codeNumberString = Long.toString(codeNumber);
                newCode.append(codeNumberString);
            }
            while (this.isCodeExist(newCode.toString()));
        }
        return newCode.toString();
    }

    @Override
    public ProductDTO getOneById(Long id) throws ProductNotFoundException {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isEmpty()) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        Product product = productOptional.get();
        if (product.getStatus() == 0) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        return productConverter.convertToDTO(product);
    }

    @Override
    public void deleteById(Long id) throws ProductNotFoundException {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isEmpty()) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        Product product = productOptional.get();
        product.setStatus((byte) 0);
        productRepository.save(product);
        if (product.getType() == 1) {
            Date now = new Date();
            ProductHistory productHistory = new ProductHistory();
            productHistory.setAmountChargeInUnit(-product.getQuantity());
            productHistory.setName(product.getName());
            productHistory.setNote("Xóa sản phẩm");
            productHistory.setProductId(product.getId());
            productHistory.setStockRemain(0);
            productHistory.setCreatedDate(now);
            productHistory.setModifiedDate(now);
            productHistoryRepository.save(productHistory);
        }
    }

    @Override
    public boolean isCodeExist(String code) {
        Optional<String> codeOptional = productRepository.findByCode(code);
        return codeOptional.isPresent();
    }

    @Override
    public ProductDTO getOneByIdAndType(Long id, Byte type) throws ProductNotFoundException {
        Optional<Product> productOptional = productRepository.findByIdAndType(id, type);
        if (productOptional.isEmpty()) {
            throw new ProductNotFoundException("Product not found!");
        }
        Product product = productOptional.get();
        return productConverter.convertToDTO(product);
    }

    @Override
    public void multiDelete(Long[] idArray) {
        productRepository.multipleDelete(idArray);
    }

    @Override
    public ProductResponse save(ProductRequest productReq) {
        Product product = new Product();
        if (StringUtils.isNotBlank(productReq.getCode())
            && isCodeExist(productReq.getCode())) {
            return new ProductResponse(Boolean.FALSE, "Mã sp đã tồn tại");
        }
        if (StringUtils.isNotBlank(productReq.getCode())) {
            product.setCode(productReq.getCode());
        } else {
            product.setCode(createNewCode());
        }
        product.setImages(productReq.getImage());
        product.setName(productReq.getName());
        product.setQuantity(productReq.getQuantity());
        product.setUnit(productReq.getUnit());
        product.setPricePerUnit(new BigDecimal(productReq.getPricePerUnit()));
        product.setDescription(productReq.getDescription());
        product.setType(productReq.getType());
        product.setCreatedDate(new Date());
        product.setModifiedDate(new Date());
        product.setStatus((byte) 1);
        try {
            Product savedProduct = productRepository.save(product);
            if (product.getType() == 1) {
                ProductHistory productHistory = new ProductHistory();
                productHistory.setAmountChargeInUnit(savedProduct.getQuantity());
                productHistory.setName(savedProduct.getName());
                productHistory.setNote("Thêm sản phẩm");
                productHistory.setProductId(savedProduct.getId());
                productHistory.setStockRemain(savedProduct.getQuantity());
                productHistory.setCreatedDate(new Date());
                productHistory.setModifiedDate(new Date());
                productHistoryRepository.save(productHistory);
            }
        } catch (Exception e) {
            return new ProductResponse(Boolean.FALSE, "false");
        }
        return new ProductResponse(Boolean.TRUE, "success");

    }

    @Override
    public ProductResponse update(ProductRequest productReq, Long id) throws Exception {
        Product product = productRepository.getOne(id);
        if (ObjectUtils.isEmpty(product)) {
            new ProductResponse(Boolean.FALSE, "Sản phẩm không tồn tại");
        }
        if (StringUtils.isNotBlank(productReq.getCode())
            && isCodeExist(productReq.getCode())) {
            return new ProductResponse(Boolean.FALSE, "Mã sp đã tồn tại");
        }
        if (StringUtils.isNotBlank(productReq.getCode())) {
            product.setCode(productReq.getCode());
        }
        product.setImages(productReq.getImage());
        product.setName(productReq.getName());
        product.setQuantity(productReq.getQuantity());
        product.setUnit(productReq.getUnit());
        product.setPricePerUnit(new BigDecimal(productReq.getPricePerUnit()));
        product.setStatus(productReq.getStatus());
        product.setDescription(productReq.getDescription());
        product.setType(productReq.getType());
        try {
            Product savedProduct = productRepository.save(product);
            if (product.getType() == 1 && product.getQuantity() != savedProduct.getQuantity()) {
                Date now = new Date();
                ProductHistory productHistory = new ProductHistory();
                productHistory.setAmountChargeInUnit(savedProduct.getQuantity() - product.getQuantity());
                productHistory.setName(savedProduct.getName());
                productHistory.setNote("Cập nhật số lượng");
                productHistory.setProductId(savedProduct.getId());
                productHistory.setStockRemain(savedProduct.getQuantity());
                productHistory.setCreatedDate(now);
                productHistory.setModifiedDate(now);
                productHistoryRepository.save(productHistory);
            }
            return new ProductResponse(Boolean.TRUE, "success");
        } catch (Exception e) {
            return new ProductResponse(Boolean.FALSE, "false");
        }
    }

    private Byte[] convertIntToByte(List<Integer> type) {
        if (type.contains(1) && !type.contains(2)) {
            return new Byte[]{1};
        } else if (!type.contains(1) && type.contains(2)) {
            return new Byte[]{2};
        } else if (type.contains(1) && type.contains(2)) {
            return new Byte[]{1, 2};
        }
        return new Byte[]{1, 2};
    }
}
