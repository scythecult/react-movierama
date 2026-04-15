import clsx from 'clsx';
import type { JSX } from 'react';
import { SEAT_STATE, SEAT_TYPE, SeatStateMap, SeatTypeMap } from '../const';
import styles from './styles.module.css';

export type SeatProps = PropsWithClassName<{
  onClick?: () => void;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  type?: number;
  place?: number;
  state?: number;
  actions?: JSX.Element;
}>;

export const Seat = (props: SeatProps) => {
  const { x, y, w, h, type = 1, state = 1, place, className, actions } = props;
  const seatType = SEAT_TYPE[type];
  const seatState = SEAT_STATE[state];
  const isOccupied = seatType === SEAT_TYPE[SeatTypeMap.OCCUPIED];
  const isSelected = seatState === SEAT_STATE[SeatStateMap.SELECTED];
  const classNameFinal = clsx(styles.seat, className, styles[seatType], styles[seatState]);

  return (
    <div
      className={classNameFinal}
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
      }}
      data-test-id="seat"
      data-test-disabled={isOccupied}
      data-test-selected={isSelected}
    >
      <span className={styles.seatPlace} data-test-id="seat-place">
        {place}
      </span>

      {actions && <span className={styles.seatAddToCart}>{actions}</span>}
    </div>
  );
};
