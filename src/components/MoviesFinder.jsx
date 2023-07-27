import { Route, Link } from 'wouter';
import { useState, lazy, Suspense } from 'react';
import SearchPage from './SearchPage';
// import ContactPage from './ContactPage';
const ContactPage = lazy(() => import('./ContactPage'));
import Movie from './Movie';

export default function MoviesFinder() {
	const [searchTerm, setSearchTerm] = useState('');
	// const [movieData, setMovieData] = useState(null);

	return (
		<div className="movies-finder">
			<nav className="main-navigation">
				<Link to="/">Start</Link>
				<Link to="/contact">Kontakt</Link>
			</nav>
			{/* <Route path="/" component={SearchPage} /> */}
			<Route path="/">
				{() => (
					<SearchPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				)}
			</Route>
			{/* Lazy importiere Komponenten müssen in eine Supsend-Komponente gepackt werden.
			die als fallback-Prop eine Komponente benötige, die während der Ladezeit angezeit wird */}
			<Suspense fallback={<strong>Loading...</strong>}>
				<Route path="/contact" component={ContactPage} />
			</Suspense>
			<Route path="/movie/:id" component={Movie} /> {/* :id = Platzhalter */}
		</div>
	);
}
