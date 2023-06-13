package com.soundconnect.soundconnect.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tracks")
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 100, unique = false)
    private String name;

    @Column(nullable = false)
    private String spotifyId;

    @Column(nullable = false)
    private long duration;

    @ManyToOne
    @JoinColumn(name = "playlist_id")
    private Playlist playlist;

    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getSpotifyId() {
        return spotifyId;
    }

    public void setSpotifyId(String spotifyId) {
        this.spotifyId = spotifyId;
    }

    public Track() {}
    public Track(String name, String spotifyId, long duration){
            this.name = name;
            this.spotifyId = spotifyId;
            this.duration = duration;
    }
    public Track(Playlist playlist) {
        this.playlist = playlist;
    }

    public Track(String name, String spotifyId, long duration, Playlist playlist, Album album) {
        this.name = name;
        this.spotifyId = spotifyId;
        this.duration = duration;
        this.playlist = playlist;
        this.album = album;
    }
}
