import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function MoviePage() {
  const { imdbId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbId}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [imdbId]);

  if (!movie) return <div className="movie-page-container">Loading...</div>;

  return (
    <div className="movie-page-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <img className="movie-poster" src={movie.Poster} alt={movie.Title} />

      <div className="movie-info">
        <h1 className="movie-title">{movie.Title}</h1>

        <div className="movie-meta">
          <span>⭐ {movie.imdbRating}</span>
          <span>⏱️ {movie.Runtime}</span>
          <span>📅 {movie.Year}</span>
        </div>

        <button className="add-button">Add to Watched List</button>
      </div>
    </div>
  );
}
