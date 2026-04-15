import type { ChangeEvent } from 'react';
import type { TicketType } from '../../../../entities/cart/model';
import { useAppStore } from '../../../../shared/zustand/useAppStore';
import styles from './styles.module.css';

type TicketTypeSelectProps = {
  seatId: number;
  ticketTypeId: number;
  ticketTypes: TicketType[];
};

export const TicketTypeSelect = (props: TicketTypeSelectProps) => {
  const { seatId, ticketTypeId, ticketTypes } = props;
  const updateCartTicketType = useAppStore((state) => state.updateCartTicketType);

  const handleTicketTypeChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const ticketTypeId = Number(evt.target.value);

    updateCartTicketType(seatId, ticketTypeId);
  };

  return (
    <select
      className={styles.ticketTypeSelect}
      name="ticket-type"
      defaultValue={ticketTypeId}
      onChange={handleTicketTypeChange}
      data-test-id="ticket-type-select"
      data-test-value={ticketTypeId}
    >
      {ticketTypes.map((ticketType) => {
        const { id, name } = ticketType;

        return (
          <option key={id} value={id} data-test-id="ticket-type-select-option" data-test-value={name}>
            {name}
          </option>
        );
      })}
    </select>
  );
};
