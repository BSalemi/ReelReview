export default function MoviePage({ movie }) {
  return (
    <div className="movie-page-container">
      <h1 className="movie-title">{movie.Title}</h1>
      <div className="movie-info">
        <p>
          <span>⭐️</span>
          <span>movie.imdbRating</span>
        </p>
        <p>
          <span>⏳</span>
          <span>movie.Runtime</span>
        </p>
        <p>
          <span>🗓</span>
          <span>movie.Year</span>
        </p>
      </div>
      <button className="watched-button">Add to Watched List</button>
    </div>
  );
}
