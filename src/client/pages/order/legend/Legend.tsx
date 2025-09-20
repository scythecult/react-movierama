import { Seat } from '../seats/seat/Seat';
import styles from './styles.module.css';

export const Legend = () => {
  return (
    <ul className={styles.legend}>
      <li className={styles.legendItem}>
        <Seat className={styles.legendItemSeat} isDisabled />
        <small>N/A</small>
      </li>
      <li className={styles.legendItem}>
        <Seat className={styles.legendItemSeat} isDisabled isSelected />
        <small>Selected</small>
      </li>
      <li className={styles.legendItem}>
        <Seat className={styles.legendItemSeat} isOccupied />
        <small>Occupied</small>
      </li>
    </ul>
  );
};
