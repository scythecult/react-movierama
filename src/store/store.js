import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "../features/movies/movies-slice";
import { seatsReducer } from "../features/seats/seats-slice";

const store = configureStore({
  reducer: {
    moviePicker: movieReducer,
    seats: seatsReducer,
  },
});

export { store };
