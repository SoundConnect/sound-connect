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

                Album album = track.getAlbum();
                Album filteredAlbum = new Album();
                if (albumsDao.existsBySpotifyId(album.getSpotifyId())){
                    filteredAlbum = albumsDao.findBySpotifyId(album.getSpotifyId());
                } else {
                    filteredAlbum = album;
                    albumsDao.save(filteredAlbum);
                }
                track.setAlbum(filteredAlbum);

                for (Artist artist : artists) {
                    if (artistsDao.existsBySpotifyId(artist.getSpotifyId())) {
                        artist = artistsDao.findBySpotifyId(artist.getSpotifyId());
                        filteredArtists.add(artist);
                    } else {
                        filteredArtists.add(artist);
                        artistsDao.save(artist);
                    }
                }
                Artist firstArtist = filteredArtists.iterator().next();
                track.getAlbum().setArtist(firstArtist);
                track.setArtists(filteredArtists);

                Track filteredTrack = new Track();
                if (tracksDao.existsBySpotifyId(track.getSpotifyId())){
                    filteredTrack = tracksDao.findBySpotifyId(track.getSpotifyId());
                } else {
                    filteredTrack = track;
                    tracksDao.save(filteredTrack);
                }
                filteredTracks.add(filteredTrack);
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

