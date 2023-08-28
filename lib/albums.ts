import fs from 'fs';
import path from 'path';
import 'server-only';

export type Album = {
	id: number;
	artist: string | undefined;
	title: string | undefined;
	info: string | undefined;
	tags: string[] | undefined;
};

const getAlbums = () => {
	const fullPath = path.join(process.cwd(), 'albums', 'data.csv');
	const albumsData = fs.readFileSync(fullPath).toString();
	const albums = albumsData.split('\n').map((albumData, index) => {
		const album = albumData.split(',');
		return {
			id: index,
			artist: album[0],
			title: album[1],
			info: album[2],
			tags: album.slice(3),
		};
	});
	return albums.slice(1);
};

export const albums = getAlbums();
