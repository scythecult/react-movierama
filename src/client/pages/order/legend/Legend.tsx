import type { SeatType } from '@/client/lib/types/OrderData';
import { Seat } from '../seats/seat/Seat';
import styles from './styles.module.css';

export type LegendProps = {
  seatTypes: SeatType[];
};

export const Legend = (props: LegendProps) => {
  const { seatTypes } = props;

  const seatTypeNodes = seatTypes.map((seatType) => {
    const { id, name, ticketTypes } = seatType;
    const [defaultTicketType] = ticketTypes;

    return <li className={styles.legendItem} key={id}>
      <Seat className={styles.legendItemSeat} type={name} />
      <div className={styles.legendItemWrap}>
        <small className={styles.legendItemName}>{name}</small>
        <small className={styles.legendItemPrice}>{defaultTicketType.price} RUB</small>
      </div>
    </li>;
  });

  return (
    <ul className={styles.legend}>
      {seatTypeNodes}
      <li className={styles.legendItem}>
        <Seat className={styles.legendItemSeat} isDisabled />
        <small className={styles.legendItemName}>N/A</small>
      </li>
      <li className={styles.legendItem}>
        <Seat className={styles.legendItemSeat} isDisabled isSelected />
        <small className={styles.legendItemName}>Selected</small>
      </li>
      <li className={styles.legendItem}>
        <Seat className={styles.legendItemSeat} isOccupied />
        <small className={styles.legendItemName}>Occupied</small>
      </li>
    </ul>
  );
};
