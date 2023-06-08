package com.soundconnect.soundconnect.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

//    LOGIN MAPPING

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

//    REGISTER MAPPING
    @GetMapping("/register")
    public String showRegisterForm() {
        return "register";
    }

    @PostMapping("/register")
    public String register(@RequestParam(name = "username") String username,
                           @RequestParam(name = "email") String email,
                           @RequestParam(name = "password") String password,
                           @RequestParam(name = "confirmPassword") String confirmPassword) {
//        if (!password.equals(confirmPassword)) {
//            return "redirect:/register";
//        }
//        password = passwordEncoder.encode(password);
//        usersDao.save(new User(username, email, password));
        return "redirect:/profile";
    }

//    USER PROFILE MAPPING
    @GetMapping("/profile")
    public String showProfile(){
        return "profile";
    }

    @PostMapping("/profile")
    public String changeProfile(@RequestParam(name="email") String email) {
        System.out.println("Post mapping hit");
        return "redirect:/profile";
    }
}
