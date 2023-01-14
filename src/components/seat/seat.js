import React, { useEffect, useState } from "react";

import classes from "./seat.module.css";

const Seat = ({ selected, occupied, disabled = false }) => {
  const [isActive, setIsActive] = useState(false);
  let modifierClass = "";

  if (selected || (isActive && !occupied && !disabled)) {
    modifierClass = classes.selected;
  }

  if (occupied) {
    modifierClass = `${classes.occupied} ${classes.disabled}`;
  }

  if (disabled) {
    modifierClass += ` ${classes.disabled}`;
  }

  return (
    <div
      className={`${classes.seat} ${modifierClass}`}
      onClick={() => {
        setIsActive((prevIsActive) => !prevIsActive);
      }}></div>
  );
};

export { Seat };
