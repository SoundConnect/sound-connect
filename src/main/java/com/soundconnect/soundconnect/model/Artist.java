package com.soundconnect.soundconnect.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "artists")
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 250)
    private String name;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "artist")
    private List<Genre> genres;

    @ManyToOne
    @JoinColumn(name = "track_id")
    private Track track;

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public Track getTrack() {
        return track;
    }

    public void setTrack(Track track) {
        this.track = track;
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

    public Artist() {
    }


}
