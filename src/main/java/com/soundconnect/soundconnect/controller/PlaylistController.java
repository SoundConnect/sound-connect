package com.soundconnect.soundconnect.controller;

import com.soundconnect.soundconnect.model.*;
import java.util.HashSet;
import org.springframework.dao.DataIntegrityViolationException;
import com.soundconnect.soundconnect.repositories.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

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
    public String createPlaylist(@RequestBody Playlist playlist) {
        try {
            Set<Track> tracks = playlist.getTracks();
            Set<Track> filteredTracks = new HashSet<>();

            for (Track track : tracks) {
                Set<Artist> artists = track.getArtists();
                Set<Artist> filteredArtists = new HashSet<>();

                for (Artist artist : artists) {
                    System.out.println("Artist Before: " + artist.getName());
                    if (artistsDao.existsBySpotifyId(artist.getSpotifyId())) {
                        System.out.println("Spotify ID: " + artist.getSpotifyId());
                        artist = artistsDao.findBySpotifyId(artist.getSpotifyId());
                        filteredArtists.add(artist);
                    } else {
                        filteredArtists.add(artist);
                        artistsDao.save(artist);
                    }
                    System.out.println("Artist After: " + artist.getName());
                }
                track.setArtists(filteredArtists);
                filteredTracks.add(track);
            }
            playlist.setTracks(filteredTracks);
            playlistsDao.save(playlist);

        } catch (DataIntegrityViolationException e) {
            e.getCause().printStackTrace();
        }
        return "redirect:/profile";
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

//     show feed for all shared playlists
        @GetMapping("/feed")
        public String showFeed (Model model){
        List<Playlist> playlists = playlistsDao.findAll();
        model.addAttribute("playlists", playlists);
            return "feed";
        }

//     delete playlist from account
        @PostMapping("/feed")
        public String deletePlaylist () {

            return "redirect:/feed";
        }
    }

