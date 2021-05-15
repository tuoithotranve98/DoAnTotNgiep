package com.doan.maintenancecard.controller;

import com.doan.maintenancecard.kafka.SendMessage;
import com.doan.maintenancecard.model.Message;
import com.doan.maintenancecard.model.UserModel;
import com.doan.maintenancecard.service.AppRequestService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
public class KafkaController {

    private final ObjectMapper json;
    private final SendMessage sendMessage;
    private final AppRequestService appRequestService;
    private final HttpServletRequest request;

    @PostMapping("/kafka/send-message")
    public String sendMessage(@RequestBody String message) {
//        ResponseEntity<String> response = this.appRequestService.get("http://user/admin/checkUser", request.getHeader("X-APP-PAGE-TOKEN"));
//        try {
//            if (response.getStatusCode().equals(HttpStatus.OK)) {
//                json.readValue(response.getBody(), UserModel.class);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "false";
//        }
//        sendMessage.sendMessage(message);
        return "success";
    }

}
