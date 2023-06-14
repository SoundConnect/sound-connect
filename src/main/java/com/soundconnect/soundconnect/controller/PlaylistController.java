package com.soundconnect.soundconnect.controller;

import com.soundconnect.soundconnect.model.*;

import com.soundconnect.soundconnect.repositories.AlbumRepository;
import com.soundconnect.soundconnect.repositories.ArtistRepository;
import com.soundconnect.soundconnect.repositories.PlaylistRepository;
import com.soundconnect.soundconnect.repositories.TrackRepository;
import com.soundconnect.soundconnect.repositories.UserRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class PlaylistController {

    private final PlaylistRepository playlistsDao;
    private final TrackRepository tracksDao;

    private final AlbumRepository albumsDao;
    private final ArtistRepository artistsDao;
    private final UserRepository usersDao;

    public PlaylistController(PlaylistRepository playlistsDao, TrackRepository tracksDao, AlbumRepository albumsDao, ArtistRepository artistsDao, UserRepository usersDao) {
        this.playlistsDao = playlistsDao;
        this.tracksDao = tracksDao;
        this.albumsDao = albumsDao;
        this.artistsDao = artistsDao;
        this.usersDao = usersDao;
    }

    // show form for creating a playlist
    @GetMapping("/create")
    public String showCreatePlaylistForm() {
        return "createPlaylist";
    }

    // get form data and create playlist
    @PostMapping("/create")
    public String createPlaylist(@RequestBody Playlist playlist){
       Playlist savePlaylist = new Playlist(playlist.getName(), playlist.getDescription());
       playlistsDao.save(savePlaylist);
            // save all tracks, albums, and artists to database
            for (Track track : playlist.getTracks()) {
                Track saveTrack = new Track(track.getName(), track.getSpotifyId(), track.getDuration());
                tracksDao.save(saveTrack);

                Artist saveArtist;
                if (artistsDao.findByName(track.getAlbum().getArtist().getName()) != null) {
                    saveArtist = artistsDao.findByName(track.getAlbum().getArtist().getName());
                } else {
                    saveArtist = new Artist(track.getAlbum().getArtist().getName());
                    artistsDao.save(saveArtist);
                }

                Album saveAlbum;
                if (albumsDao.findByName(track.getAlbum().getName()) != null) {
                    saveAlbum = albumsDao.findByName(track.getAlbum().getName());
                } else {
                    saveAlbum = new Album(track.getAlbum().getName(), track.getAlbum().getAlbumArt());
                    saveAlbum.setArtist(saveArtist);
                    albumsDao.save(saveAlbum);
                }

                saveTrack.setAlbum(saveAlbum);
                saveTrack.setPlaylist(savePlaylist);
                tracksDao.save(saveTrack);
            }

            return "redirect:/profile";
        }
    }

    // show form for editing a playlist
    @GetMapping("/feed/{id}/edit")
    public String showEditPlaylistForm(@PathVariable long id, Model model){
        Playlist playlist = playlistsDao.findById(id);
        model.addAttribute("playlist", playlist);
        return "editPlaylist";
    }

    // edit playlist
    @PostMapping("/feed/{id}/edit")
    public String editPlaylist(@PathVariable long id, @RequestBody Playlist playlist){
        return "redirect:/profile";
    }



        // edit playlist
        @PostMapping("/edit/{id}")
        public String editPlaylist () {
            return "redirect:/profile";
        }

//     show feed for all shared playlists
        @GetMapping("/feed")
        public String showFeed (Model model){
//        List<Playlist> playlists = playlistsDao.findAll();
//        model.addAttribute("playlists", playlists);
            return "feed";
        }

//     delete playlist from account
        @PostMapping("/feed")
        public String deletePlaylist () {

            return "redirect:/feed";
        }
    }

