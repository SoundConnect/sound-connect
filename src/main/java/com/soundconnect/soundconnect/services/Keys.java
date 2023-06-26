package com.soundconnect.soundconnect.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class Keys {
    @Value("${fileStack.key}")
    private String FILESTACK_KEY;

    @Value("@{firstSpotify.key}")
    private String FIRST_SPOTIFY_KEY;

    @Value("@{secondSpotify.key}")
    private String SECOND_SPOTIFY_KEY;

    public String getFILESTACK_KEY() {
        return FILESTACK_KEY;
    }

    public String getFIRST_SPOTIFY_KEY() {
        return FIRST_SPOTIFY_KEY;
    }

    public String getSECOND_SPOTIFY_KEY() {
        return SECOND_SPOTIFY_KEY;
    }

    public void setFILESTACK_KEY(String FILESTACK_KEY) {
        this.FILESTACK_KEY = FILESTACK_KEY;
    }

    public void setFIRST_SPOTIFY_KEY(String FIRST_SPOTIFY_KEY) {
        this.FIRST_SPOTIFY_KEY = FIRST_SPOTIFY_KEY;
    }

    public void setSECOND_SPOTIFY_KEY(String SECOND_SPOTIFY_KEY) {
        this.SECOND_SPOTIFY_KEY = SECOND_SPOTIFY_KEY;
    }
}
