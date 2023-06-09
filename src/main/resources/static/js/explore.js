import { getToken } from './main.js';

let token = await getToken();
let artistToken = await getToken();
let albumToken = await getToken();

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

        playlists.forEach(playlist => {
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

            playlistContainer.appendChild(playlistRow);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
async function getArtists(artistToken) {

    try {
        const response = await fetch('https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        );

        const data = await response.json();
        const artistContainer = document.querySelector('.explore-artists');
        const artists = data.artists;
        artists.forEach(artist => {
            const artistRow = document.createElement('div');
            artistRow.className = 'row artist-row';

            const column1 = document.createElement('div');
            column1.className = 'column';

            const artistImage = document.createElement('img');
            artistImage.className = 'artist-image';
            artistImage.src = artist.images[0].url;
            artistImage.alt = 'artist image';
            column1.appendChild(artistImage);

            const column2 = document.createElement('div');
            column2.className = 'column';

            const artistInfo = document.createElement('div');
            artistInfo.className = 'artist-info';

            const artistName = document.createElement('h1');
            artistName.textContent = artist.name;

            const artistGenres = document.createElement('h2');
            artistGenres.className = 'artist-genres';
            artistGenres.textContent = artist.genres.slice(0, 1).join(', ');

            artistInfo.appendChild(artistName);
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
        const albums = data.tracks.album;
        albums.forEach(album => {
            const albumRow = document.createElement('div');
            albumRow.className = 'row album-row';

            const column1 = document.createElement('div');
            column1.className = 'column';

            const albumImage = document.createElement('img');
            albumImage.className = 'album-image';
            albumImage.src = album.images[0].url;
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
})();
