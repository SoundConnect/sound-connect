package com.soundconnect.soundconnect.repositories;

import com.soundconnect.soundconnect.model.Playlist;
import com.soundconnect.soundconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    Playlist findById(long id);

    Playlist findByName(String name);

    Playlist findByDescription(String description);

    List<Playlist> findAllByOwner(User user);

}
