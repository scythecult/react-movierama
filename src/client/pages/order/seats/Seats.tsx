import type { SeatData } from '../../../../common/types/hallplan';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, SeatStateMap } from '../../../lib/constants/common';
import { Seat } from './seat/Seat';
import styles from './styles.module.css';

export type SeatsProps = {
  seats: SeatData[];
  cart: SeatData[];
  onClick?: (seatId: number) => void;
  canvasWidth: number;
  canvasHeight: number;
};

export const Seats = (props: SeatsProps) => {
  const { seats, cart, canvasWidth = DEFAULT_CANVAS_WIDTH, canvasHeight = DEFAULT_CANVAS_HEIGHT, onClick } = props;

  const seatNodes = seats.map((seatNode) => {
    const { id, state } = seatNode;
    let nextSeatState = state;
    const targetCartItem = cart.find((cartItem) => cartItem.id === id);

    if (targetCartItem && targetCartItem.id === id) {
      nextSeatState = SeatStateMap.SELECTED;
    } else {
      nextSeatState = SeatStateMap.FREE;
    }

    return <Seat key={id} {...seatNode} state={nextSeatState} onClick={() => onClick?.(id)} />;
  });

  return (
    <div className={styles.canvas} style={{ width: canvasWidth, height: canvasHeight }} data-test-id="seats-container">
      {seatNodes}
    </div>
  );
};
