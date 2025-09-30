import { type ChangeEvent } from 'react';
import { Button } from '@/client/lib/components/button/Button';
import type { SelectedSeat } from '@/client/lib/types/OrderData';
import styles from './styles.module.css';

export type PreCheckProps = {
  selectedSeats: SelectedSeat[];
  onTicketTypeChange: (payload: SelectedSeat) => void;
  onRemoveSeatClick: (payload: SelectedSeat) => void;
}

export const PreCheck = (props: PreCheckProps) => {
  const { selectedSeats, onRemoveSeatClick, onTicketTypeChange } = props;

  if (selectedSeats.length === 0) {
    return null;
  }

  const selectedSeatNodes = selectedSeats.map((seat) => {
      const { id, place, type, seatType, price, ticketTypeId } = seat;
      const { ticketTypes } = seatType;

      return <li className={styles.preCheckItem} key={id}>
        <p>Place: {place}</p>
        <p>{type}</p>

        <div className={styles.preCheckItemControls}>
          <select className={styles.preCheckItemSelect} name="ticket-type" defaultValue={ticketTypeId}
                  onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                    const ticketTypeId = Number(evt.target.value);

                    onTicketTypeChange({ ...seat, ticketTypeId });
                  }}>
            {ticketTypes.map((ticketType) => {
                const { id, name } = ticketType;

                return <option key={id} value={id}>{name}</option>;
              },
            )}

          </select>
          <span>{price} RUB</span>
          <Button className={styles.preCheckItemRemoveButton}
                  onClick={() => onRemoveSeatClick({ ...seat, isSelected: !seat.isSelected })}>Remove
          </Button>
        </div>
      </li>;
    },
  );

  return <section className={styles.preCheck}>
    <h2 className={styles.preCheckTitle}>Chosen places</h2>
    <ul className={styles.preCheckList}>
      {selectedSeatNodes}
    </ul>
  </section>;
};