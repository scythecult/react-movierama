import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleActive } from "../../features/seats/seats-slice";
import { Seat } from "../seat/seat";

import classes from "./seats.module.css";

let rowKey = 100;

const Seats = () => {
  const { seatsData } = useSelector((state) => state.seats);
  const dispatch = useDispatch();

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
