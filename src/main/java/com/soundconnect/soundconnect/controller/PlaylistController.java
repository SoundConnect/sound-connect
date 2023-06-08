package com.soundconnect.soundconnect.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class PlaylistController {

    // show form for creating a playlist
    @GetMapping("/create")
    public String showCreatePlaylistForm(){
        return "create";
    }

    // get form data and create playlist
    @PostMapping("create")
    public String createPlaylist(){
        return "redirect:/profile";
    }

    // show feed for all shared playlists
    @GetMapping("/feed")
    public String showFeed(){
        return "feed";
    }
}
