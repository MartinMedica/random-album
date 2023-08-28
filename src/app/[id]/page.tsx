import { redirect } from 'next/navigation';
import Image from 'next/image';
import Wikipedia from './Wikipedia';
import ReddirectAlbum from './Reddirect';
import { albums, Album } from '../../../lib/albums';
import { searchArticle, getImage } from '../../../lib/api/wikipedia';
import { Suspense } from 'react';

export default async function Home({ params }: { params: { id: number } }) {
	const album: Album = albums[params.id];
	const title = await searchArticle(`${album.artist} ${album.title}`);
	const imgSrc = await getImage(title);

	searchArticle(`${album.artist} ${album.title}`);

	return (
		<div className="min-h-screen w-full bg-violet-400">
			<div className="p-5 flex flex-col items-center bg-violet-950">
				{imgSrc && (
					<Image
						alt={`${album.title} Album cover`}
						className="w-auto h-60"
						width={384}
						height={384}
						quality={100}
						src={imgSrc}
					></Image>
				)}
				<ReddirectAlbum albums={albums} />
				<h1 className="text-slate-300 text-3xl">
					{album?.artist + ' - ' + album?.title}
				</h1>
			</div>
			<Suspense>
				<Wikipedia title={title} />
			</Suspense>
		</div>
	);
}
