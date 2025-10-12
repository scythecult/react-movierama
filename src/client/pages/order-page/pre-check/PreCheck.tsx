import type { ChangeEvent } from 'react';
import { Button } from '@/client/lib/components/button/Button';
import { SEAT_TYPE } from '@/client/lib/constants/common';
import type { CartItem } from '@/client/lib/types/OrderPageData';
import styles from './styles.module.css';

export type PreCheckProps = {
  cart: CartItem[];
  onTicketTypeChange: (seatId: number, ticketTypeId: number) => void;
  onRemoveSeatClick: (seatId: number, ticketTypeId: number) => void;
};

export const PreCheck = (props: PreCheckProps) => {
  const { cart, onRemoveSeatClick, onTicketTypeChange } = props;

  if (cart.length === 0) {
    return null;
  }

  const selectedSeatNodes = cart.map((cartItem) => {
    const { id, place, row, type, seatType, price, ticketTypeId } = cartItem;
    const { ticketTypes = [] } = seatType;
    const seatTypeName = SEAT_TYPE[type];

    return (
      <li className={styles.preCheckItem} key={id} data-test-id="pre-check-item">
        <p data-test-id="pre-check-item-place">
          {row} row, {place} place
        </p>
        <p data-test-id="pre-check-item-seat-type">{seatTypeName}</p>

        <div className={styles.preCheckItemControls} data-test-id="pre-check-item-controls">
          <select
            className={styles.preCheckItemSelect}
            name="ticket-type"
            defaultValue={ticketTypeId}
            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
              const ticketTypeId = Number(evt.target.value);

              onTicketTypeChange(id, ticketTypeId);
            }}
            data-test-id="pre-check-item-select"
            data-test-value={ticketTypeId}
          >
            {ticketTypes.map((ticketType) => {
              const { id, name } = ticketType;

              return (
                <option key={id} value={id} data-test-id="pre-check-item-select-option" data-test-value={name}>
                  {name}
                </option>
              );
            })}
          </select>
          <span data-test-id="pre-check-item-price">{price} RUB</span>
          <Button
            className={styles.preCheckItemRemoveButton}
            onClick={() => onRemoveSeatClick(id, ticketTypeId)}
            data-test-id="pre-check-remove-button"
          >
            Remove
          </Button>
        </div>
      </li>
    );
  });

  return (
    <section className={styles.preCheck} data-test-id="pre-check">
      <h2 className={styles.preCheckTitle} data-test-id="pre-check-title">
        Chosen places
      </h2>
      <ul className={styles.preCheckList} data-test-id="pre-check-list">
        {selectedSeatNodes}
      </ul>
    </section>
  );
};
