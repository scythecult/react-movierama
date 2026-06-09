import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_GEOLOCATION } from '../../../../../../mocks/data/geolocation';
import { MOCK_LOCATIONS } from '../../../../../../mocks/data/locations';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { LocationsList, type LocationsListProps } from './LocationsList';

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

vi.mock('../../model/locations.hooks', () => ({
  useChangeLocation: () => vi.fn(),
}));

const DEFAULT_PROPS: LocationsListProps = {
  className: '',
};

let queryClient: QueryClient;

const buildWrappedComponent = (props: LocationsListProps = DEFAULT_PROPS) => {
  queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppStoreProvider store={AppStore}>
        <BrowserRouter>
          <LocationsList {...props} />
        </BrowserRouter>
      </AppStoreProvider>
    </QueryClientProvider>
  );
};

describe('LocationsList', () => {
  test('should correspond default layout', async () => {
    const result = render(buildWrappedComponent());

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', async () => {
    let result = render(buildWrappedComponent({ className: 'custom-class' }));

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ className: 'custom-class-v2' }));

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();
  });

  test('should not appear if there are no locations', async () => {
    getGeolocationMock.mockResolvedValueOnce(null);

    const result = render(buildWrappedComponent());

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();
  });
});
