package com.soundconnect.soundconnect.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tracks")
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 250)
    private String name;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "album_id", nullable = false)
    private Album album;


    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "track_artist",
            joinColumns = @JoinColumn(name = "track_id"),
            inverseJoinColumns = @JoinColumn(name = "artist_id")
    )
    private Set<Artist> artists;

    @Column(nullable = false, length = 250)
    private String duration;

    @Column(nullable = false, length = 2500)
    private String spotifyId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Set<Artist> getArtists() {
        return artists;
    }

    public void setArtists(Set<Artist> artists) {
        this.artists = artists;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getSpotifyId() {
        return spotifyId;
    }

    public void setSpotifyId(String spotifyId) {
        this.spotifyId = spotifyId;
    }

    public Track() {}
    public Track(String name, String spotifyId, String duration) {
        this.name = name;
        this.spotifyId = spotifyId;
        this.duration = duration;
    }

    public Track(String name, Album album, Set<Artist> artists, String duration, String spotifyId) {
        this.name = name;
        this.album = album;
        this.artists = artists;
        this.duration = duration;
        this.spotifyId = spotifyId;
    }
}
