import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { STORED_MOVIE_KEY } from "../../consts/consts";
import { setPrice } from "../../features/movies/movies-slice";
import classes from "./movie-picker.module.css";

const MoviePicker = () => {
  const { movies, selectedMovie } = useSelector((state) => state.moviePicker);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const movieTitle = evt.target.value;

    dispatch(setPrice({ selectedMovie: movieTitle }));
    localStorage.setItem(STORED_MOVIE_KEY, movieTitle);
  };

  return (
    <div className={classes["movie-picker"]}>
      <label htmlFor="movie">Pick a&nbsp;movie:</label>
      <select id="movie" value={selectedMovie} onChange={handleChange}>
        {movies.map((movie) => {
          const { title, price } = movie;
          return (
            <option key={title} value={title}>
              {title} (${price})
            </option>
          );
        })}
      </select>
    </div>
  );
};

export { MoviePicker };
