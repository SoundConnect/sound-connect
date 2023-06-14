package com.soundconnect.soundconnect.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "genres")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 250)
    private String genre;

    @ManyToMany(mappedBy = "genres")
    private List<Artist> artists;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public List<Artist> getArtists() {
        return artists;
    }

    public void setArtists(List<Artist> artists) {
        this.artists = artists;
    }

    public Genre() {
    }

    public Genre(long id, String genre, List<Artist> artists) {
        this.id = id;
        this.genre = genre;
        this.artists = artists;
    }

    public Genre(String genre, List<Artist> artists) {
        this.genre = genre;
        this.artists = artists;
    }
}
