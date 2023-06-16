package com.soundconnect.soundconnect.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;


@Entity
@Table(name = "genres")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 250, unique = true)
    private String name;

    @ManyToMany(mappedBy = "genres")
    private Set<Artist> artists;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGenre() {
        return name;
    }

    public void setGenre(String name) {
        this.name = name;
    }

    public Set<Artist> getArtists() {
        return artists;
    }

    public void setArtists(Set<Artist> artists) {
        this.artists = artists;
    }

    public Genre() {
    }


}
