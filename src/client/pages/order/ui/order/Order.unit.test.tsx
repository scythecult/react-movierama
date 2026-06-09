import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_CANVAS_SIZE, MOCK_SEAT_TYPES, MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { Order } from './Order';

vi.mock('../../../../entities/hallplan/api', () => ({
  hallplanQueries: {
    getOne: vi.fn(),
  },
}));

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      isLoading: false,
      data: {
        seats: MOCK_SEATS_DATA,
        canvas: MOCK_CANVAS_SIZE,
        seatTypes: MOCK_SEAT_TYPES,
      },
    })),
  };
});

const buildWrappedComponent = () => {
  const queryClient = new QueryClient();

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
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
