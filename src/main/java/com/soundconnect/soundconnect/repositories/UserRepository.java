package com.soundconnect.soundconnect.repositories;

import com.soundconnect.soundconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findById(long id);

    User findByUsername(String username);

    User findByEmail(String email);



}
