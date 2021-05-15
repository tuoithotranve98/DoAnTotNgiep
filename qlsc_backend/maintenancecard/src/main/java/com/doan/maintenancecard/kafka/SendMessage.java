package com.doan.maintenancecard.kafka;

import com.doan.maintenancecard.model.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SendMessage {

    private final ObjectMapper json;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(String topic, String key, Message message) {
        try {
            kafkaTemplate.send(topic, key, json.writeValueAsString(message));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}
