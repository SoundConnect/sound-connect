package com.soundconnect.soundconnect.model;

import jakarta.persistence.*;

@Entity
@Table(name = "albums")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 250)
    private String name;

    @Column(nullable = false, length = 1000)
    private String albumArt;

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

    public Album() {
    }

    public Album(String name, String albumArt) {
        this.name = name;
        this.albumArt = albumArt;
    }
}
