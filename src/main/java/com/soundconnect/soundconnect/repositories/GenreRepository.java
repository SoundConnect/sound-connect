package com.soundconnect.soundconnect.repositories;

import com.soundconnect.soundconnect.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {

    Genre findById(long id);
}
