import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import StarRating from "./StarRating.jsx";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function MoviePage({
  onAddToWatched,
  watched,
  userRating,
  onSetUserRating,
}) {
  const { imdbID } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [imdbID]);

  useEffect(() => {
    if (!movie) return;

    const watchedMovie = watched.find((m) => m.imdbID === movie.imdbID);

    if (
      watchedMovie &&
      userRating?.[movie.imdbID] !== watchedMovie.userRating
    ) {
      onSetUserRating(movie.imdbID, watchedMovie.userRating);
    }
  }, [movie, watched, onSetUserRating, userRating]);

  if (!movie) return <div className="movie-page-container">Loading...</div>;

  let alreadyWatched = watched.some((m) => m.imdbID === movie.imdbID);

  const rating = userRating?.[imdbID] ?? 0;

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
        <StarRating
          defaultRating={rating}
          onSetRating={(rating) => onSetUserRating(imdbID, rating)}
        />
        <button
          className="add-button"
          onClick={() => {
            if (rating !== 0) {
              onAddToWatched({ ...movie, userRating: rating });
            }
          }}
          disabled={alreadyWatched || rating === 0}
        >
          {alreadyWatched ? "Already Watched " : "Add to Watched List"}
        </button>
      </div>
    </div>
  );
}
