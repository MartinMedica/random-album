'use client';
import { redirect } from 'next/navigation';
import { Album } from '../../../lib/albums';

export function getRandomAlbum(albums: Album[]): Album {
	return albums[Math.floor(Math.random() * (albums.length - 1))];
}

export default function ReddirectAlbum({ albums }: { albums: Album[] }) {
	return (
		<button
			className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			onClick={() => {
				const album: Album = getRandomAlbum(albums);
				console.log(album.id);
				window.location.assign(`${album.id}`);
			}}
		>
			Get Random Album
		</button>
	);
}
