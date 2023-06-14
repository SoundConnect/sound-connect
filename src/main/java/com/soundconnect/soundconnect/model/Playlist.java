package com.soundconnect.soundconnect.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "playlists")
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 250)
    private String name;

    @Column(nullable = false, length = 1500)
    private String description;

    @ManyToMany(mappedBy = "playlists")
    private List<User> users;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "playlist_track",
            joinColumns = @JoinColumn(name = "playlist_id"),
            inverseJoinColumns = @JoinColumn(name = "track_id")
    )
    private List<Track> tracks;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

    public Playlist() {
    }


//    ============== Constructors ==============



    public Playlist(String name, String description) {
        this.name = name;
        this.description = description;
    }



    public Playlist(String name, String description, List<Track> tracks) {
        this.name = name;
        this.description = description;
        this.tracks = tracks;
    }


    public Playlist(String name, String description, List<User> users, List<Track> tracks) {
        this.name = name;
        this.description = description;
        this.users = users;
        this.tracks = tracks;
    }

    public Playlist(long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
