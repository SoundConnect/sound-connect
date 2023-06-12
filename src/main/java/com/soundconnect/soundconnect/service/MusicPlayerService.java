package com.soundconnect.soundconnect.service;

import com.soundconnect.soundconnect.model.Track;
import com.soundconnect.soundconnect.repositories.TrackRepository;
import org.springframework.stereotype.Service;


import java.io.IOException;

import java.util.List;
import java.util.Optional;

@Service
public class MusicPlayerService {

    private final TrackRepository trackRepository;
    private Optional<Track> currentTrack;
    private List<Track> playlist;
    private int currentIndex;
    private final SpotifyApi spotifyApi; // Instance of SpotifyApi
            public MusicPlayerService(TrackRepository trackRepository, List<Track> playlist, SpotifyApi spotifyApi) {
            this.currentTrack = Optional.empty();
            this.trackRepository = trackRepository;
            this.playlist = playlist;
            this.spotifyApi = spotifyApi;
        }
    public TrackRepository getTrackRepository() {
        return trackRepository;
    }

    public Optional<Track> getCurrentTrack() {
        return currentTrack;
    }

    public void setCurrentTrack(Optional<Track> currentTrack) {
        this.currentTrack = currentTrack;
    }

    public List<Track> getPlaylist() {
        return playlist;
    }

    public void setPlaylist(List<Track> playlist) {
        this.playlist = playlist;
    }

    public int getCurrentIndex() {
        return currentIndex;
    }

    public void setCurrentIndex(int currentIndex) {
        this.currentIndex = currentIndex;
    }

    public SpotifyApi getSpotifyApi() {
        return spotifyApi;
    }


    public String playTrack(Long trackId) {
        currentTrack = trackRepository.findById(trackId);
        if (currentTrack.isPresent()) {
            try {
                // Create a request to start/resume user's playback
                StartResumeUsersPlaybackRequest startResumeUsersPlaybackRequest = spotifyApi
                        .startResumeUsersPlayback()
                        .device_id("INSERT_DEVICE_ID") // Optional. You might need to replace it with a valid device id.
                        .context_uri("spotify:track:" + currentTrack.get().getSpotifyId()) // Replace with the track's Spotify ID
                        .build();

                // Execute the request
                startResumeUsersPlaybackRequest.execute();

                return "Playing track with id: " + trackId;
            } catch (IOException | SpotifyWebApiException | ParseException e) {
                e.printStackTrace();
                return "Error occurred while trying to play track with id: " + trackId;
            }
        } else {
            return "Track with id: " + trackId + " not found.";
        }


    }


    //    public MusicPlayerService(TrackRepository trackRepository, SpotifyApi spotifyApi) {
//        this.trackRepository = trackRepository;
//        this.currentTrack = Optional.empty();
//        this.spotifyApi = SpotifyApi;

//    public MusicPlayerService(TrackRepository trackRepository) {
//        this.trackRepository = trackRepository;
//        this.currentTrack = Optional.empty();
//    }
//
//    public String playTrack(Long trackId) {
//        currentTrack = trackRepository.findById(trackId);
//        if (currentTrack.isPresent()) {
//            // Here you'd integrate with a music service to play the track
//            spotifyApi.startResumeUsersPlayback() // Call Spotify API to play track on the user's active device
//                    .device_id(someDeviceId) // Device ID is optional
//                    .context_uri("spotify:track:" + currentTrack.get().getSpotifyId()) // Replace with the track's Spotify ID
//                    .build()
//                    .execute();
//            return "Playing track with id: " + trackId;
//        } else {
//            return "Track with id: " + trackId + " not found.";
//        }
//    }

    public String pauseTrack() {
        if (currentTrack.isPresent()) {
            // Here you'd integrate with a music service to pause the track
            spotifyApi.pauseUsersPlayback() // Call Spotify API to pause playback on the user's active device
                    .device_id(someDeviceId) // Device ID is optional
                    .build()
                    .execute();
            return "Paused track with id: " + currentTrack.get().getId();
        } else {
            return "No track currently playing.";
        }
    }

    public String nextTrack() {
        if (playlist != null && currentIndex < playlist.size() - 1) {
            currentIndex++;
            currentTrack = Optional.of(playlist.get(currentIndex));
            // Here you'd integrate with a music service to play the next track
            spotifyApi.skipUsersPlaybackToNextTrack() // Call Spotify API to skip to the next track
                    .device_id(someDeviceId) // Device ID is optional
                    .build()
                    .execute();
            return "Playing next track: " + currentTrack.get().getId();
        } else {
            return "This is the last track in the playlist.";
        }
    }

    public String previousTrack() {
        if (currentIndex > 0) {
            currentIndex--;
            currentTrack = Optional.of(playlist.get(currentIndex));
            // Here you'd integrate with a music service to play the previous track
            spotifyApi.skipUsersPlaybackToPreviousTrack() // Call Spotify API to skip to the previous track
                    .device_id(someDeviceId) // Device ID is optional
                    .build()
                    .execute();
            return "Playing previous track: " + currentTrack.get().getId();
        } else {
            return "This is the first track in the playlist.";
        }
        public void setPlaylist (List < Track > newPlaylist) {
            this.playlist = newPlaylist; // Sets the playlist to the list of tracks provided
            this.currentIndex = 0; // Resets the current index to 0, meaning the next track to be played is the first one in the playlist
            this.currentTrack = Optional.of(newPlaylist.get(0)); // Sets the current track to the first track in the playlist
        }
    }
    }
