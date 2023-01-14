import { createSlice } from "@reduxjs/toolkit";
import { STORED_MOVIE_KEY } from "../../consts/consts";

const initialState = {
  selectedMovie: localStorage.getItem(STORED_MOVIE_KEY) || "",
  movies: [
    { title: "Avengers: Endgame", price: "10" },
    { title: "Joker", price: "12" },
    { title: "Toy Story 4", price: "8" },
    { title: "The Lion King", price: "9" },
    { title: "Matrix", price: "1" },
  ],
};

const movieSlice = createSlice({
  name: "moviePicker",
  initialState,
  reducers: {
    setPrice(state, action) {
      state.selectedMovie = action.payload.selectedMovie;
    },
  },
});

const { setPrice } = movieSlice.actions;
const movieReducer = movieSlice.reducer;

export { movieReducer, setPrice };
