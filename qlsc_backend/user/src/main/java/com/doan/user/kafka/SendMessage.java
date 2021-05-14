package com.doan.user.kafka;

import com.doan.user.model.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SendMessage {

    @Value("${cloudkarafka.topic}")
    private String topic;

    private final ObjectMapper json;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(Message message) {
        try {
            this.kafkaTemplate.send(topic, json.writeValueAsString(message));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
