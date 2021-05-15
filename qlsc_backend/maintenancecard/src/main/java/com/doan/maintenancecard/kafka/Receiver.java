package com.doan.maintenancecard.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Receiver {


    private final SimpMessagingTemplate template;
    private final ObjectMapper json;

//    @KafkaListener(topics = "${cloudkarafka.topic}", groupId = "repair-manager")
//    public void sendToClient(String message) {
//        System.out.println("....");
//        System.out.println("message : "+message);
//        try {
//            template.convertAndSend("/topic/message", json.writeValueAsString(message));
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//    }
}
