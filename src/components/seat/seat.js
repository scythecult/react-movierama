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

  return (
    <button
      className={`${classes.seat} ${modifierClass}`}
      onClick={onClick}
      type="button"
      disabled={isOccupied}></button>
  );
};

export { Seat };
