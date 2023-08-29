'use client';
import { useEffect, useState } from 'react';
import { Album } from '../../../../lib/albums';
import {
	addAlbumToFavorites,
	removeAlbumFromFavorites,
	getFavoritesAlbums,
} from '../../../../lib/favorites';

export function getRandomAlbum(albums: Album[]): Album {
	return albums[Math.floor(Math.random() * (albums.length - 1))];
}

export default function AddToFavorites({ album }: { album: Album }) {
	let favorites = getFavoritesAlbums();

	let [alreadyFav, setAlreadyFav] = useState(
		favorites.find((fav: Album) => fav.id === album.id)
	);

	return (
		<button
			className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			onClick={() => {
				if (!alreadyFav) {
					addAlbumToFavorites(album);
				} else {
					removeAlbumFromFavorites(album);
				}

				setAlreadyFav(!alreadyFav);
			}}
		>
			{alreadyFav ? 'Remove Album From Favorites' : 'Add Album To Favorites'}
		</button>
	);
}
