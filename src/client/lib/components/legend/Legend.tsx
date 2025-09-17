import { Seat } from '../seat/Seat';
import styles from './styles.module.css';

export const Legend = () => {
  return (
    <ul className={styles.legend}>
      <li className={styles.legendItem}>
        <Seat isDisabled />
        <small>N/A</small>
      </li>
      <li className={styles.legendItem}>
        <Seat isDisabled isSelected />
        <small>Selected</small>
      </li>
      <li className={styles.legendItem}>
        <Seat isOccupied />
        <small>Occupied</small>
      </li>
    </ul>
  );
};
