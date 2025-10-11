import { SeatStateMap } from '@/client/lib/constants/common';
import type { SeatType } from '@/client/lib/types/OrderPageData';
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

    return (
      <li className={styles.legendItem} key={id} data-test-id="legend-item">
        <Seat className={styles.legendItemSeat} type={id} />
        <div className={styles.legendItemWrap} data-test-id="legend-item-wrap">
          <small className={styles.legendItemName} data-test-id="legend-item-name">
            {name}
          </small>
          <small className={styles.legendItemPrice} data-test-id="legend-item-price">
            {defaultTicketType.price} RUB
          </small>
        </div>
      </li>
    );
  });

  return (
    <ul className={styles.legend} data-test-id="legend">
      {seatTypeNodes}
      <li className={styles.legendItem} data-test-id="legend-item">
        <Seat className={styles.legendItemSeat} state={SeatStateMap.FREE} />
        <small className={styles.legendItemName} data-test-id="legend-item-name">
          N/A
        </small>
      </li>
      <li className={styles.legendItem} data-test-id="legend-item">
        <Seat className={styles.legendItemSeat} state={SeatStateMap.SELECTED} />
        <small className={styles.legendItemName} data-test-id="legend-item-name">
          Selected
        </small>
      </li>
      <li className={styles.legendItem} data-test-id="legend-item">
        <Seat className={styles.legendItemSeat} state={SeatStateMap.OCCUPIED} />
        <small className={styles.legendItemName} data-test-id="legend-item-name">
          Occupied
        </small>
      </li>
    </ul>
  );
};
