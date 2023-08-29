'use client';
import { Album } from './albums';

export const getFavoritesAlbums = () =>
	JSON.parse(
		window.localStorage.getItem('favorites') || JSON.stringify({ albums: [] })
	).albums;

export const addAlbumToFavorites = (album: Album) => {
	const favorites = getFavoritesAlbums();

	favorites.push(album);

	window.localStorage.setItem(
		'favorites',
		JSON.stringify({ albums: favorites })
	);
};

export const removeAlbumFromFavorites = (album: Album) => {
	let favorites = getFavoritesAlbums().filter(
		(fav: Album) => fav.id !== album.id
	);

	window.localStorage.setItem(
		'favorites',
		JSON.stringify({ albums: favorites })
	);
};
