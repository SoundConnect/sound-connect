package com.soundconnect.soundconnect.controller;

import com.soundconnect.soundconnect.model.Playlist;
import com.soundconnect.soundconnect.repositories.PlaylistRepository;
import com.soundconnect.soundconnect.repositories.TrackRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class PlaylistController {

    private final PlaylistRepository playlistsDao;
    private final TrackRepository tracksDao;

    public PlaylistController(PlaylistRepository playlistsDao, TrackRepository tracksDao) {
        this.playlistsDao = playlistsDao;
        this.tracksDao = tracksDao;
    }

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
    public String showFeed(Model model){
        List<Playlist> playlists = playlistsDao.findAll();
        model.addAttribute("playlists", playlists);
        return "feed";
    }
}
