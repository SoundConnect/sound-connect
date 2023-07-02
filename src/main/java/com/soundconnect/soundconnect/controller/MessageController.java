package com.soundconnect.soundconnect.controller;

import com.soundconnect.soundconnect.model.Chat;
import com.soundconnect.soundconnect.model.Message;
import com.soundconnect.soundconnect.model.MessageRequest;
import com.soundconnect.soundconnect.repositories.ChatRepository;
import com.soundconnect.soundconnect.repositories.MessagesRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Controller
public class MessageController {

    private final RabbitTemplate rabbitTemplate;
    private final MessagesRepository messageDao;
    private final ChatRepository chatDao;
    @Autowired
    public MessageController(RabbitTemplate rabbitTemplate, MessagesRepository messageDao, ChatRepository chatDao) {
        this.messageDao = messageDao;
        this.chatDao = chatDao;
        this.rabbitTemplate = rabbitTemplate;
    }

    @PostMapping("/profile/{id}")
    public String sendMessage(@RequestBody MessageRequest messageRequest, @PathVariable Long id) {
        System.out.println("profile/id");

        Message message = new Message(messageRequest.getMessage(),messageRequest.getSender(), messageRequest.getRecipients().get(0));
        messageRequest.setSender(messageRequest.getSender());
        messageRequest.setMessage(messageRequest.getMessage());
        messageRequest.setRecipients(messageRequest.getRecipients());
        messageRequest.setChatId(messageRequest.getChatId());
        List<String> recipients = messageRequest.getRecipients();
        System.out.println(recipients);
        messageDao.save(message);

        for (String recipient : recipients) {
            rabbitTemplate.convertAndSend("", recipient, message.toString());
        }

        if(id == 0) {
            Chat chat = new Chat();
            chat.pushMessage(message);

            String name = messageRequest.getRecipients().get(0);

            chat.setChatName(name);

            chatDao.save(chat);

        }else {
            Optional<Chat> optionalChat = chatDao.findById(id);
            if (optionalChat.isPresent()) {
                Chat chat = optionalChat.get();
                chat.pushMessage(message);
                chatDao.save(chat);
            }
        }
            return "redirect:/profile";
    }

    @RabbitListener(queues = "myQueue")
    public void receiveMessage(String message) {
        // Process the received message
        System.out.println("Received message: " + message);
    }
}
