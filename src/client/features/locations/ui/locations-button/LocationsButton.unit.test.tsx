import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_GEOLOCATION } from '../../../../../../mocks/data/geolocation';
import { MOCK_LOCATIONS } from '../../../../../../mocks/data/locations';
import { AppStore } from '../../../../app/store/AppStore';
import { ModalProvider } from '../../../../shared/lib/modal';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { LocationsButton } from './LocationsButton';

const getGeolocationMock = vi.fn().mockResolvedValue(MOCK_GEOLOCATION);
const getLocationsMock = vi.fn().mockResolvedValue(MOCK_LOCATIONS);

vi.mock('../../../../entities/locations/api', () => ({
  locationsQueries: {
    getOne: () => ({
      queryKey: ['locations', 'one'],
      queryFn: getGeolocationMock,
    }),
    list: () => ({
      queryKey: ['locations', 'list'],
      queryFn: getLocationsMock,
    }),
  },
}));

vi.mock('../../../../shared/lib/modal', async () => {
  const actual = await import('../../../../shared/lib/modal');

  return { ...actual, useRenderModal: () => vi.fn() };
});

vi.mock('../../model/locations.hooks', () => ({
  useChangeLocation: () => vi.fn(),
}));

let queryClient: QueryClient;

const buildWrappedComponent = () => {
  queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <BrowserRouter>
          <AppStoreProvider store={AppStore}>
            <LocationsButton />
          </AppStoreProvider>
        </BrowserRouter>
      </ModalProvider>
    </QueryClientProvider>
  );
};

describe('LocationsButton', () => {
  test('should correspond default layout', async () => {
    const result = render(buildWrappedComponent());

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result).toMatchSnapshot();
  });
});
