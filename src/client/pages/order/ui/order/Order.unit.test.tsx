import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_CANVAS_SIZE, MOCK_SEAT_TYPES, MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/zustand/AppStoreProvider';
import { Order } from './Order';

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

vi.mock('../../../../entities/hallplan/api', () => ({
  useHallplanQuery: () => ({
    data: {
      seats: MOCK_SEATS_DATA,
      canvas: MOCK_CANVAS_SIZE,
      seatTypes: MOCK_SEAT_TYPES,
    },
    isLoading: false,
  }),
}));

describe('Order', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
