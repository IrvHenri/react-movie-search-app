import React, { useState } from "react";
import Movie from "./Movie";
import "./index.css";

function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false `;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          type="text"
          className="input"
          placeholder="Search for movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      <section className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Movie movie={movie} />
          ))}
      </section>
    </div>
  );
}

export default SearchMovies;
