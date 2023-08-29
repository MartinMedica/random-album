import { redirect } from 'next/navigation';
import { albums, Album } from '../../lib/albums';

function getRandomAlbum(): Album {
	return albums[Math.floor(Math.random() * (albums.length - 1))];
}

export default function Home() {
	const album: Album = getRandomAlbum();

	return redirect(`album/${album.id}`);
}
