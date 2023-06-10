import { getToken } from './main.js';

let token = await getToken();
let artistToken = await getToken();
let albumToken = await getToken();

// spotify-player.js

// Initialize the player


// Function to retrieve the Spotify access token


async function displayPlaylist(token) {
    try {
        const response = await fetch('https://api.spotify.com/v1/recommendations?limit=5&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ token
            }
        });
        const data = await response.json();

        const playlistContainer = document.querySelector('.explore-playlist');
        const playlists = data.tracks;

        playlists.forEach((playlist, index) => {
            const playlistRow = document.createElement('div');
            playlistRow.className = 'row playlist-row';

            const column1 = document.createElement('div');
            column1.className = 'column';

            const playlistImage = document.createElement('img');
            playlistImage.className = 'playlist-image';
            playlistImage.src = playlist.album.images[0].url;
            playlistImage.alt = 'playlist image';
            column1.appendChild(playlistImage);

            const column2 = document.createElement('div');
            column2.className = 'column';

            const playlistInfo = document.createElement('div');
            playlistInfo.className = 'playlist-info';

            const playlistName = document.createElement('h1');
            playlistName.textContent = playlist.name;

            const playlistDescription = document.createElement('h2');
            playlistDescription.textContent = playlist.description;

            playlistInfo.appendChild(playlistName);
            playlistInfo.appendChild(playlistDescription);

            column2.appendChild(playlistInfo);

            playlistRow.appendChild(column1);
            playlistRow.appendChild(column2);

            // Add the song row within the playlist row
            const songRow = document.createElement('div');
            songRow.className = 'song-row';
            songRow.id = `song${index + 1}`;

            const songTitle = document.createElement('span');
            songTitle.textContent = playlist.name;

            const playButton = document.createElement('button');
            playButton.className = 'play-button';
            playButton.textContent = 'Play';

            songRow.appendChild(songTitle);
            songRow.appendChild(playButton);

            playlistRow.appendChild(songRow);

            playlistContainer.appendChild(playlistRow);
        });

        // Add event listeners to the play buttons
        const playButtons = document.getElementsByClassName('play-button');
        Array.from(playButtons).forEach((button, index) => {
            button.addEventListener('click', () => {
                const songId = `song${index + 1}`; // Get the song ID based on the button index
                const songRow = document.getElementById(songId);
                const songTitle = songRow.querySelector('span').textContent;
                const trackUri = fetchTrackUri(songTitle); // Call a function to retrieve the track URI or ID for the song
                playSong(trackUri);
            });
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

// Play a specific song using the Spotify Player SDK
function playSong(trackUri) {
    player.resume().then(() => {
        player.play({
            uris: [trackUri]
        });
    });
}

// Call a function to retrieve the track URI or ID for the song
function fetchTrackUri(songTitle) {
    // Add your code to fetch the track URI or ID for the given song title
    // This can involve making API calls to the Spotify Web API or any other method of obtaining the track information
    // Return the track URI or ID
    return 'TRACK_URI_OR_ID';
}


async function getArtists(artistToken) {

    try {
        const response = await fetch('https://api.spotify.com/v1/recommendations?limit=5&seed_artists=3TVXtAsR1Inumwj472S9r4&seed_genres=hip-hop%2Cclassical%2Ccountry&seed_tracks=59nOXPmaKlBfGMDeOVGrIK', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        );

        const data = await response.json();
        console.log(data)
        const artistContainer = document.querySelector('.explore-artists');
        const artists = data.tracks;
        artists.forEach(artist => {
            const artistRow = document.createElement('div');
            artistRow.className = 'row artist-row';

            const column1 = document.createElement('div');
            column1.className = 'column';

            const artistImage = document.createElement('img');
            artistImage.className = 'artist-image';
            artistImage.src = artist.album.images[0].url;
            artistImage.alt = 'artist image';
            column1.appendChild(artistImage);

            const column2 = document.createElement('div');
            column2.className = 'column';

            const artistInfo = document.createElement('div');
            artistInfo.className = 'artist-info';

            // const artistName = document.createElement('h1');
            // artistName.textContent = artist.name;

            const artistGenres = document.createElement('h2');
            artistGenres.className = 'artist-name';
            artistGenres.textContent = artist.artists[0].name

            // artistInfo.appendChild(artistName);
            artistInfo.appendChild(artistGenres);

            column2.appendChild(artistInfo);

            artistRow.appendChild(column1);
            artistRow.appendChild(column2);

            artistContainer.appendChild(artistRow);
        })
    } catch (error) {
        console.error('Error:', error);
    }
}
async function getAlbums(token) {
    try {
        const response = await fetch('https://api.spotify.com/v1/recommendations?limit=5&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=hiphop%2Cr%26b&seed_tracks=0c6xIDDpzE81m2q797ordA', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        );
        const data = await response.json();
        console.log(data)
        const albumContainer = document.querySelector('.explore-albums');
        const albums = data.tracks;
        albums.forEach(album => {
            const albumRow = document.createElement('div');
            albumRow.className = 'row album-row';

            const column1 = document.createElement('div');
            column1.className = 'column';

            const albumImage = document.createElement('img');
            albumImage.className = 'album-image';
            albumImage.src = album.album.images[0].url;
            albumImage.alt = 'album image';
            column1.appendChild(albumImage);

            const column2 = document.createElement('div');
            column2.className = 'column';

            const albumInfo = document.createElement('div');
            albumInfo.className = 'album-info';

            const albumName = document.createElement('h1');
            albumName.textContent = album.name;

            const albumDescription = document.createElement('h2');
            albumDescription.textContent = album.description;

            albumInfo.appendChild(albumName);
            albumInfo.appendChild(albumDescription);

            column2.appendChild(albumInfo);

            albumRow.appendChild(column1);
            albumRow.appendChild(column2);

            albumContainer.appendChild(albumRow);
        })
    } catch (error) {
        console.error('Error:', error);
    }
}



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
