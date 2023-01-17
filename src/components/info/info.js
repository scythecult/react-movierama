import React from "react";
import { useSelector } from "react-redux";

import classes from "./info.module.css";

const calculatePrice = (price, seats) => {
  const { selectedMovie } = price;
  const selectedCount = calculateSelected(seats);

  return Number(selectedMovie.price) * selectedCount;
};

const calculateSelected = (seats) => {
  if (seats?.seatsData) {
    return seats.seatsData.reduce((initial, rows) => {
      const selected = rows.filter((seat) => seat.isSelected);

      return (initial += selected.length);
    }, 0);
  }

  return 0;
};

const Info = () => {
  const { moviePicker, seats } = useSelector((state) => state);
  const selectedCount = calculateSelected(seats);

  const totalPrice = calculatePrice(moviePicker, seats);

  return (
    <p className={classes.info}>
      You have selected <span>{selectedCount}</span> seats for a&nbsp;price&nbsp;of
      <span> ${totalPrice}</span>
    </p>
  );
};

export { Info };
