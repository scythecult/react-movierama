import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { canvasSize, seatsData, staticSeatTypes } from '../../../server/services/serverMockData';
import { AppStoreProvider } from '../../lib/contexts/app-store/AppStoreProvider';
import { Order } from './Order';

const queryClient = new QueryClient();
const buildWrappedComponent = () => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider>
      <BrowserRouter>
        <Order />
      </BrowserRouter>
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

describe('Order', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
