package com.soundconnect.soundconnect.repositories;

import com.soundconnect.soundconnect.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    Playlist findById(long id);

    Playlist findByTitle(String title);

    Playlist findByDescription(String description);

    Playlist findByGenre(String genre);

    Playlist findByTracks(String tracks);

    Playlist findByUser(long user_id);
}
