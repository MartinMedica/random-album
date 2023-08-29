'use client';
import { Album } from './albums';

export const getFavoritesAlbums = () => {
	if (typeof window === 'undefined') {
		return [];
	}

	return JSON.parse(
		window.localStorage.getItem('favorites') || JSON.stringify({ albums: [] })
	).albums;
};

export const addAlbumToFavorites = (album: Album) => {
	const favorites = getFavoritesAlbums();

	favorites.push(album);

	if (typeof window === 'undefined') {
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

	if (typeof window === 'undefined') {
		return;
	}

	window.localStorage.setItem(
		'favorites',
		JSON.stringify({ albums: favorites })
	);
};
