import type { ChangeEvent } from 'react';
import { Button } from '@/client/lib/components/button/Button';
import { SEAT_TYPE } from '@/client/lib/constants/common';
import type { CartItem } from '@/client/lib/types/OrderPageData';
import styles from './styles.module.css';

export type PreCheckProps = {
  cart: CartItem[];
  onTicketTypeChange: (payload: CartItem) => void;
  onRemoveSeatClick: (id: number) => void;
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
      <li className={styles.preCheckItem} key={id}>
        <p>
          {row} row, {place} place
        </p>
        <p>{seatTypeName}</p>

        <div className={styles.preCheckItemControls}>
          <select
            className={styles.preCheckItemSelect}
            name="ticket-type"
            defaultValue={ticketTypeId}
            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
              const ticketTypeId = Number(evt.target.value);

              onTicketTypeChange({ ...cartItem, ticketTypeId });
            }}
          >
            {ticketTypes.map((ticketType) => {
              const { id, name } = ticketType;

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
          <span>{price} RUB</span>
          <Button className={styles.preCheckItemRemoveButton} onClick={() => onRemoveSeatClick(id)}>
            Remove
          </Button>
        </div>
      </li>
    );
  });

  return (
    <section className={styles.preCheck}>
      <h2 className={styles.preCheckTitle}>Chosen places</h2>
      <ul className={styles.preCheckList}>{selectedSeatNodes}</ul>
    </section>
  );
};
