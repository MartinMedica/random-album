'use client';
import Image from 'next/image';
import { Album } from '../../../../lib/albums';
import Link from 'next/link';
import { getFavoritesAlbums } from '../../../../lib/favorites';

const FavoriteAlbum = ({ album }: { album: Album }) => (
	<>
		<Link href={`${album.id}`}>
			{album.coverUrl && (
				<Image
					alt={`${album.title} Album cover`}
					className="w-auto h-60"
					width={384}
					height={384}
					quality={100}
					src={album.coverUrl || ''}
				></Image>
			)}
			<h1 className="text-slate-300 text-3xl">
				{album?.artist + ' - ' + album?.title}
			</h1>
		</Link>
	</>
);

export default function Home({ params }: { params: { id: number } }) {
	const favorites = getFavoritesAlbums();
	return (
		<div className="min-h-screen w-full bg-violet-400">
			{favorites.map((fav: Album) => (
				<FavoriteAlbum key={fav.id} album={fav} />
			))}
		</div>
	);
}
