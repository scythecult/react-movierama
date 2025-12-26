import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_LOCATION } from '../../../../../mocks/data/location';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import { AppStoreProvider } from '../../contexts/app-store/AppStoreProvider';
import { Page } from './Page';

const queryClient = new QueryClient();

const buildWrappedComponent = () => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </AppStoreProvider>
  </QueryClientProvider>
);

vi.mock('../../api/location/hooks', () => ({
  useLocationQuery: () => ({
    data: { location: MOCK_LOCATION },
  }),

  useLocationMutation: () => ({
    mutate: vi.fn(),
  }),
}));

vi.mock('../../api/locations/hooks', () => ({
  useLocationsQuery: () => ({
    data: { locations: MOCK_LOCATIONS },
  }),
}));

describe('Page', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
