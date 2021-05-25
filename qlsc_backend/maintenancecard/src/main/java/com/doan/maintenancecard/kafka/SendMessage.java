package com.doan.maintenancecard.kafka;

import com.doan.maintenancecard.entity.MaintenanceCard;
import com.doan.maintenancecard.model.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SendMessage {

    private final ObjectMapper json;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private static final String TOPIC_PRODUCT = "dk3w4sws-product";
    private static final String TOPIC_CUSTOMER = "dk3w4sws-customer";
    private static final String TOPIC_USER = "dk3w4sws-user";

    public void sendToProduct(ProductModel product, String key) {
        try {
            String message = json.writeValueAsString(product);
            kafkaTemplate.send(TOPIC_PRODUCT, key, json.writeValueAsString(message));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    //lưu thông tin xe
    public void sendToCustomer(MaintenanceCard maintenanceCard) {
        VehicleModel vehicleModel = new VehicleModel();
        vehicleModel.setColor(maintenanceCard.getColor());
        vehicleModel.setModel(maintenanceCard.getModel());
        vehicleModel.setPlateNumber(maintenanceCard.getPlatesNumber());
        try {
            String message = json.writeValueAsString(vehicleModel);
            kafkaTemplate.send(TOPIC_CUSTOMER, maintenanceCard.getId().toString(), json.writeValueAsString(message));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    //cập nhật số phiếu cho nhân viên
    public void sendToUser(String key, String value) {
        kafkaTemplate.send(TOPIC_USER, key, value);
    }

}
