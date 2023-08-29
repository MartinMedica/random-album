'use client';
import { Album } from './albums';

export const getFavoritesAlbums = () => {
	if (!window) {
		return [];
	}

	return JSON.parse(
		window.localStorage.getItem('favorites') || JSON.stringify({ albums: [] })
	).albums;
};

export const addAlbumToFavorites = (album: Album) => {
	const favorites = getFavoritesAlbums();

	favorites.push(album);

	if (!window) {
		return;
	}
	window.localStorage.setItem(
		'favorites',
		JSON.stringify({ albums: favorites })
	);
};

export const removeAlbumFromFavorites = (album: Album) => {
	let favorites = getFavoritesAlbums().filter(
		(fav: Album) => fav.id !== album.id
	);

	if (!window) {
		return;
	}

	window.localStorage.setItem(
		'favorites',
		JSON.stringify({ albums: favorites })
	);
};
