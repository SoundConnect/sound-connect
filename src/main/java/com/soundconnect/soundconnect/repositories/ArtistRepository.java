package com.soundconnect.soundconnect.repositories;

import com.soundconnect.soundconnect.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    Artist findById(long id);
    Artist findByName(String name);
    boolean existsBySpotifyId(String spotifyId);
    Artist findBySpotifyId(String spotifyId);
}
