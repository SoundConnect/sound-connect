export const KEYS = {
	clientID: "6b14de4df2be4965a8c7675f7314f326",
	clientSecret: "b686f5110ec84bba8b217a1e06aae212",
	accessCode: ""
}
const submitButton = document.querySelector('.create-playlist-btn');
const search = document.querySelector('.create-page-search');
const searchResultsHeader = document.querySelector('.search-results-container .song-box-header');
let searchResultsParent = document.querySelector('.search-results-box');

let playlistBody = document.querySelector('.playlist-song-box');
let songList = [];
const deleteBtn = document.querySelectorAll('.delete-btn');

const currentURL = window.location.href;
const url = new URL(currentURL);
const pathname = url.pathname;
const pathSegments = pathname.split('/');
const playlistId = pathSegments[2];

// Sends a POST request to the server with playlist info
submitButton.addEventListener('click', () => {
	let playlistTitleValue = document.querySelector('.playlist-title').value;
	if (playlistTitleValue.trim() === '') {
		playlistTitleError();
		return;
	}
	playlist();
	window.location.href = '/feed';
});
function playlist() {
	let playlistTitleValue = document.querySelector('.playlist-title').value;
	let playlistDescriptionValue = document.querySelector('.playlist-description').value;

	const playlistData = {
		name: playlistTitleValue,
		description: playlistDescriptionValue,
		tracks: songList
	};

	let endPoint = "";
	if (pathname.includes('edit')) {
		endPoint = `/feed/${playlistId}/edit`;
	} else {
		endPoint = '/create';
	}

	fetch(`${endPoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(playlistData)
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Request failed');
			}
		})
		.catch(error => {
			throw new Error('Request failed');
		});
}

//delete track from playlist
deleteBtn.forEach(btn => {
	btn.addEventListener('click', () => {
		let trackId = btn.value;
		console.log(trackId);
		fetch(`/feed/${playlistId}/edit`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({trackId: trackId})
		})
			.then(response => {
				if (response.ok) {
					console.log('Track deleted');
				} else {
					throw new Error('Failed to delete track');
				}
			});
	});
});

// display error message for empty playlist title
const playlistTitleError = () => {
	let title = document.querySelector('input.playlist-title');
	title.style.borderColor = 'red';
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

// Get search results data for create page
search.addEventListener('keyup', async () => {
	if (search.value === '') {
		searchResultsParent.innerHTML = '';
		searchResultsHeader.style.display = 'none';
		return;
	}

	let token = await getToken();
	let searchResults = await getSongData(token, search.value);
	console.log(searchResults);
	searchResultsParent.innerHTML = '';
	searchResults.forEach(song => {
		displaySearchResults(song);
	});
	searchResultsHeader.style.display = 'flex';
});

// event listener for add song button
searchResultsParent.addEventListener('click', async (e) => {
	let clickedBtn = e.target;
	let songData;
	if (clickedBtn.nodeName === 'BUTTON') {
		songData = clickedBtn.querySelector('span').innerText.split('~');
		let artists = [];
		let artistNames = songData[5].split(',');
		let artistSpotifyIds = songData[6].split(',');

		for (let i = 0; i < artistNames.length; i++) {
			let genres = await getArtistGenres(artistSpotifyIds[i]);
			artists.push(
				{
					"name": artistNames[i],
					"spotifyId": artistSpotifyIds[i],
					"genres": genres
				}
			);
		}

		songList.push(
			{
				"name": songData[0],
				"spotifyId": songData[1],
				"duration": formatSongDuration(songData[2]),
				"artists": artists,
				"album": {
					"name": songData[3],
					"albumArt": songData[4],
					"spotifyId": songData[7]
				}
			}
		);
	}
	let addedSongCard = clickedBtn.parentElement;
	addedSongCard.children[3].style.visibility = 'hidden';

	let newCard = document.createElement('div');
	newCard.classList.add('row', 'align-center', 'no-padding');
	newCard.innerHTML = addedSongCard.innerHTML;
	newCard.children[3].remove();
	newCard.innerHTML += `<div class="column align-right song-duration">${formatSongDuration(songData[2])}</div>`;

	playlistBody.innerHTML += newCard.outerHTML;
});

// get genres from artist
const getArtistGenres = async (id) => {
	let token = await getToken();
	let genres = [];

	try {
		const result = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
			method: 'GET',
			headers: {'Authorization': 'Bearer ' + token}
		});
		let genreData = (await result.json()).genres;

		genreData.forEach(genre => {
			let genreObject = {
				"name": genre
			}
			genres.push(genreObject);
		});
		return genres;

	} catch (error) {
		console.log("Error retrieving artists' genre data: " + error);
	}
}

// Format song duration (milliseconds to minutes:seconds)
const formatSongDuration = duration => {
	const totalSeconds = Math.floor(duration / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	const formattedSeconds = String(seconds).padStart(2, '0');

	return `${minutes}:${formattedSeconds}`;
}

// Display search results
const displaySearchResults = song => {
	let artists = song.artists.map(artist => artist.name).join(', ');
	let artistSpotifyIds = song.artists.map(artist => artist.id).join(',');
	let songName = song.name;
	let albumName = song.album.name;
	if (songName.length > 40) {
		songName = songName.slice(0, 40) + '...';
	}
	if (albumName.length > 40) {
		albumName = albumName.slice(0, 40) + '...';
	}

	searchResultsParent.innerHTML += `
		<div class="row align-center no-padding">
			<div class="column shrink song-pic-wrapper">
				<img src="${song.album.images[2].url}" alt="Song Picture" class="song-pic" >
			</div>
			<div class="column song-title no-gap">
				<p class="song-name">${songName}</p>
				<p class="song-artist">${artists}</p>
			</div>
			<div class="column song-album-name">${albumName}</div>
			<button class="add-song-btn">Add <span>${song.name}~${song.id}~${song.duration_ms}~${song.album.name}~${song.album.images[2].url}~${artists}~${artistSpotifyIds}~${song.album.id}</span></button>
		</div>`;
}





