package com.soundconnect.soundconnect.repositories;

import com.soundconnect.soundconnect.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    Album findById(long id);
    Album findByName(String name);
    boolean existsBySpotifyId(String spotifyId);
    Album findBySpotifyId(String spotifyId);

}
