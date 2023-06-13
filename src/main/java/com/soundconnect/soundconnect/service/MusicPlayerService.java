//package com.soundconnect.soundconnect.service;
//
//import com.soundconnect.soundconnect.model.Track;
//import com.soundconnect.soundconnect.repositories.TrackRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class MusicPlayerService {
//
//    private final TrackRepository trackRepository;
//    private Optional<Track> currentTrack;
//    private List<Track> playlist;
//    private int currentIndex;
//    public MusicPlayerService(TrackRepository trackRepository, Optional<Track> currentTrack, List<Track> playlist) {
//        this.trackRepository = trackRepository;
//        this.currentTrack = currentTrack;
//        this.playlist = playlist;
//    }
//
//    public TrackRepository getTrackRepository() {
//        return trackRepository;
//    }
//
//    public Optional<Track> getCurrentTrack() {
//        return currentTrack;
//    }
//
//    public void setCurrentTrack(Optional<Track> currentTrack) {
//        this.currentTrack = currentTrack;
//    }
//
//    public List<Track> getPlaylist() {
//        return playlist;
//    }
//
//    public void setPlaylist(List<Track> playlist) {
//        this.playlist = playlist;
//    }
//
//    public int getCurrentIndex() {
//        return currentIndex;
//    }
//
//    public void setCurrentIndex(int currentIndex) {
//        this.currentIndex = currentIndex;
//    }
//}
//
