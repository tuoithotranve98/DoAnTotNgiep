package com.doan.maintenancecard.controller;

import com.doan.maintenancecard.kafka.ProductModel;
import com.doan.maintenancecard.kafka.SendMessage;
import com.doan.maintenancecard.model.Message;
import com.doan.maintenancecard.model.UserModel;
import com.doan.maintenancecard.service.AppRequestService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping()
@RequiredArgsConstructor
public class KafkaController {

    private final ObjectMapper json;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @PostMapping("kafka/send_message")
    public String sendMessage() {
        ProductModel productModel = new ProductModel();
        productModel.setAmount(2);
        productModel.setStatus(1);
        productModel.setCode("001");
        try {
            String message = json.writeValueAsString(productModel);
            kafkaTemplate.send("dk3w4sws-product", "1", message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "success";
    }

}
