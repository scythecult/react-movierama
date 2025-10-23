import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { canvasSize, seatsData, staticSeatTypes } from '../../../../server/service/serverMockData';
import { AppStoreProvider } from '../../contexts/app-store/AppStoreProvider';
import { App } from './App';

const queryClient = new QueryClient();
const buildWrappedComponent = () => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider>
      <App />
    </AppStoreProvider>
  </QueryClientProvider>
);

vi.mock('../../api/hallplan/hooks.ts', () => ({
  useHallplanQuery: () => ({
    data: {
      seats: seatsData,
      canvas: canvasSize,
      seatTypes: staticSeatTypes,
    },
  }),
}));

describe('App', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
