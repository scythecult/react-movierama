import clsx from 'clsx';
import { SEAT_STATE, SEAT_TYPE, SeatStateMap } from '@/client/lib/constants/common';
import type { PropsWithClassName } from '@/client/lib/types/PropsWithClassName';
import styles from './styles.module.css';

export type SeatProps = PropsWithClassName & {
  onClick?: () => void;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  type?: number;
  place?: number;
  state?: number;
};

export const Seat = (props: SeatProps) => {
  const { x, y, w, h, type = 1, state = 1, place, className, onClick } = props;
  const seatType = SEAT_TYPE[type];
  const seatState = SEAT_STATE[state];
  const isOccupied = seatState === SEAT_STATE[SeatStateMap.OCCUPIED];
  const isSelected = seatState === SEAT_STATE[SeatStateMap.SELECTED];
  const classNameFinal = clsx(styles.seat, className, styles[seatType], styles[seatState]);

  return (
    <button
      className={classNameFinal}
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
      }}
      onClick={onClick}
      type="button"
      disabled={isOccupied}
      data-test-id="seat"
      data-test-disabled={isOccupied}
      data-test-selected={isSelected}
    >
      <span className={styles.seatPlace} data-test-id="seat-place">
        {place}
      </span>
      <svg
        className={styles.seatIcon}
        fill="currentColor"
        width="18"
        height="20"
        viewBox="0 0 18 20"
        xmlns="http://www.w3.org/2000/svg"
        data-test-id="seat-icon"
      >
        <path d="M16.813 0c-.434 0-1.071.578-1.33.828l-.623.611a.572.572 0 0 1-.402.16.574.574 0 0 1-.402-.16l-.633-.613C12.998.416 12.293 0 11.769 0s-1.229.416-1.654.826l-.634.613a.578.578 0 0 1-.405.16.578.578 0 0 1-.405-.16L8.036.826C7.622.426 6.901 0 6.382 0c-.52 0-1.24.426-1.654.826l-.635.613a.579.579 0 0 1-.405.16.579.579 0 0 1-.405-.16L2.648.826C2.613.793 1.772 0 1.263 0 .683 0 .461.787.461 1.461V18.54c0 .674.221 1.461.802 1.461.49 0 1.279-.742 1.365-.825l.645-.614a.585.585 0 0 1 .409-.16c.155 0 .3.057.408.16l.636.613c.414.4 1.135.826 1.655.826s1.24-.426 1.655-.826l.635-.613a.578.578 0 0 1 .405-.16c.155 0 .299.057.405.16l.635.613c.414.4 1.135.826 1.654.826.52 0 1.24-.426 1.655-.826l.634-.613a.578.578 0 0 1 .405-.16c.155 0 .299.057.405.16l.635.613c.32.308.9.826 1.309.826.478 0 .726-.519.726-1.461V1.46c0-.94-.249-1.46-.726-1.46zm-3.018 15.023H9.593v-1.735h4.2v1.735zm0-4.201H4.296V9.178h9.497v1.644zm0-4.11H4.296V4.977h9.497v1.735z"></path>
      </svg>
    </button>
  );
};
