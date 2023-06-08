// Get API token from Spotify
import {KEYS} from "./keys";

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
		KEYS.accessCode = data.access_token;

	} catch (error) {
		console.log("Error retrieving API access code: " + error);
	}
}

// Get song data from song name
const getSongData = async (token, songName) => {
	try {
		const result = await fetch(`https://api.spotify.com/v1/search?query=${songName}&type=track&market=US&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=5`, {
			method: 'GET',
			headers: {'Authorization': 'Bearer ' + token}
		});
		return await result.json();
	} catch (error) {
		console.log("Error retrieving song data: " + error);
	}
}

// Get artist data from artist name
const getArtistData = async (token, artistName) => {
	try {
		const result = await fetch(`https://api.spotify.com/v1/search?query=${artistName}&type=artist&market=US&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=5`, {
			method: 'GET',
			headers: {'Authorization': 'Bearer ' + token}
		});
		return await result.json();
	} catch (error) {
		console.log("Error retrieving artist data: " + error);
	}
}

// Get album data from album name
const getAlbumData = async (token, albumName) => {
	try {
		const result = await fetch(`https://api.spotify.com/v1/search?query=${albumName}&type=album&market=US&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=5`, {
			method: 'GET',
			headers: {'Authorization': 'Bearer ' + token}
		});
		return await result.json();

	} catch (error) {
		console.log("Error retrieving album data: " + error);
	}
}

// Search for any type of data (song, artist, album)
const searchAnything = async (token, query) => {
	let songData = await getSongData(KEYS.accessCode, query);
	let artistData = await getArtistData(KEYS.accessCode, query);
	let albumData = await getAlbumData(KEYS.accessCode, query);

	let searchResults = {
		tracks: songData.tracks,
		artists: artistData.artists,
		albums: albumData.albums
	};

	let filteredSearchResults = filterSearchResults(searchResults, query);
	// return filteredSearchResults;
	return sortSearchResults(filteredSearchResults);
}

// filter search results to only show results where the result name matches the query
const filterSearchResults = (searchResults, query) => {
	let filteredResults = {
		tracks: [],
		artists: [],
		albums: []
	}
	let albums = searchResults.albums.items;
	let artists = searchResults.artists.items;
	let tracks = searchResults.tracks.items;

	// filter albums
	albums.forEach((album)=>{
		if (album.name.toLowerCase().includes(query.toLowerCase())){
			filteredResults.albums.push(album);
		}
	});

	// filter artists
	artists.forEach((artist)=>{
		if (artist.name.toLowerCase().includes(query.toLowerCase())){
			filteredResults.artists.push(artist);
		}
	});

	// filter tracks
	tracks.forEach((track)=>{
		if (track.name.toLowerCase().includes(query.toLowerCase())){
			filteredResults.tracks.push(track);
		}
	});

	return filteredResults;
}

// sort search results by popularity
const sortSearchResults = async (searchResults) => {
	let sortedResults = {
		tracks: [],
		artists: [],
		albums: []
	}
	let albums = searchResults.albums;
	let artists = searchResults.artists;
	let tracks = searchResults.tracks;

	// sort artists
	artists.sort((a, b)=>{
		return b.popularity - a.popularity;
	});
	sortedResults.artists = artists;

	// sort tracks
	tracks.sort((a, b)=>{
		return b.popularity - a.popularity;
	});
	sortedResults.tracks = tracks;

	// sort albums
	albums = await getBetterAlbumData(albums);
	albums.sort((a, b)=>{
		return b.popularity - a.popularity;
	});
	sortedResults.albums = albums;

	return sortedResults;
}

// get album data from album ID (gives album popularity unlike album data from query)
const getBetterAlbumData = async (albums) => {
	let newAlbumData = [];
	for await (const album of albums){
		try {
			const result = await fetch(`https://api.spotify.com/v1/albums/${album.id}`, {
				method: 'GET',
				headers: {'Authorization': 'Bearer ' + KEYS.accessCode}
			});
			 let albumData = await result.json();
			 newAlbumData.push(albumData);
		} catch (error) {
			console.log("Error retrieving album data from album ID: " + error);
		}
	}
	return newAlbumData;
}


/////////////////////
// Testing Methods //
/////////////////////

// get new access code if there is not one generated
if (KEYS.accessCode === ""){
	console.log("New token generated!");
	await getToken();
}

// display search results
let searchData = await searchAnything(KEYS.accessCode, "DUCKWORTH");
console.log(searchData);




