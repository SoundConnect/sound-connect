package com.soundconnect.soundconnect.controller;

import com.soundconnect.soundconnect.model.Playlist;
import com.soundconnect.soundconnect.model.Track;
import com.soundconnect.soundconnect.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;

@RestController
public class EditController {
    private final PlaylistRepository playlistsDao;
    private final TrackRepository tracksDao;
    private final AlbumRepository albumsDao;
    private final ArtistRepository artistsDao;
    private final GenreRepository genresDao;
    private final UserRepository usersDao;

    @Autowired
    public EditController(PlaylistRepository playlistsDao, TrackRepository tracksDao, AlbumRepository albumsDao, ArtistRepository artistsDao, GenreRepository genresDao, UserRepository usersDao) {
        this.playlistsDao = playlistsDao;
        this.tracksDao = tracksDao;
        this.albumsDao = albumsDao;
        this.artistsDao = artistsDao;
        this.genresDao = genresDao;
        this.usersDao = usersDao;
    }

    // delete track from playlist
    @PutMapping("/feed/{id}/edit")
    public ResponseEntity<?> editPlaylist(@PathVariable long id, @RequestBody Map<String, String> requestBody){
        long trackId = Long.parseLong(requestBody.get("trackId"));
        Playlist playlist = playlistsDao.findById(id);
        Set<Track> tracks = playlist.getTracks();
        Track track = tracksDao.findById(trackId);
        tracks.remove(track);
        playlistsDao.save(playlist);
        return ResponseEntity.ok().build();
    }
}
