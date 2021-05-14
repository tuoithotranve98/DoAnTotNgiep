package com.doan.product.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Receiver {

    private final SimpMessagingTemplate template;
    private final ObjectMapper json;

    @KafkaListener(topics = "${cloudkarafka.topic}", groupId = "repair-manager")
    public void sendToClient(Message message) {
        try {
            template.convertAndSend("/topic/message", json.writeValueAsString(message));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
