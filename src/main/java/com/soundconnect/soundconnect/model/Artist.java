package com.soundconnect.soundconnect.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;


@Entity
@Table(name = "artists")
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, length = 250, unique = true)
    private String name;
    @Column(nullable = false)
    private String spotifyId;
    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "artist")
    private List<Album> albums;
    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "artist_genre",
            joinColumns = @JoinColumn(name = "artist_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres;
    @ManyToMany(mappedBy = "artists")
    private Set<Track> tracks;


    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public List<Album> getAlbums() {
        return albums;
    }
    public void setAlbums(List<Album> albums) {
        this.albums = albums;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Set<Genre> getGenres() {
        return genres;
    }
    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }
    public Set<Track> getTracks() {
        return tracks;
    }
    public void setTracks(Set<Track> tracks) {
        this.tracks = tracks;
    }
    public String getSpotifyId() {
        return spotifyId;
    }
    public void setSpotifyId(String spotifyId) {
        this.spotifyId = spotifyId;
    }

    public Artist() {}
    public Artist(String name) {
        this.name = name;
    }

    public Artist(String name, String spotifyId) {
        this.name = name;
        this.spotifyId = spotifyId;
    }
}
