import type { SeatData } from '@/client/lib/types/OrderData';
import { Seat } from './seat/Seat';
import styles from './styles.module.css';

let rowKey = 100;

type SeatsProps = {
  seats: SeatData[][];
  onClick?: (seatId: string, isSelected: boolean) => void;
};

export const Seats = (props: SeatsProps) => {
  const { seats, onClick } = props;

  //   const selectedSeats = seatsData.reduce<string[]>((initial, seat) => {
  //     const selectedIds = seat.filter((item) => item.isSelected).map((item) => item.id);

  //     initial.push(...selectedIds);

  //     return initial;
  //   }, []);

  //   localStorage.setItem(STORED_SEATS_KEY, JSON.stringify(selectedSeats));
  // }, []);

  const seatNodes = seats.map((seat) => {
    const rows = [];

    for (let i = 0; i < seat.length; i++) {
      const { id } = seat[i];

      rows.push(<Seat key={id} {...seat[i]} onClick={() => onClick?.(id, seat[i].isSelected)} />);
    }

    return (
      <div key={rowKey++} className={styles.seatsRow}>
        {rows}
      </div>
    );
  });

  return <div className={styles.seats}>{seatNodes}</div>;
};
