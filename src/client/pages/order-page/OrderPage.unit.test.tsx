import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { canvasSize, seatsData, staticSeatTypes } from '../../../server/service/serverMockData';
import { AppStoreProvider } from '../../lib/contexts/app-store/AppStoreProvider';
import { OrderPage } from './OrderPage';

const queryClient = new QueryClient();
const buildWrappedComponent = () => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider>
      <OrderPage />
    </AppStoreProvider>
  </QueryClientProvider>
);

vi.mock('../../lib/api/hallplan/hooks.ts', () => ({
  useHallplanQuery: () => ({
    data: {
      seats: seatsData,
      canvas: canvasSize,
      seatTypes: staticSeatTypes,
    },
  }),
}));

describe('OrderPage', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
