import { redirect } from 'next/navigation';
import { getRandomAlbum, Album } from '../../lib/albums';

export default function Home() {
  const album: Album = getRandomAlbum();

  return redirect(`${album.id}`);
}

export const dynamic = 'force-dynamic';
