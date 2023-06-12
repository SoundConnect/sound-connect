package com.soundconnect.soundconnect.controller;


import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ProfileController {
    @GetMapping("/profile")
 public Profile getProfileData(){
     return new Profile("Post Malone", "beerbongs & bentleys", List.of("paranoid", "Spoil My Night", "Rich & Sad"));
 }
    public ProfileController() {
    }

}
//
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//
//@Controller
//public class ProfileController {
//@GetMapping("/profile")
//    public String profile() {
//        return "profile";
//    }
//}
//    public Profile getProfileData() {
//        // Fetch data from your repositories and return it.
//
//        // This is just an example, replace it with your actual data fetching logic.
//        return new Profile("Artist Name", "Album Name", List.of("Track1", "Track2", "Track3"));
