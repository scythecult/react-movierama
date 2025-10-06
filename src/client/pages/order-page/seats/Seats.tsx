import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from '@/client/lib/constants/common';
import type { SeatData } from '@/client/lib/types/OrderPageData';
import { Seat } from './seat/Seat';
import styles from './styles.module.css';

export type SeatsProps = {
  seats: SeatData[];
  onClick?: (id: number) => void;
  canvasWidth: number;
  canvasHeight: number;
};

export const Seats = (props: SeatsProps) => {
  const { seats, canvasWidth = DEFAULT_CANVAS_WIDTH, canvasHeight = DEFAULT_CANVAS_HEIGHT, onClick } = props;

  const seatNodes = seats.map((seatNode) => {
    const { id } = seatNode;

    return <Seat key={id} {...seatNode} onClick={() => onClick?.(id)} />;
  });

  return (
    <div className={styles.canvas} style={{ width: canvasWidth, height: canvasHeight }}>
      {seatNodes}
    </div>
  );
};
