package com.doan.user.kafka;

import com.doan.user.converter.MessageConverter;
import com.doan.user.dto.MessageDTO;
import com.doan.user.entity.MaintenanceCard;
import com.doan.user.entity.Message;
import com.doan.user.entity.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.doan.user.repository.MessageRepository;
import com.doan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageConsumer {

    private final ObjectMapper json;
    private final SimpMessagingTemplate template;
    private final MessageConverter messageConverter;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private static final String MC = "Phiếu sửa chữa ";

    @KafkaListener(topics = {"dk3w4sws-message"}, groupId = "repair-manager")
    @Transactional
    public void consume(@Payload String message, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) {
        try {
            var messageModel = new ObjectMapper().readValue(message, MessageModel.class);
            var aaa = new ObjectMapper().readValue(messageModel.getMaintenanceCard(),
                MaintenanceCard.class);
            if (messageModel.getType() == 2) {
                List<User> users = userRepository.getAllManager();
                if (users.isEmpty()) return;
                users.forEach(user -> {
                    if (!user.getEmail().equals(messageModel.getAuthor())) {
                        String title = MC + messageModel.getMaintenanceCardCode().toUpperCase() + " đang chờ thanh toán";
                        String content = MC + messageModel.getMaintenanceCardCode().toUpperCase() + " đã hoàn thành sửa chữa và đang chờ thanh toán";
                        MessageTmp newMessage = setMessage(key, user, title, content,
                            aaa);
                        sendToClient(newMessage);
                    }
                });
            } else if (messageModel.getType() == 1
                && StringUtils.isNotBlank(messageModel.getRepairmanEmail())
                && !messageModel.getRepairmanEmail().equals(messageModel.getAuthor())) {
                User user = userRepository.checkExistEmail(messageModel.getRepairmanEmail());
                if (ObjectUtils.isEmpty(user)) return;
                String title = MC + messageModel.getMaintenanceCardCode().toUpperCase() + " đã được tạo mới";
                String content = MC + messageModel.getMaintenanceCardCode().toUpperCase() + " đã được tạo mới. Hãy bắt đầu tiến hành sửa chữa";
                MessageTmp newMessage = setMessage(key, user, title, content, aaa);
                sendToClient(newMessage);
            } else if (messageModel.getType() == 3) {
                User coordinator = userRepository.checkExistEmail(messageModel.getCoordinatorEmail());
                if (ObjectUtils.isEmpty(coordinator)) return;
                String title = MC + messageModel.getMaintenanceCardCode().toUpperCase() + " vừa được cập nhật";
                String content = MC + messageModel.getMaintenanceCardCode().toUpperCase() + " vừa được cập nhật";
                MessageTmp newMessage = setMessage(key, coordinator, title, content, aaa);
                sendToClient(newMessage);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void sendToClient(MessageTmp message) {
        try {
            MessageDTO messageDTO = messageConverter.convertToDTO(message);
            template.convertAndSend("/topic/message", json.writeValueAsString(messageDTO));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    private MessageTmp setMessage(String key, User user, String title, String content,
        MaintenanceCard maintenanceCard) {
        var newMessage = new Message();
        var newMessageTmp = new MessageTmp();
        newMessage.setStatus((byte) 1);
        newMessage.setUrl("/maintenance-card/detail/" + key);
        newMessage.setTitle(title);
        newMessage.setContent(content);
        newMessage.setUser(user);
        newMessage.setUnRead((byte) 1);
        newMessage.setCreatedDate(new Date());
        newMessage.setModifiedDate(new Date());
        messageRepository.save(newMessage);
        newMessageTmp.setMaintenanceCard(messageConverter.getMaintenanceCardsModel(maintenanceCard));
        convertToMessageTmp(newMessage, newMessageTmp);
        return newMessageTmp;
    }

    private void convertToMessageTmp(Message message, MessageTmp messageTmp) {
        messageTmp.setStatus(message.getStatus());
        messageTmp.setUrl(message.getUrl());
        messageTmp.setTitle(message.getTitle());
        messageTmp.setContent(message.getContent());
        messageTmp.setUser(message.getUser());
        messageTmp.setUnRead(message.getUnRead());
        messageTmp.setCreatedDate(message.getCreatedDate());
        messageTmp.setModifiedDate(message.getModifiedDate());
    }

}
