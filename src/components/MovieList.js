import MovieCard from './MovieCard';

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">⌕</span>
        <h3>No titles found</h3>
        <p>Try another title or lower the minimum rating.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}

export default MovieList;
