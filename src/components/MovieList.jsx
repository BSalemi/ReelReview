import Movie from "./Movie";

export default function MovieList({ movies, query }) {
  if (query && (!movies || movies.length === 0)) {
    return <p className="noResultsMessage">🎬 No results for "{query}"</p>;
  }

  return (
    <ul className="list">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
