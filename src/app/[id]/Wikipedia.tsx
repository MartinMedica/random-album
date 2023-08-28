import { getArticle } from '../../../lib/api/wikipedia';

export default async function Wikipedia({ title }: { title: string }) {
	const link = `https://en.wikipedia.org/wiki/${title}`;
	const content = await getArticle(title);

	return (
		<main className="w-3/5 m-auto">
			{link && (
				<p className="original">
					Extract obtained from wikipedia:{' '}
					<a
						href={link}
						className="text-stale-400 hover:text-slate-300 underline"
						rel="noopener noreferrer"
						target="_blank"
					>
						go to original article
					</a>
				</p>
			)}
			<div dangerouslySetInnerHTML={{ __html: content }}></div>
		</main>
	);
}
