import React from "react";
import { Seat } from "../seat/seat";

import classes from "./seats.module.css";

let colKey = 200;
let rowKey = 100;

const Seats = ({ rowCount, colCount }) => {
  const cols = [];
  const rows = [];

  for (let i = 0; i < colCount; i++) {
    cols.push(<Seat key={colKey++} />);
  }

  for (let j = 0; j < rowCount; j++) {
    rows.push(
      <div key={rowKey++} className={classes.seats}>
        {cols}
      </div>
    );
  }

  return rows;
};

export { Seats };
