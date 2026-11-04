import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_CANVAS_SIZE, MOCK_SEAT_TYPES, MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { Order } from './Order';

const getHallplanMock = vi.fn().mockResolvedValue({
  seats: MOCK_SEATS_DATA,
  canvas: MOCK_CANVAS_SIZE,
  seatTypes: MOCK_SEAT_TYPES,
});

vi.mock('../../../../entities/hallplan/api', () => ({
  hallplanQueries: {
    getOne: () => ({
      queryKey: ['hallplan'],
      queryFn: getHallplanMock,
    }),
  },
}));

vi.mock('../../../../entities/locations/api', () => ({
  locationsQueries: {
    getCurrent: () => ({
      queryKey: ['location', 'current'],
      queryFn: vi.fn().mockResolvedValue({ id: 20, name: 'Ярославль' }),
      initialData: { id: 20, name: 'Ярославль' },
    }),
    detectCurrent: () => ({
      queryKey: ['location', 'detect'],
      queryFn: vi.fn().mockResolvedValue(null),
    }),
  },
}));

const buildWrappedComponent = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AppStoreProvider store={AppStore}>
        <BrowserRouter>
          <Order />
        </BrowserRouter>
      </AppStoreProvider>
    </QueryClientProvider>
  );
};

describe('Order', () => {
  test('should correspond default layout', async () => {
    const result = render(buildWrappedComponent());

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    expect(result.container).toMatchSnapshot();
  });
});
