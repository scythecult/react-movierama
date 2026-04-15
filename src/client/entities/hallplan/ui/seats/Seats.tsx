import type { JSX } from 'react';
import type { SeatData } from '../../model/types';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, SeatStateMap } from './const';
import { Seat } from './seat/Seat';
import styles from './styles.module.css';

export type SeatsProps = {
  seats: SeatData[];
  cart: SeatData[];
  onClick?: (seatId: number) => void;
  canvasWidth: number;
  canvasHeight: number;
  renderAddToCartButton?: (seatId: number) => JSX.Element;
};

export const Seats = (props: SeatsProps) => {
  const {
    seats,
    cart,
    canvasWidth = DEFAULT_CANVAS_WIDTH,
    canvasHeight = DEFAULT_CANVAS_HEIGHT,
    renderAddToCartButton,
  } = props;

  const seatNodes = seats.map((seatNode) => {
    const { id, state } = seatNode;
    const targetCartItem = cart.find((cartItem) => cartItem.id === id);

    let nextSeatState = state;

    if (targetCartItem && targetCartItem.id === id) {
      nextSeatState = SeatStateMap.SELECTED;
    } else {
      nextSeatState = SeatStateMap.FREE;
    }

    return <Seat key={id} {...seatNode} state={nextSeatState} actions={renderAddToCartButton?.(id)} />;
  });

  return (
    <div className={styles.canvas} style={{ width: canvasWidth, height: canvasHeight }} data-test-id="seats-container">
      {seatNodes}
    </div>
  );
};
