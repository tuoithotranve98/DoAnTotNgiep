package com.doan.user.kafka;

import com.doan.user.entity.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.doan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserConsumer {

    private final UserRepository userRepository;

    @KafkaListener(topics = {"dk3w4sws-user"},groupId = "repair-manager")
    @Transactional
    public void consume(@Payload String message, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws JsonProcessingException {
        User user = userRepository.getOne(Long.parseLong(key));
        user.setTotalMaintenanceCard(user.getTotalMaintenanceCard()+Integer.parseInt(message));
        userRepository.save(user);
    }
//    @KafkaListener(topics = {"Kafka_json5"},groupId = "Group_json",containerFactory = "productDTOKafkaListenerContainerFactory")
//    public void consumeJson(ProductDTO productDTO){
//        System.out.println(productDTO);
////        productService.insertProduct(productDTO);
//    }

}
