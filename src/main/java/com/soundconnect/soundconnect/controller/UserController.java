package com.soundconnect.soundconnect.controller;

import com.soundconnect.soundconnect.model.Chat;
import com.soundconnect.soundconnect.model.Message;
import com.soundconnect.soundconnect.model.User;
import com.soundconnect.soundconnect.repositories.ChatRepository;
import com.soundconnect.soundconnect.repositories.MessagesRepository;
import com.soundconnect.soundconnect.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class UserController {
    public final UserRepository userDao;
    private final ChatRepository chatDao;
    private final MessagesRepository messageDao;
    public UserController(UserRepository userDao, ChatRepository chatDao, MessagesRepository messageDao) {
        this.userDao = userDao;
        this.chatDao = chatDao;
        this.messageDao = messageDao;
    }

  
    // show login form
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    // login a user
    @PostMapping("/login")
    public String login(@RequestParam(name = "username") String username,
                        @RequestParam(name = "password") String password) {
        User user = userDao.findByUsername(username);
        if (user == null) {
            return "redirect:/login";
        } else if (!password.equals(user.getPassword())) {
            return "redirect:/login";
        } else {
            return "redirect:/profile";
        }
    }

    // show registration form
    @GetMapping("/register")
    public String showRegisterForm() {
        return "register";
    }

    // register a user
    @PostMapping("/register")
    public String register(@RequestParam(name = "username") String username,
                           @RequestParam(name = "email") String email,
                           @RequestParam(name = "password") String password,
                           @RequestParam(name = "confirmPassword") String confirmPassword) {
        if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return "redirect:/register";
        } else if (!password.equals(confirmPassword)) {
            return "redirect:/register";
        } else if (userDao.findByUsername(username) != null){ // check if user already exists
            return "redirect:/register";
        } else {
            // password = passwordEncoder.encode(password);
            userDao.save(new User(username, email, password));
            return "redirect:/profile";
        }
    }

    // show profile page
    @GetMapping("/profile")
    public String showProfile(Model model) {
        List<Chat> chats = chatDao.findAll();
        model.addAttribute("chats", chats);
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
    @PostMapping("/profile/edit")
    public String changeProfile(@RequestParam(name="email") String email,
                                @RequestParam(name="password") String password,
                                @RequestParam(name="confirmPassword") String confirmPassword,
                                @RequestParam(name="username") String username) {
        System.out.println("Post mapping hit");
//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        long userId = user.getId();
//        user = userDao.findUserById(userId);
//        if(!password.equals(confirmPassword)) {
//            return "redirect:/profile/edit";
//        }
//        user.setEmail(email);
//        user.setPassword(password);
//        user.setUsername(username);
//        userDao.save(user);
        return "redirect:/profile";
    }
}
