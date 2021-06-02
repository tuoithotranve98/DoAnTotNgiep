package com.doan.maintenancecard.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Receiver {

    private final SimpMessagingTemplate template;
    private final ObjectMapper json;

}
