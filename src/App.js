import { useState } from 'react';
import Filter from './components/Filter';
import MovieList from './components/MovieList';

const initialMovies = [
  {
    id: 1,
    title: 'Interstellar',
    description: 'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.',
    posterURL: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=85',
    rating: 8.7,
  },
  {
    id: 2,
    title: 'The Grand Budapest Hotel',
    description: 'A legendary concierge and his young protégé get caught up in a theft, a family fortune, and a changing world.',
    posterURL: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85',
    rating: 8.1,
  },
  {
    id: 3,
    title: 'Stranger Things',
    description: 'When a boy vanishes, a small town uncovers a mystery involving secret experiments and strange forces.',
    posterURL: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=85',
    rating: 8.6,
  },
  {
    id: 4,
    title: 'Everything Everywhere All at Once',
    description: 'An overwhelmed laundromat owner becomes the unlikely hero of a hilarious, heartfelt multiverse adventure.',
    posterURL: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=700&q=85',
    rating: 7.8,
  },
  {
    id: 5,
    title: 'The Bear',
    description: 'A young chef returns home to run his family sandwich shop and finds that the kitchen is only part of the challenge.',
    posterURL: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=85',
    rating: 8.4,
  },
  {
    id: 6,
    title: 'Parasite',
    description: 'Two families from opposite sides of the city become entangled in a sharp, unpredictable game of class and survival.',
    posterURL: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=700&q=85',
    rating: 8.5,
  },
];

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [titleFilter, setTitleFilter] = useState('');
  const [minimumRating, setMinimumRating] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: '',
  });

  const visibleMovies = movies.filter((movie) => (
    movie.title.toLowerCase().includes(titleFilter.trim().toLowerCase())
    && movie.rating >= minimumRating
  ));

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewMovie((currentMovie) => ({ ...currentMovie, [name]: value }));
  }

  function handleAddMovie(event) {
    event.preventDefault();
    setMovies((currentMovies) => [
      {
        ...newMovie,
        id: Date.now(),
        rating: Number(newMovie.rating),
      },
      ...currentMovies,
    ]);
    setNewMovie({ title: '', description: '', posterURL: '', rating: '' });
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Reel Good home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>reel<span className="brand-accent">good</span></span>
        </a>
        <span className="topbar-note">A little collection of big-screen favorites</span>
        <a className="topbar-link" href="#add-movie">Add a title <span aria-hidden="true">↗</span></a>
      </header>

      <section className="intro">
        <p className="eyebrow"><span className="eyebrow-line" /> YOUR PERSONAL SCREENING ROOM</p>
        <div className="intro-row">
          <div>
            <h1>Stories worth<br /><span>staying in for.</span></h1>
            <p className="intro-copy">The films and shows we can’t stop thinking about.<br />Find your next favorite.</p>
          </div>
          <div className="collection-count">
            <span className="count-number">{String(movies.length).padStart(2, '0')}</span>
            <span className="count-label">TITLES<br />IN THE COLLECTION</span>
          </div>
        </div>
      </section>

      <section className="collection" aria-labelledby="collection-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow section-eyebrow">THE COLLECTION</p>
            <h2 id="collection-heading">Pick your picture</h2>
          </div>
          <Filter
            title={titleFilter}
            rating={minimumRating}
            onTitleChange={setTitleFilter}
            onRatingChange={setMinimumRating}
          />
        </div>
        <MovieList movies={visibleMovies} />
      </section>

      <section className="add-section" id="add-movie" aria-labelledby="add-heading">
        <div className="add-intro">
          <p className="eyebrow section-eyebrow">MAKE IT A DOUBLE FEATURE</p>
          <h2 id="add-heading">Add to the<br /><span>watchlist.</span></h2>
          <p>Got a recommendation? Save it here so it’s ready for movie night.</p>
        </div>
        <form className="movie-form" onSubmit={handleAddMovie}>
          <label>
            Title
            <input name="title" value={newMovie.title} onChange={handleInputChange} placeholder="What are we watching?" required />
          </label>
          <label>
            Poster image URL
            <input name="posterURL" type="url" value={newMovie.posterURL} onChange={handleInputChange} placeholder="https://…" required />
          </label>
          <label className="form-description">
            A little about it
            <textarea name="description" value={newMovie.description} onChange={handleInputChange} placeholder="What makes it worth watching?" rows="3" required />
          </label>
          <label className="form-rating">
            Your rating
            <span className="rating-input-wrap">
              <input name="rating" type="number" value={newMovie.rating} onChange={handleInputChange} min="0" max="10" step="0.1" placeholder="8.5" required />
              <span>/ 10</span>
            </span>
          </label>
          <button className="submit-button" type="submit">Add to collection <span aria-hidden="true">↗</span></button>
        </form>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="/" aria-label="Reel Good home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>reel<span className="brand-accent">good</span></span>
        </a>
        <span>Made for the love of a good story.</span>
      </footer>
    </main>
  );
}

export default App;
