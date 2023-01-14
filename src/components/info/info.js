import React from "react";

import classes from "./info.module.css";

const Info = () => {
  return (
    <p className={classes.info}>
      You have selected <span>0</span> seats for a price of $<span>0</span>
    </p>
  );
};

export { Info };
