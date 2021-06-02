package com.doan.product.kafka;

import com.doan.product.entity.ProductHistory;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.doan.product.entity.Product;
import com.doan.product.repository.ProductHistoryRepository;
import com.doan.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class ProductConsumer {

    private final ObjectMapper json;
    private final ProductRepository productRepository;
    private final ProductHistoryRepository productHistoryRepository;

    @KafkaListener(topics = {"dk3w4sws-product"}, groupId = "repair-manager")
    public void consume(@Payload String message, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws JsonProcessingException {
        try {
            ProductModel productModel = json.readValue(String.valueOf(message), ProductModel.class);
            Product product = productRepository.findById(Long.parseLong(key)).orElse(null);
            if (product != null) {
                product.setQuantity(product.getQuantity() - productModel.getAmount());
                productRepository.save(product);
                Date now = new Date();
                ProductHistory productHistory = new ProductHistory();
                productHistory.setAmountChargeInUnit(productModel.getAmount());
                productHistory.setName(product.getName());
                if (productModel.getStatus() == 0) {
                    productHistory.setNote("Tạo đơn " + productModel.getCode().toUpperCase());
                } else if (productModel.getStatus() == 1) {
                    productHistory.setNote("Thêm vào đơn " + productModel.getCode().toUpperCase());
                } else if (productModel.getStatus() == 2) {
                    productHistory.setNote("Xóa khỏi đơn" + productModel.getCode().toUpperCase());
                }
                productHistory.setProductId(product.getId());
                productHistory.setStockRemain(product.getQuantity());
                productHistory.setCreatedDate(now);
                productHistory.setModifiedDate(now);
                productHistoryRepository.save(productHistory);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
