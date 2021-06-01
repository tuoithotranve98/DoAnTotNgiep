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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserConsumer {

    private final UserRepository userRepository;

    @KafkaListener(topics = {"dk3w4sws-user"}, groupId = "repair-manager")
    public void consume(@Payload String message, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) {
        try {
            Optional<User> user = userRepository.findById(Long.parseLong(key));
            if(user.isPresent()) {
                User newUser = user.get();
                newUser.setTotalMaintenanceCard(newUser.getTotalMaintenanceCard() + Integer.parseInt(message));
                userRepository.save(newUser);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
