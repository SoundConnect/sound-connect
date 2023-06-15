import {getToken} from './main.js';


let token = await getToken();
let categoryToken = await getToken();
// let artistToken = await getToken();
let albumToken = await getToken();



export async function displayPlaylist() {
    try {
        const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists?country=US&timestamp=2023-06-14T15%3A00%3A40&offset=0&limit=3', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        console.log(data);

        const playlistContainer = document.querySelector('.profile-playlists');
        const playlists = data.playlists.items;
        console.log(playlists);
        const ids = playlists.map(playlist => playlist.id);
        function createPlaylistIframe(playlist) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://open.spotify.com/embed/playlist/${playlist}`;
            iframe.width = '100%';
            iframe.height = '352';
            iframe.frameBorder = '0';
            iframe.allowtransparency = 'true';
            // iframe.allow = 'encrypted-media';
            iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';

            playlistContainer.appendChild(iframe);
        }

        playlists.forEach((playlist, index) => {
            const playlist_id = ids[index];
            createPlaylistIframe(playlist_id);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

async function getCategory(categoryToken) {
    try {
        const response = await fetch('https://api.spotify.com/v1/browse/categories?country=US&timestamp=2023-06-14T15%3A00%3A40&offset=0&limit=3', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            console.error('HTTP error', response.status, response.statusText);
            throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();
        const categoryContainer = document.querySelector('.profile-category');
        const categories = data.categories.items;

        categories.forEach(async (category) => {
            const categoryResponse = await fetch(`https://api.spotify.com/v1/browse/categories/${category.id}/playlists?limit=1`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (!categoryResponse.ok) {
                console.error('HTTP error', categoryResponse.status, categoryResponse.statusText);
                throw new Error('HTTP error ' + categoryResponse.status);
            }
            const categoryData = await categoryResponse.json();
            const playlist = categoryData.playlists.items[0];
            createCategoryIframe(playlist.id);
        });

        function createCategoryIframe(playlistId) {
            const iframe = document.createElement('iframe');
            iframe.style.borderRadius = '12px';
            iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
            iframe.width = '100%';
            iframe.height = '352';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = '';
            iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
            iframe.loading = 'lazy';

            categoryContainer.appendChild(iframe);
        }

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
        const albumContainer = document.querySelector('.profile-albums');
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

(async () => {
    let playlist = await displayPlaylist(token);
    let category = await getCategory(categoryToken);
    // let artists = await getArtists(artistToken);
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
