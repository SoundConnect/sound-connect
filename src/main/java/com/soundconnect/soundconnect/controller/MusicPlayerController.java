package com.soundconnect.soundconnect.controller;

import com.soundconnect.soundconnect.service.MusicPlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/music-player")
public class MusicPlayerController {

    private final MusicPlayerService musicPlayerService;

    public MusicPlayerController(MusicPlayerService musicPlayerService) {
        this.musicPlayerService = musicPlayerService;
    }

    @GetMapping("/play/{trackId}")
    public ResponseEntity<String> playTrack(@PathVariable Long trackId) {
        String response = musicPlayerService.playTrack(trackId);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/pause")
    public ResponseEntity<String> pauseTrack() {
        String response = musicPlayerService.pauseTrack();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/next")
    public ResponseEntity<String> nextTrack() {
        String response = musicPlayerService.nextTrack();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/previous")
    public ResponseEntity<String> previousTrack() {
        String response = musicPlayerService.previousTrack();
        return ResponseEntity.ok(response);
    }

//    @GetMapping("/stop")
//    public ResponseEntity<String> stopTrack() {
//        String response = musicPlayerService.stopTrack();
//        return ResponseEntity.ok(response);
//    }
//
//    @GetMapping("/volume/{volume}")
//    public ResponseEntity<String> setVolume(@PathVariable Integer volume) {
//        String response = musicPlayerService.setVolume(volume);
//        return ResponseEntity.ok(response);
//    }
//
//    @GetMapping("/volume/up")
//    public ResponseEntity<String> volumeUp() {
//        String response = musicPlayerService.volumeUp();
//        return ResponseEntity.ok(response);
//    }
//
//    @GetMapping("/volume/down")
//
//
//    public ResponseEntity<String> volumeDown() {
//        String response = musicPlayerService.volumeDown();
//        return ResponseEntity.ok(response);
//    }
//
//    @GetMapping("/volume/mute")
//    public ResponseEntity<String> muteVolume() {
//        String response = musicPlayerService.muteVolume();
//        return ResponseEntity.ok(response);
//    }
//
//    @GetMapping("/volume/unmute")
//    public ResponseEntity<String> unmuteVolume() {
//        String response = musicPlayerService.unmuteVolume();
//        return ResponseEntity.ok(response);
//    }
//
//    @GetMapping("/volume/mute/toggle")
//    public ResponseEntity<String> toggleMuteVolume() {
//        String response = musicPlayerService.toggleMuteVolume();
//        return ResponseEntity.ok(response);
//    }
}

