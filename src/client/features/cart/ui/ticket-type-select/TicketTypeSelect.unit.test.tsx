import { fireEvent, render, screen } from '@testing-library/react';
import { MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { TicketTypeSelect } from './TicketTypeSelect';

const seat = MOCK_SEATS_DATA[0];
const [adultTicket, childTicket] = seat.seatType.ticketTypes;

const renderSelect = () => {
  render(
    <AppStoreProvider store={AppStore}>
      <TicketTypeSelect seatId={seat.id} ticketTypeId={adultTicket.id} ticketTypes={seat.seatType.ticketTypes} />
    </AppStoreProvider>,
  );
};

describe('TicketTypeSelect', () => {
  beforeEach(() => {
    AppStore.setState({
      cart: [seat],
      cartTotalPrice: seat.price,
    });
  });

  test('should update the seat price when the ticket type changes', () => {
    renderSelect();

    fireEvent.change(screen.getByRole('combobox'), { target: { value: String(childTicket.id) } });

    const updatedSeat = AppStore.getState().cart[0];

    expect(updatedSeat.ticketTypeId).toBe(childTicket.id);
    expect(updatedSeat.price).toBe(childTicket.price);
    expect(AppStore.getState().cartTotalPrice).toBe(childTicket.price);
  });
});
