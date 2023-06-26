package com.soundconnect.soundconnect.controller;

import com.soundconnect.soundconnect.services.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KeyController {

    @Autowired
    private Keys keys;

    @GetMapping(value="/keys.js", produces = "application/javascript")
    public String getKeys() {
        return String.format("""
                const FILESTACK_KEY = "%s";
                const FIRST_SPOTIFY_KEY = "%s";
                const SECOND_SPOTIFY_KEY = "%s";
        """, keys.getFILESTACK_KEY(), keys.getFIRST_SPOTIFY_KEY(), keys.getSECOND_SPOTIFY_KEY());
    }
}
