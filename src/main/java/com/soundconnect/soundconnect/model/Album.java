package com.soundconnect.soundconnect.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "albums")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 250)
    private String name;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "artist_id", nullable = true)
    private Artist artist;

    @Column(name = "album_art", nullable = false, length = 2500)
    private String albumArt;

    @OneToMany(cascade = CascadeType.PERSIST ,mappedBy = "album")
    private List<Track> tracks;



    public Artist getArtist() {
        return artist;
    }
    public void setArtist(Artist artist) {
        this.artist = artist;
    }
    public List<Track> getTracks() {
        return tracks;
    }
    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
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
    public String getAlbumArt() {
        return albumArt;
    }
    public void setAlbumArt(String albumArt) {
        this.albumArt = albumArt;
    }


    public Album() {}
    public Album(String name, String albumArt) {
        this.name = name;
        this.albumArt = albumArt;
    }
//    public Album(String name, String albumArt, Artist artist) {
//        this.name = name;
//        this.albumArt = albumArt;
//        this.artist = artist;
//    }
}
