import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STORED_SEATS_KEY } from "../../consts/consts";
import { toggleActive } from "../../features/seats/seats-slice";
import { Seat } from "../seat/seat";

import classes from "./seats.module.css";

let rowKey = 100;

const Seats = () => {
  const { seatsData } = useSelector((state) => state.seats);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedSeats = JSON.parse(localStorage.getItem(STORED_SEATS_KEY));

    if (storedSeats?.length) {
      dispatch(toggleActive({ ids: storedSeats }));
    }
  }, [dispatch]);

  useEffect(() => {
    const selectedSeats = seatsData.reduce((initial, seat) => {
      const selectedIds = seat.filter((item) => item.isSelected).map((item) => item.id);

      initial.push(...selectedIds);

      return initial;
    }, []);

    localStorage.setItem(STORED_SEATS_KEY, JSON.stringify(selectedSeats));
  }, [seatsData]);

  const seats = seatsData.map((seat) => {
    const cols = [];

    for (let i = 0; i < seat.length; i++) {
      const { id } = seat[i];

      cols.push(<Seat key={id} {...seat[i]} onClick={() => dispatch(toggleActive({ id }))} />);
    }

    return (
      <div key={rowKey++} className={classes.seats}>
        {cols}
      </div>
    );
  });

  return seats;
};

export { Seats };
