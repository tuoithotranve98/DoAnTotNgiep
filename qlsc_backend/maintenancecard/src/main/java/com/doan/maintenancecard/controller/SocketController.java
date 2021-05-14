package com.doan.maintenancecard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SocketController {

    private final SimpMessagingTemplate template;

    @PostMapping("/send")
    public String sendMessage(@RequestBody String message) {
        template.convertAndSend("/topic/message", message);
        return "success";
    }

    @MessageMapping("/send-message")
    public void receiveMessage(@Payload String message) {
        // receive message from client
    }

    @SendTo("/topic/message")
    public String broadcastMessage(@Payload String message) {
        return message;
    }
}
