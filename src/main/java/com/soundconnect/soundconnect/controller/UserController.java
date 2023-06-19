package com.soundconnect.soundconnect.controller;

import com.soundconnect.soundconnect.model.User;
import com.soundconnect.soundconnect.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {
    private final UserRepository userDao;

    // added passwordEncoder RH
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
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
                           @RequestParam(name = "confirmPassword") String confirmPassword) {
        if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return "redirect:/register";
        } else if (!password.equals(confirmPassword)) {
            return "redirect:/register";
        } else if (userDao.findByUsername(username) != null){ // check if user already exists
            return "redirect:/register";
        } else {
             String hash = passwordEncoder.encode(password); //add password encoder RH
            userDao.save(new User(username, email, hash));
            return "redirect:/profile";
        }
    }

    // show profile page
    @GetMapping("/profile")
    public String showProfile(){
        return "profile";
    }

    // edit profile
    @PostMapping("/profile/edit")
    public String changeProfile(@RequestParam(name="email") String email,
                                @RequestParam(name="password") String password,
                                @RequestParam(name="confirmPassword") String confirmPassword,
                                @RequestParam(name="username") String username) {
        System.out.println("Post mapping hit");
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long userId = user.getId();
        user = userDao.findById(userId);
        if(!password.equals(confirmPassword)) {
            return "redirect:/profile/edit";
        }
        user.setEmail(email);
        user.setPassword(password);
        user.setUsername(username);
        userDao.save(user);
        return "redirect:/profile";
    }
}
