import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MOCK_CANVAS_SIZE, MOCK_SEAT_TYPES, MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { createTestQueryClient } from '../../../../../tests/unit/helpers';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { Order } from './Order';

const orderApi = vi.hoisted(() => ({
  hallplan: vi.fn(),
  currentLocation: vi.fn(),
  detectLocation: vi.fn(),
}));

vi.mock('../../../../entities/hallplan/api', () => ({
  hallplanQueries: {
    getOne: (locationId?: number) => ({
      queryKey: ['hallplan', locationId ?? null],
      queryFn: () => orderApi.hallplan(locationId),
      enabled: typeof locationId === 'number' && locationId > 0,
    }),
  },
}));

vi.mock('../../../../entities/locations/api', () => ({
  locationsQueries: {
    current: () => ['location', 'current'],
    getCurrent: () => ({
      queryKey: ['location', 'current'],
      queryFn: orderApi.currentLocation,
    }),
    detectCurrent: () => ({
      queryKey: ['location', 'detect'],
      queryFn: orderApi.detectLocation,
    }),
  },
}));

const yaroslavl = { id: 20, name: 'Ярославль' };
const hallplan = {
  seats: MOCK_SEATS_DATA,
  canvas: MOCK_CANVAS_SIZE,
  seatTypes: MOCK_SEAT_TYPES,
};

const renderOrder = () => {
  return render(
    <QueryClientProvider client={createTestQueryClient()}>
      <AppStoreProvider store={AppStore}>
        <MemoryRouter>
          <Order />
        </MemoryRouter>
      </AppStoreProvider>
    </QueryClientProvider>,
  );
};

describe('Order', () => {
  const seat = MOCK_SEATS_DATA[0];
  const [adultTicket, childTicket] = seat.seatType.ticketTypes;

  beforeEach(() => {
    AppStore.setState({ cart: [], cartTotalPrice: 0 });
    orderApi.hallplan.mockReset();
    orderApi.currentLocation.mockReset();
    orderApi.detectLocation.mockReset();
    orderApi.detectLocation.mockResolvedValue(null);
  });

  test('should keep loading while the hall plan is requested', async () => {
    orderApi.currentLocation.mockResolvedValue(yaroslavl);
    orderApi.hallplan.mockImplementation(() => new Promise(() => {}));

    renderOrder();

    await waitFor(() => {
      expect(orderApi.hallplan).toHaveBeenCalledWith(yaroslavl.id);
    });

    expect(screen.getByText('Loading...')).toBeTruthy();
    expect(screen.queryByTestId('order-page')).toBeNull();
  });

  test('should ask for a location when none is selected', async () => {
    orderApi.currentLocation.mockResolvedValue({ id: 0, name: '' });

    renderOrder();

    expect(await screen.findByText('Choose a location to see the hall plan')).toBeTruthy();
    expect(orderApi.hallplan).not.toHaveBeenCalled();
  });

  test('should show an error when the hall plan request fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    orderApi.currentLocation.mockResolvedValue(yaroslavl);
    orderApi.hallplan.mockRejectedValue(new Error('unavailable'));

    renderOrder();

    expect(await screen.findByText('Hall plan is unavailable')).toBeTruthy();
  });

  test('should add, reprice, remove, and clear a seat', async () => {
    orderApi.currentLocation.mockResolvedValue(yaroslavl);
    orderApi.hallplan.mockResolvedValue(hallplan);

    renderOrder();

    await screen.findByTestId('order-page');

    const paymentButton = screen.getByTestId('cart-payment-button');

    expect(paymentButton.textContent).toBe('Select seats');
    expect(paymentButton.getAttribute('data-test-disabled')).toBe('true');
    expect(screen.queryByRole('button', { name: 'Clear cart' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Chosen places' })).toBeNull();

    const hall = screen.getByTestId('seats-container');

    fireEvent.click(within(hall).getAllByTestId('seat-icon')[0].closest('button')!);

    expect(within(hall).getAllByTestId('seat')[0].getAttribute('data-test-selected')).toBe('true');
    expect(screen.getByText(`${seat.row} row, ${seat.place} place`)).toBeTruthy();
    expect(screen.getByTestId('cart-price').textContent).toBe(`${adultTicket.price} RUB`);
    expect(screen.getByTestId('cart-payment-button').textContent).toBe(`Proceed to payment: ${adultTicket.price} RUB`);

    fireEvent.change(screen.getByTestId('ticket-type-select'), { target: { value: String(childTicket.id) } });

    expect(screen.getByTestId('cart-price').textContent).toBe(`${childTicket.price} RUB`);
    expect(screen.getByTestId('cart-payment-button').textContent).toBe(`Proceed to payment: ${childTicket.price} RUB`);

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

    expect(screen.queryByRole('heading', { name: 'Chosen places' })).toBeNull();
    expect(within(hall).getAllByTestId('seat')[0].getAttribute('data-test-selected')).toBe('false');
    expect(screen.getByTestId('cart-payment-button').textContent).toBe('Select seats');

    fireEvent.click(within(hall).getAllByTestId('seat-icon')[0].closest('button')!);
    fireEvent.click(screen.getByRole('button', { name: 'Clear cart' }));

    expect(screen.queryByRole('heading', { name: 'Chosen places' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Clear cart' })).toBeNull();
    expect(screen.getByTestId('cart-payment-button').textContent).toBe('Select seats');
  });
});
