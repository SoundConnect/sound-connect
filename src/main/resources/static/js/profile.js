import {getToken} from './main.js';


let token = await getToken();
let artistToken = await getToken();
let albumToken = await getToken();



export async function displayPlaylist() {
    try {
        const response = await fetch('https://api.spotify.com/v1/recommendations?limit=4&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA', {
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



// import { getToken } from './main.js';
//
// let token = await getToken();
// // let artistToken = await getToken();
// // let albumToken = await getToken();
// const token = 'BQBvNN4AulmPKbSgOAiwet2wN_9msGSqBbQMdYWH-tjTKbuBnam5Xe3GCxCxbrVKRkB60FbmJ57cGZDf8HCzHkhLxcUpHhKP5tsIF3pY5QRIpZMhtGh-3fhlPDM5y6esQZCCZ3050u9ug3MCejxGpAs2E6hyFZWUbVJN2_MDTz7hBXo-hXLbYDZek8h1caKpQxTy55_pvwRj2Rg0-rk3DKyj7E1wDezixFbWiwY1KY_NOVyEPUJbGAVhE--qwy7Z99AnNoW6YDzFvAdxnwEbNgVb';
//
// export async function displayProfilePlaylists() {
//     try {
//         const response = await fetch('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n?market=US', {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             }
//         });
//         const data = await response.json();
//
//         const trackContainer = document.querySelector('.profile-playlists');
//         const tracks = data.tracks;
//         const ids = tracks.map(track => track.id);
//         function createPlaylistIframe(trackId) {
//             const iframe = document.createElement('iframe');
//             iframe.src = "https://open.spotify.com/embed/playlist/3sqMZDGlRyWC27qmRERstj?" + trackId;
//             iframe.width = '250';
//             iframe.height = '80';
//             iframe.frameborder = '0';
//             iframe.allowtransparency = 'true';
//             iframe.allow = 'encrypted-media';
//
//             trackContainer.appendChild(iframe);
//         }
//         tracks.forEach((track, index) => {
//             const trackId = ids[index];
//             createPlaylistIframe(trackId);
//         });
//
//     } catch (error) {
//         console.error('Error:', error);
//     }
//
//     // const playlistsContainer = document.querySelector('.profile-playlists');
//     // Populate playlistsContainer with data
//     // ...
// }
//
// async function displayProfileArtists(artisttoken) {
//         try {
//             const response = await fetch('https://api.spotify.com/v1/recommendations?limit=3&seed_artists=3TVXtAsR1Inumwj472S9r4&seed_genres=hip-hop%2Cclassical%2Ccountry&seed_tracks=59nOXPmaKlBfGMDeOVGrIK', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': 'Bearer ' + token
//                 }
//             });
//
//             const data = await response.json();
//             const artistsContainer = document.querySelector('.profile-artists');
//             const artists = data.tracks;
//             console.log(artists);
//             const ids = []
//             artists.forEach((artist) => {
//                 ids.push(artist.artists[0].id);
//             })
//             function createArtistIframe(artistId) {
//                 const iframe = document.createElement('iframe');
//                 iframe.style.borderRadius = '12px';
//                 iframe.src = `https://open.spotify.com/embed/artist/${artistId}`;
//                 iframe.width = '100%';
//                 iframe.height = '352';
//                 iframe.frameBorder = '0';
//                 iframe.allowFullscreen = '';
//                 iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
//                 iframe.loading = 'lazy';
//
//                 artistContainer.appendChild(iframe);
//             }
//             artists.forEach((artist, index) => {
//                 const artistId = ids[index];
//                 createArtistIframe(artistId);
//             });
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }
//
//
// async function displayProfileAlbums(token) {
//     try {
//         const response = await fetch('https://api.spotify.com/v1/recommendations?limit=3&seed_artists=3TVXtAsR1Inumwj472S9r4&seed_genres=hip-hop%2Cclassical%2Ccountry&seed_tracks=59nOXPmaKlBfGMDeOVGrIK', {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             }
//         });
//     const data = await response.json();
//     const albumsContainer = document.querySelector('.profile-albums');
//         const albums = data.tracks;
//         const ids = []
//         albums.forEach((album) => {
//             ids.push(album.album.id);
//         })
//         function createAlbumIframe(albumId) {
//             const iframe = document.createElement('iframe');
//             iframe.style.borderRadius = '12px';
//             iframe.src = `https://open.spotify.com/embed/album/${albumId}`;
//             iframe.width = '100%';
//             iframe.height = '352';
//             iframe.frameBorder = '0';
//             iframe.allowFullscreen = '';
//             iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
//             iframe.loading = 'lazy';
//
//             albumContainer.appendChild(iframe);
//         }
//
//         albums.forEach((album, index   ) => {
//             const albumId = ids[index];
//             createAlbumIframe(albumId);
//         });
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
//
// (async () => {
//     const token = await getToken();
//     await displayProfilePlaylists(token);
//     await displayProfileArtists(artistToken);
//     await displayProfileAlbums(albumToken);
//
//     window.onSpotifyWebPlaybackSDKReady = () => {
//         const player = new Spotify.Player({
//             name: 'My Web Player',
//             getOAuthToken: async callback => {
//                 const accessToken = await getToken();
//                 callback(accessToken);
//             },
//             volume: 2.5
//         });
//
//         player.connect();
//     };
// })();






// import { getToken } from './main.js';
//
// let token = await getToken();
//
// const token = 'BQBvNN4AulmPKbSgOAiwet2wN_9msGSqBbQMdYWH-tjTKbuBnam5Xe3GCxCxbrVKRkB60FbmJ57cGZDf8HCzHkhLxcUpHhKP5tsIF3pY5QRIpZMhtGh-3fhlPDM5y6esQZCCZ3050u9ug3MCejxGpAs2E6hyFZWUbVJN2_MDTz7hBXo-hXLbYDZek8h1caKpQxTy55_pvwRj2Rg0-rk3DKyj7E1wDezixFbWiwY1KY_NOVyEPUJbGAVhE--qwy7Z99AnNoW6YDzFvAdxnwEbNgVb';
// async function fetchWebApi(endpoint, method, body) {
//     const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         method,
//         body:JSON.stringify(body)
//     });
//     return await res.json();
// }
//
// async function getTopTracks(){
//     // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//     return (await fetchWebApi(
//         'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
//     )).items;
// }
//
// const topTracks = await getTopTracks();
// console.log(
//     topTracks?.map(
//         ({name, artists}) =>
//             `${name} by ${artists.map(artist => artist.name).join(', ')}`
//     )
// );
// function createPlaylistIframe(trackId) {
//     const iframe = document.createElement('iframe');
//     iframe.src = `https://open.spotify.com/embed/track/${trackId}`;
//     iframe.width = '300';
//     iframe.height = '80';
//     iframe.frameborder = '0';
//     iframe.allowtransparency = 'true';
//     iframe.allow = 'encrypted-media';
//     let artistContainer = document.getElementById('artist-container');
//     artistContainer.appendChild(iframe);
// }
//
//
// // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = 'BQBvNN4AulmPKbSgOAiwet2wN_9msGSqBbQMdYWH-tjTKbuBnam5Xe3GCxCxbrVKRkB60FbmJ57cGZDf8HCzHkhLxcUpHhKP5tsIF3pY5QRIpZMhtGh-3fhlPDM5y6esQZCCZ3050u9ug3MCejxGpAs2E6hyFZWUbVJN2_MDTz7hBXo-hXLbYDZek8h1caKpQxTy55_pvwRj2Rg0-rk3DKyj7E1wDezixFbWiwY1KY_NOVyEPUJbGAVhE--qwy7Z99AnNoW6YDzFvAdxnwEbNgVb';
// async function fetchWebApi(endpoint, method, body) {
//     const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         method,
//         body:JSON.stringify(body)
//     });
//     return await res.json();
// }
//
// const topTracksIds = [
//     '5w40ZYhbBMAlHYNDaVJIUu','0Al3wN3keprGTSgG8NBwjr','1LM5zQv5pBKPyO7rm7Uz6U','2BgunkkepMPFpArQj1Dx5s','2wqXQjOmQ9KoBm9Ssgt4Fo'
// ];
//
// async function getRecommendations(){
//     // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
//     return (await fetchWebApi(
//         `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
//     )).tracks;
// }
//
// const recommendedTracks = await getRecommendations();
// console.log(
//     recommendedTracks.map(
//         ({name, artists}) =>
//             `${name} by ${artists.map(artist => artist.name).join(', ')}`
//     )
// );
//
//
// // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = 'BQBvNN4AulmPKbSgOAiwet2wN_9msGSqBbQMdYWH-tjTKbuBnam5Xe3GCxCxbrVKRkB60FbmJ57cGZDf8HCzHkhLxcUpHhKP5tsIF3pY5QRIpZMhtGh-3fhlPDM5y6esQZCCZ3050u9ug3MCejxGpAs2E6hyFZWUbVJN2_MDTz7hBXo-hXLbYDZek8h1caKpQxTy55_pvwRj2Rg0-rk3DKyj7E1wDezixFbWiwY1KY_NOVyEPUJbGAVhE--qwy7Z99AnNoW6YDzFvAdxnwEbNgVb';
// async function fetchWebApi(endpoint, method, body) {
//     const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         method,
//         body:JSON.stringify(body)
//     });
//     return await res.json();
// }
//
// const tracksUri = [
//     'spotify:track:5w40ZYhbBMAlHYNDaVJIUu','spotify:track:2rKmNEYrQxaOPZrOWKZpOc','spotify:track:0Al3wN3keprGTSgG8NBwjr','spotify:track:3jwLmTcTwuE0xLR3sm6SqI','spotify:track:1LM5zQv5pBKPyO7rm7Uz6U','spotify:track:4AQWKGBWTR7fVuUKxi5sKE','spotify:track:2BgunkkepMPFpArQj1Dx5s','spotify:track:5S5rw0WLVCAux5B5bWCehK','spotify:track:2wqXQjOmQ9KoBm9Ssgt4Fo','spotify:track:0mDa1tz2kXq9WXW6QEoI7i'
// ];
//
// async function createPlaylist(tracksUri){
//     const { id: user_id } = await fetchWebApi('v1/me', 'GET')
//
//     const playlist = await fetchWebApi(
//         `v1/users/${user_id}/playlists`, 'POST', {
//             "name": "My recommendation playlist",
//             "description": "Playlist created by the tutorial on developer.spotify.com",
//             "public": false
//         })
//
//     await fetchWebApi(
//         `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
//         'POST'
//     );
//
//     return playlist;
// }
//
// const createdPlaylist = await createPlaylist(tracksUri);
// console.log(createdPlaylist.name, createdPlaylist.id);
//


// const playlistId = '24oS8Zc6dTnuMc3pey7VPg';
//
// <iframe
//     title="Spotify Embed: Recommendation Playlist "
//     src={`https://open.spotify.com/embed/playlist/24oS8Zc6dTnuMc3pey7VPg?utm_source=generator&theme=0`}
//     width="100%"
//     height="100%"
//     style={{ minHeight: '360px' }}
//     frameBorder="0"
//     allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//     loading="lazy"
// />



// import { getToken } from './main.js';
//
// let token = await getToken();
//
// async function fetchProfileData(token) {
//     try {
//         const response = await fetch('https://api.spotify.com/v1/recommendations?limit=5&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA', {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer '+ token
//             }
//         });
//         const data = await response.json();
//
//         // Returns profile data contains user's playlists, artists, and albums
//         displayData('.profile-playlists', data.playlists);
//         displayData('.profile-tracks', data.tracks);
//         displayData('.profile-artists', data.artists);
//         displayData('.profile-albums', data.albums);
//
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
//
// function displayData(containerClass, items) {
//     const container = document.querySelector(containerClass);
//
//     items.forEach(item => {
//         const row = document.createElement('div');
//         row.className = 'row item-row';
//
//         const column1 = document.createElement('div');
//         column1.className = 'column';
//
//         const image = document.createElement('img');
//         image.className = 'item-image';
//         image.src = item.images[0].url;
//         image.alt = 'item image';
//         column1.appendChild(image);
//
//         const column2 = document.createElement('div');
//         column2.className = 'column';
//
//         const info = document.createElement('div');
//         info.className = 'item-info';
//
//         const name = document.createElement('h1');
//         name.textContent = item.name;
//
//         const description = document.createElement('h2');
//         description.textContent = item.description;
//
//         info.appendChild(name);
//         info.appendChild(description);
//
//         column2.appendChild(info);
//
//         row.appendChild(column1);
//         row.appendChild(column2);
//
//         container.appendChild(row);
//     });
// }
//
// (async () => {
//     await fetchProfileData(token);
// })();
