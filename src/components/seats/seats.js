import React from "react";

import classes from "./seats.module.css";

const Seats = ({ children, rows }) => {
  return <div className={classes.seats}>{children}</div>;
};

export { Seats };
