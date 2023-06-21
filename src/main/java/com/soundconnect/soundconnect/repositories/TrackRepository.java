package com.soundconnect.soundconnect.repositories;

import com.soundconnect.soundconnect.model.Playlist;
import com.soundconnect.soundconnect.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track, Long> {
    Track findById(long id);
    Track findByName(String name);
    boolean existsBySpotifyId(String spotifyId);
    Track findBySpotifyId(String spotifyId);



}
