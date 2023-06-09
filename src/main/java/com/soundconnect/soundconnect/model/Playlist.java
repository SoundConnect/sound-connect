package com.soundconnect.soundconnect.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

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

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToMany(mappedBy = "playlists")
    private Set<User> users;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "playlist_track",
            joinColumns = @JoinColumn(name = "playlist_id"),
            inverseJoinColumns = @JoinColumn(name = "track_id")
    )
    private Set<Track> tracks;

//    ============== Getters and Setters ==============
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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Track> getTracks() {
        return tracks;
    }

    public void setTracks(Set<Track> tracks) {
        this.tracks = tracks;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    //    ============== Constructors ==============
    public Playlist() {}

    public Playlist(String name, String description) {
        this.name = name;
        this.description = description;
    }
    public Playlist(long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Playlist(String name, String description, Set<Track> tracks) {
        this.name = name;
        this.description = description;
        this.tracks = tracks;
    }

//   ============== Methods ==================
    public Set<Track> addTracks(Set<Track> filteredTracks) {
        Set<Track> allTracks = new HashSet<>();
        allTracks.addAll(filteredTracks);
        allTracks.addAll(this.tracks);
        return allTracks;
    }
}
