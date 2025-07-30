import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Box from "./components/Box";
import Main from "./Main";
import MovieList from "./components/MovieList";
import MoviePage from "./components/MoviePage";
import NavBar from "./components/NavBar";
import NumResults from "./components/NumResults";
import Search from "./components/Search";
import WatchedMovieList from "./components/WatchedMovieList";
import WatchedSummary from "./components/WatchedSummary";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);

  function handleAddToWatched(movie) {
    if (!watched.some((m) => m.imdbID === movie.imdbID)) {
      setWatched([...watched, movie]);
    }
  }

  useEffect(() => {
    async function fetchMovies() {
      if (!query) return;

      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
            );
            return await res.json();
          })
        );
        setMovies(detailedMovies);
      } else {
        setMovies([]);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar>
              <Search query={query} setQuery={setQuery} />
              <NumResults movies={movies} />
            </NavBar>

            <Main>
              <Box>
                <MovieList movies={movies} query={query} />
              </Box>

              <Box>
                <>
                  <WatchedSummary watched={watched} />
                  <WatchedMovieList watched={watched} />
                </>
              </Box>
            </Main>
          </>
        }
      />
      <Route
        path="/movie/:imdbId"
        element={
          <MoviePage onAddToWatched={handleAddToWatched} watched={watched} />
        }
      />
    </Routes>
  );
}
