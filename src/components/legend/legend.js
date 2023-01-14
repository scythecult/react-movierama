import React from "react";
import { Seat } from "../seat/seat";

import classes from "./legend.module.css";

const Legend = () => {
  return (
    <ul className={classes.legend}>
      <li className={classes["legend__item"]}>
        <Seat disabled={true} />
        <small>N/A</small>
      </li>
      <li className={classes["legend__item"]}>
        <Seat disabled={true} selected={true} />
        <small>Selected</small>
      </li>
      <li className={classes["legend__item"]}>
        <Seat occupied={true} />
        <small>Occupied</small>
      </li>
    </ul>
  );
};

export { Legend };
