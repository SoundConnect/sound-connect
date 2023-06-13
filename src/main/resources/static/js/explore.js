import {getToken} from './main.js';


let token = await getToken();
let artistToken = await getToken();
let albumToken = await getToken();



export async function displayPlaylist() {
    try {
        const response = await fetch('https://api.spotify.com/v1/recommendations?limit=4&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=hip-hop%2Cr-n-b&seed_tracks=0c6xIDDpzE81m2q797ordA', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();

        const trackContainer = document.querySelector('.explore-playlist');
        const tracks = data.tracks;
        const ids = tracks.map(track => track.id);
        function createPlaylistIframe(trackId) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://open.spotify.com/embed/track/${trackId}`;
            iframe.width = '250';
            iframe.height = '80';
            iframe.frameborder = '0';
            iframe.allowtransparency = 'true';
            iframe.allow = 'encrypted-media';

            trackContainer.appendChild(iframe);
        }
        tracks.forEach((track, index) => {
            const trackId = ids[index];
            createPlaylistIframe(trackId);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

async function getArtists(artistToken) {
    try {
        const response = await fetch('https://api.spotify.com/v1/recommendations?limit=3&seed_artists=3TVXtAsR1Inumwj472S9r4&seed_genres=hip-hop%2Cclassical%2Ccountry&seed_tracks=59nOXPmaKlBfGMDeOVGrIK', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        const artistContainer = document.querySelector('.explore-artists');
        const artists = data.tracks;
        console.log(artists);
        const ids = []
        artists.forEach((artist) => {
            ids.push(artist.artists[0].id);
        })
        function createArtistIframe(artistId) {
            const iframe = document.createElement('iframe');
            iframe.style.borderRadius = '12px';
            iframe.src = `https://open.spotify.com/embed/artist/${artistId}`;
            iframe.width = '100%';
            iframe.height = '352';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = '';
            iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
            iframe.loading = 'lazy';

            artistContainer.appendChild(iframe);
        }
        artists.forEach((artist, index) => {
            const artistId = ids[index];
            createArtistIframe(artistId);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getAlbums(token) {
    try {
        const response = await fetch('https://api.spotify.com/v1/recommendations?limit=3&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=hiphop%2Cr%26b&seed_tracks=0c6xIDDpzE81m2q797ordA', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        const albumContainer = document.querySelector('.explore-albums');
        const albums = data.tracks;
        const ids = []
        albums.forEach((album) => {
            ids.push(album.album.id);
        })
        function createAlbumIframe(albumId) {
            const iframe = document.createElement('iframe');
            iframe.style.borderRadius = '12px';
            iframe.src = `https://open.spotify.com/embed/album/${albumId}`;
            iframe.width = '100%';
            iframe.height = '352';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = '';
            iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
            iframe.loading = 'lazy';

            albumContainer.appendChild(iframe);
        }

        albums.forEach((album, index   ) => {
            const albumId = ids[index];
            createAlbumIframe(albumId);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
const input = document.querySelector('.explore-search'); // Replace with the correct selector for your input element

input.addEventListener('keyup', async function(e) {
    let value = input.value;
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(value)}&type=track,album,artist&limit=3`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        console.log(data);
        const searchContainer = document.querySelector('.explore-search-results');
        const trackrow = document.createElement('div');
        trackrow.classList.add('row');
        trackrow.classList.add('search-tracks');
        const artistrow = document.createElement('div');
        artistrow.classList.add('row');
        artistrow.classList.add('search-artists');
        const albumrow = document.createElement('div');
        albumrow.classList.add('row');
        albumrow.classList.add('search-albums');

        const tracks = data.tracks.items;
        const artists = data.artists.items;
        const albums = data.albums.items;
        const ids = []
        tracks.forEach((track) => {
            ids.push(track.id);
        })
        function createTrackIframe(trackId) {
            const iframe = document.createElement('iframe');
            iframe.style.borderRadius = '12px';
            iframe.src = `https://open.spotify.com/embed/track/${trackId}`;
            iframe.width = '100%';
            iframe.height = '352';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = '';
            iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
            iframe.loading = 'lazy';

            trackrow.appendChild(iframe);
            searchContainer.appendChild(trackrow);
        }
        tracks.forEach((track, index) => {
            const trackId = ids[index];
            createTrackIframe(trackId);
        });
        const artistIds = []
        artists.forEach((artist) => {
            artistIds.push(artist.id);
        })
        function createArtistIframe(artistId) {
            const iframe = document.createElement('iframe');
            iframe.style.borderRadius = '12px';
            iframe.src = `https://open.spotify.com/embed/artist/${artistId}`;
            iframe.width = '100%';
            iframe.height = '352';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = '';
            iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
            iframe.loading = 'lazy';

            artistrow.appendChild(iframe);
            searchContainer.appendChild(artistrow);
        }
        artists.forEach((artist, index) => {
            const artistId = artistIds[index];
            createArtistIframe(artistId);
        });
        const albumIds = []
        albums.forEach((album) => {
            albumIds.push(album.id);
        })
        function createAlbumIframe(albumId) {
            const iframe = document.createElement('iframe');
            iframe.style.borderRadius = '12px';
            iframe.src = `https://open.spotify.com/embed/album/${albumId}`;
            iframe.width = '100%';
            iframe.height = '352';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = '';
            iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
            iframe.loading = 'lazy';

            albumrow.appendChild(iframe);
            searchContainer.appendChild(albumrow);
        }
        albums.forEach((album, index) => {
            const albumId = albumIds[index];
            createAlbumIframe(albumId);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});



(async () => {
    let playlist = await displayPlaylist(token);
    let artists = await getArtists(artistToken);
    let albums = await getAlbums(albumToken);
    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
            name: 'My Web Player',
            getOAuthToken: async callback => {
                // Call a function to retrieve the Spotify access token
                const accessToken = await getToken();
                callback(accessToken);
            },
            volume: 0.5 // Adjust the volume as desired
        });

        // Connect to the player
        player.connect();
    };
})();
