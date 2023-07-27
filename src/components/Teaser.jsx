import { Link, useLocation } from 'wouter';
import { imageBase } from '../movieDb';
export default function Teaser({
	title,
	original_title,
	poster_path,
	release_date,
	id,
}) {
	const posterUrl = poster_path ? `${imageBase}/w342/${poster_path}` : '';
	/* In year soll nur das Jahr aus release_date gespeichert werden: */
	// const year = 2023;
	const year = new Date(release_date).getFullYear();
	const [, setLocation] = useLocation();

	return (
		<article className="teaser">
			<header className="teaser__header">
				<h3 className="teaser__title">
					<Link to={`/movie/123`}>
						{title} {year && <time dateTime={year}>({year})</time>}
					</Link>
				</h3>
				{/* Originaltitel nur anzeigen, wenn er vom Titel abweicht */}
				{title != original_title && (
					<em className="teaser__original-title">{original_title}</em>
				)}
			</header>

			<div className="teaser__poster">
				{!posterUrl && (
					<div className="teaser__poster__placeholder" aria-hidden="true">
						🎞️
					</div>
				)}
				{posterUrl && (
					// <Link to={`/movie/${id}`}>
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
					<img
						src={posterUrl}
						alt={`Filmplakat ${title}`}
						onClick={() => {
							setLocation(`/movie/${id}`);
						}}
					/>
					// </Link>
				)}
			</div>
		</article>
	);
}
