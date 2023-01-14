import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "../features/movies/movies-slice";

const store = configureStore({
  reducer: {
    moviePicker: movieReducer,
  },
});

export { store };
