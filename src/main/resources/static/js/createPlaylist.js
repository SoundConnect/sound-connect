// import {getSongData, getToken} from '/main.js';

export const KEYS = {
	clientID: "6b14de4df2be4965a8c7675f7314f326",
	clientSecret: "b686f5110ec84bba8b217a1e06aae212",
	accessCode: ""
}
const submitButton = document.querySelector('.create-playlist-btn');
const search = document.querySelector('.create-page-search');
let searchResultsParent = document.querySelector('.search-results-container');
let addSongBtns = document.querySelectorAll('.add-song-btn');
let playlistBody = document.querySelector('.playlist-song-box');
let songList = [];



// Sends a POST request to the server with playlist info
submitButton.addEventListener('click', () => {
	sendHttpRequest();
});
function sendHttpRequest() {
	let playlistTitleValue = document.querySelector('.playlist-title').value;
	let playlistDescriptionValue = document.querySelector('.playlist-description').value;
	const xhr = new XMLHttpRequest();

	xhr.open('POST', '/create');
	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.onload = function() {
		if (xhr.status === 200) {
			// Request succeeded
			// Handle the response
		} else {
			// Request failed
			throw new Error('Request failed');
		}
	};

	xhr.onerror = function() {
		// Request failed
		throw new Error('Request failed');
	};

	const playlistData = {
		name: playlistTitleValue,
		description: playlistDescriptionValue,
		tracks: songList
	};
	console.log(playlistData);

	xhr.send(JSON.stringify(playlistData));
}

// Get API token from Spotify
const getToken = async () => {
	try {
		const result = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + btoa(KEYS.clientID + ':' + KEYS.clientSecret)
			},
			body: 'grant_type=client_credentials'
		});
		const data = await result.json();
		return data.access_token;

	} catch (error) {
		console.log("Error retrieving API access code: " + error);
	}
}

// Get song data from song name
const getSongData = async (token, songName) => {
	try {
		const result = await fetch(`https://api.spotify.com/v1/search?query=${songName}&type=track&market=US&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=10`, {
			method: 'GET',
			headers: {'Authorization': 'Bearer ' + token}
		});
		let data = await result.json();
		return sortSongData(data.tracks.items);
	} catch (error) {
		console.log("Error retrieving song data: " + error);
	}
}
// Sort song data by popularity
const sortSongData = (songData) => {
	songData.sort((a, b) => {
		return b.popularity - a.popularity;
	});
	return songData;
}

// Get search results data
search.addEventListener('keyup', async () => {
	let token = await getToken();
	let searchResults = await getSongData(token, search.value);
	console.log(searchResults);
	searchResultsParent.innerHTML = '';
	searchResults.forEach(song => {
		displaySearchResults(song);
	});

	// event listener for add song button
	addSongBtns = document.querySelectorAll('.add-song-btn');
	addSongBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			let songData = btn.querySelector('span').innerText;
			let songDataArr = songData.split('~');
			songList.push(
				{
					"name": songDataArr[0],
					"spotifyId": songDataArr[1],
					"duration": songDataArr[2],
					"album": {
						"name": songDataArr[3],
						"albumArt": songDataArr[4],
						"artist": {
							"name": songDataArr[5]
						}
					}
				}
			);
			let addedSongCard = e.target.parentElement;
			addedSongCard.children[3].style.visibility = 'hidden';

			let newCard = document.createElement('div');
			newCard.classList.add('row', 'align-center');
			newCard.innerHTML = addedSongCard.innerHTML;
			newCard.innerHTML += `<div class="song-duration">${songDataArr[2]}</div>`;

			playlistBody.innerHTML += newCard.outerHTML;
		});
	});
});

// Display search results
const displaySearchResults = song => {
	let features = song.artists.map(artist => artist.name).join(', ');

	searchResultsParent.innerHTML += `
		<div class="row align-center">
			<div class="column shrink song-pic-wrapper">
				<img src="${song.album.images[2].url}" alt="Song Picture" class="song-pic" >
			</div>
			<div class="column song-title no-gap">
				<p class="song-name">${song.name}</p>
				<p class="song-artist">${features}</p>
			</div>
			<div class="column song-album-name">${song.album.name}</div>
			<button class="add-song-btn">Add <span>${song.name}~${song.id}~${song.duration_ms}~${song.album.name}~${song.album.images[2].url}~${song.album.artists[0].name}</span></button>
		</div>`;
}




