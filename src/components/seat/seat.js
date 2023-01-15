import React from "react";
import { useDispatch } from "react-redux";
import { toggleActive } from "../../features/seats/seats-slice";

import classes from "./seat.module.css";

const Seat = ({ id, isSelected, isOccupied, isDisabled = false }) => {
  const dispatch = useDispatch();

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

  const handleClick = () => {
    dispatch(toggleActive({ id }));
  };

  return <div className={`${classes.seat} ${modifierClass}`} onClick={handleClick}></div>;
};

export { Seat };
