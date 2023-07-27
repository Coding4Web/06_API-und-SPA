/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { InfinitySpin, MagnifyingGlass, Oval } from 'react-loader-spinner';

import { fetchMovieDb } from '../movieDb';

export default function Movie({ params }) {
	const [movieData, setMovieData] = useState(null);
	// const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	// Movie-ID = params.id

	/* Hier die Filmdaten laden und in movieData speichern.
	https://developers.themoviedb.org/3/movies/get-movie-details
	*/

	const { id } = params;

	useMovieData(id, setMovieData, setErrorMessage);

	if (errorMessage) {
		return <strong>{errorMessage}</strong>;
	}

	if (!movieData) {
		// if (isLoading) {
		// return null;
		return (
			<MagnifyingGlass
				visible={true}
				height="80"
				width="80"
				ariaLabel="MagnifyingGlass-loading"
				wrapperStyle={{}}
				wrapperClass="MagnifyingGlass-wrapper"
				glassColor="#c0efff"
				color="#e15b64"
			/>
		);
	}

	return (
		<>
			<Helmet>
				<title>Movie: {movieData.title}</title>
			</Helmet>
			<article className="movie">
				<h1 className="movie__title">{movieData.title}</h1>
				{movieData.title != movieData.original_title && (
					<em className="movie__original-title">{movieData.original_title}</em>
				)}
				{movieData.overview && (
					<p className="movie__overview">{movieData.overview}</p>
				)}
				<h2>Details</h2>
				<dl className="movie__details">
					{movieData.release_date && (
						<>
							<dt>Datum</dt>
							<dd>{new Date(movieData.release_date).toLocaleDateString()}</dd>
						</>
					)}
					<dt>Dauer</dt>
					<dd>{movieData.runtime} min.</dd>
					<dt>{movieData.genres.length > 1 ? 'Genres' : 'Genre'}</dt>
					<dd>{movieData.genres.map(({ name }) => name).join(', ')}</dd>
				</dl>
			</article>
		</>
	);
}

function useMovieData(id, setMovieData, setErrorMessage) {
	useEffect(() => {
		async function getMovieData() {
			try {
				const { data } = await fetchMovieDb(`/movie/${id}`, {
					params: { movie_id: parseInt(id) },
				});
				// console.log('movieData', data);

				setTimeout(() => {
					setMovieData(data);
					// setIsLoading(false);
				}, 500);
			} catch (error) {
				setMovieData([]);
				console.log(error);
				setErrorMessage('Beim Laden der Daten ist ein Problem aufgetreten!');
			}
		}

		getMovieData();
	}, [id]);
}

/* 
Hinweise: 
- Originaltitel nur anzeigen, wenn er vom deutschen Titel abweicht

- Overview nur anzeigen, wenn vorhanden.

- Falls Erscheinungsdatum vorhanden, das Datum anzeigen.
Bonus: Datum mit Hilfe der toLocaleDateString-Methode des Date-Objekts
im deutschen Format anzeigen:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

- Genres als kommagetrennten String anzeigen, hier können zwei
Array-Methoden mit chaining verbunden und genutzt werden.
Je nachdem, ob es ein oder mehrere Genres gibt, soll in dt Genre oder
Genres stehen.

Bonus: Nutzt Helmet, um den Filmtitel als Seitentitel darzustellen

Bonus: Stellt statt dem article-Element mit den Filmdaten eine Ladeanzeige 
   von https://mhnpd.github.io/react-loader-spinner/ dar, bis die Filmdaten 
   geladen sind. 

Infos zum HTML-Element dl (description list):
https://www.mediaevent.de/xhtml/dl.html
http://html5doctor.com/the-dl-element/ 
*/
