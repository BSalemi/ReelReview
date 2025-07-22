import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function MoviePage({ movie }) {
  const { imdbId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbId}`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    }

    fetchMovie();
  }, [imdbId]);

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className="movie-page-container">
      <div className="movie-title-container">
        <h1 className="movie-title">{movieDetails.Title}</h1>
        <img src={movieDetails.Poster} alt={`${movieDetails.Title} poster`} />
      </div>
      <div className="movie-info">
        <p>
          <span>⭐️</span>
          <span>{movieDetails.imdbRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movieDetails.Runtime}</span>
        </p>
        <p>
          <span>🗓</span>
          <span>{movieDetails.Year}</span>
        </p>
        <button className="watched-button">Add to Watched List</button>
      </div>
    </div>
  );
}
