import type { ChangeEvent } from 'react';
import { STORED_MOVIE_KEY } from '../../constants/common';
import styles from './styles.module.css';

const movies = [
  { title: 'Avengers: Endgame', price: '10' },
  { title: 'Joker', price: '12' },
  { title: 'Toy Story 4', price: '8' },
  { title: 'The Lion King', price: '9' },
  { title: 'Matrix', price: '1' },
];

export const MoviePicker = () => {
  const selectedMovie = localStorage.getItem(STORED_MOVIE_KEY) || '';

  const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const movieTitle = evt.target.value;
    const selectedMovie = movies.find((movie) => movie.title === movieTitle);

    localStorage.setItem(STORED_MOVIE_KEY, JSON.stringify(selectedMovie));
  };

  return (
    <div className={styles.moviePicker}>
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
