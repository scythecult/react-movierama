import React from "react";

import classes from "./seat.module.css";

const Seat = ({ onClick, isSelected, isOccupied, isDisabled = false }) => {
  let modifierClass = "";

  if (isSelected) {
    modifierClass = classes.selected;
  }

  if (isOccupied) {
    modifierClass = `${classes.occupied} ${classes.disabled}`;
  }

  if (isDisabled) {
    modifierClass += ` ${classes.disabled}`;
  }

  return <div className={`${classes.seat} ${modifierClass}`} onClick={onClick}></div>;
};

export { Seat };
