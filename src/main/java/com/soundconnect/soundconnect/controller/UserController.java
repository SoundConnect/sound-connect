package com.soundconnect.soundconnect.controller;

//import com.soundconnect.soundconnect.model.Chat;
//import com.soundconnect.soundconnect.model.Message;
import com.soundconnect.soundconnect.model.Playlist;
import com.soundconnect.soundconnect.model.User;
//import com.soundconnect.soundconnect.repositories.ChatRepository;
//import com.soundconnect.soundconnect.repositories.MessagesRepository;
import com.soundconnect.soundconnect.repositories.PlaylistRepository;
import com.soundconnect.soundconnect.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class UserController {
    private final UserRepository userDao;
//    private final ChatRepository chatDao;
//    private final MessagesRepository messageDao;
    private final PasswordEncoder passwordEncoder;
    private final PlaylistRepository playlistDao;
  

    public UserController(UserRepository userDao, PasswordEncoder passwordEncoder, PlaylistRepository playlistDao) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.playlistDao = playlistDao;
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
        System.out.println("Inside register");
        System.out.printf("username: %s%nemail: %s%npassword: %s%nconfirmPassword: %s%nimageUrl: %s%n", username, email, password, confirmPassword, imageUrl);

        // TODO:
        // IMPORTANT
        // Change when we have a way to upload images
        imageUrl = "dummyurl.hello";

        if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return "redirect:/register";
        } else if (!password.equals(confirmPassword)) {
            return "redirect:/register";
        } else if (userDao.existsByUsername(username)){ // check if user already exists
            return "redirect:/register";
        } else if (imageUrl.equals("")) {
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
//        List<Chat> chats = chatDao.findAll();
//        model.addAttribute("chats", chats);

        // Getting user info from security context
        User user = userDao.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        model.addAttribute("user", user);

//      Displaying user's playlists on their profile
        // find user by id with security
//        List<Playlist> userPlaylists = playlistDao.findAllByUser(users);
//        model.addAttribute("userPlaylists", userPlaylists);

        return "profile";
    }
//    @GetMapping("/profile/newchat")
//    @ResponseBody
//    public ResponseEntity<List<Chat>> showNewChat(Model model) {
//        List<Chat> chats = chatDao.findAll();
//        model.addAttribute("chats", chats);
//        model.addAttribute("user", userDao.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));
//        return ResponseEntity.ok(chats);
//    }
//    @GetMapping("/profile/messages/{chatId}")
//    @ResponseBody
//    public List<Message> showMessages(@PathVariable long chatId, Model model) {
//        Chat chat = chatDao.findById(chatId);
//        System.out.println(chat);
//        List<Message> messages = chat.getMessages();
//        model.addAttribute("messages", messages);
//        return messages;
//    }
//    @GetMapping("/profile/chat/{chatId}")
//    @ResponseBody
//    public Chat showParticipants(@PathVariable long chatId, Model model) {
//        Chat chat = chatDao.findById(chatId);
//        System.out.println(chat);
//        model.addAttribute("chat", chat);
//        return chat;
//    }

    // show profile page for other users
    @GetMapping("/profile/{username}")
    public String showOtherProfile(@PathVariable String username, Model model) {
        User user = userDao.findByUsername(username);
        model.addAttribute("user", user);
        return "profile";
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
