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
          `https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`
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
      <h1 className="movie-title">{movie.Title}</h1>
      <div className="movie-info">
        <p>
          <span>⭐️</span>
          <span>movieDetails.imdbRating</span>
        </p>
        <p>
          <span>⏳</span>
          <span>movieDetails.Runtime</span>
        </p>
        <p>
          <span>🗓</span>
          <span>movieDetails.Year</span>
        </p>
      </div>
      <button className="watched-button">Add to Watched List</button>
    </div>
  );
}
