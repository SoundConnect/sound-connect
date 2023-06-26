package com.soundconnect.soundconnect.controller;

import com.soundconnect.soundconnect.model.Chat;
import com.soundconnect.soundconnect.model.Message;
import com.soundconnect.soundconnect.model.User;
import com.soundconnect.soundconnect.repositories.ChatRepository;
import com.soundconnect.soundconnect.repositories.MessagesRepository;
import com.soundconnect.soundconnect.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class UserController {
    private final UserRepository userDao;
    private final ChatRepository chatDao;
    private final MessagesRepository messageDao;
    private final PasswordEncoder passwordEncoder;
  
    public UserController(PasswordEncoder passwordEncoder, UserRepository userDao, ChatRepository chatDao, MessagesRepository messageDao) {
        this.userDao = userDao;
        this.chatDao = chatDao;
        this.messageDao = messageDao;
        this.passwordEncoder = passwordEncoder;

    }


//     login a user
    @PostMapping("/login")
    public String login(@RequestParam(name = "username") String username,
                        @RequestParam(name = "password") String password) {
        User user = userDao.findByUsername(username);
        if (user == null) {
            return "redirect:/login";
        } else if (!password.equals(user.getPassword())) {
            return "redirect:/profile";
        } else {
            return "redirect:/register";
        }
    }

    // show registration form  (Updated by RH)
    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    // register a user
    @PostMapping("/register")
    public String register(@RequestParam(name = "username") String username,
                           @RequestParam(name = "email") String email,
                           @RequestParam(name = "password") String password,
                           @RequestParam(name = "confirmPassword") String confirmPassword,
                           @RequestParam(name="image-url") String imageUrl) {
        if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return "redirect:/register";
        } else if (!password.equals(confirmPassword)) {
            return "redirect:/register";
        } else if (userDao.findByUsername(username) != null){ // check if user already exists
            return "redirect:/register";
        } else if (imageUrl == null || imageUrl.isEmpty()) {
            return "redirect:/register";
        } else {
             String hash = passwordEncoder.encode(password); //add password encoder RH
            userDao.save(new User(username, email, hash, imageUrl));
            return "redirect:/profile";
        }
    }

    // show profile page
    @GetMapping("/profile")
    public String showProfile(Model model) {
        List<Chat> chats = chatDao.findAll();
        model.addAttribute("chats", chats);
        User users = userDao.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        model.addAttribute("users", users);
        return "profile";
    }
    @GetMapping("/profile/messages/{chatId}")
    @ResponseBody
    public List<Message> showMessages(@PathVariable long chatId, Model model) {
        Chat chat = chatDao.findById(chatId);
        List<Message> messages = chat.getMessages();
        model.addAttribute("messages", messages);
        return messages;
    }



    // edit profile
//    @PostMapping("/profile")
//    public String changeProfile(@RequestParam(name="email") String email,
//                                @RequestParam(name="password") String password,
//                                @RequestParam(name="confirmPassword") String confirmPassword,
//                                @RequestParam(name="username") String username,
//                                ) {
//        System.out.println("Post mapping hit");
//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        long userId = user.getId();
//        user = userDao.findById(userId);
//        System.out.println(imageUrl);
//        user.setProfilePic(imageUrl);
//
//        userDao.save(user);
//        return "redirect:/profile";
//    }

}
