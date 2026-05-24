import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_GEOLOCATION } from '../../../../../mocks/data/geolocation';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import { ModalProvider } from '../../../shared/lib/modal';
import { AppStoreProvider } from '../../../shared/lib/store';
import { AppStore } from '../../store/AppStore';
import { Layout } from './Layout';

const getGeolocationMock = vi.fn().mockResolvedValue(MOCK_GEOLOCATION);
const getLocationsMock = vi.fn().mockResolvedValue(MOCK_LOCATIONS);

vi.mock('../../../entities/locations/api', () => ({
  locationsQueries: {
    getOne: () => ({
      queryKey: ['geolocation'],
      queryFn: getGeolocationMock,
    }),
    list: () => ({
      queryKey: ['locations'],
      queryFn: getLocationsMock,
    }),
  },

  useGeolocationMutation: () => ({
    mutate: vi.fn(),
  }),
}));

let queryClient: QueryClient;

const buildWrappedComponent = () => {
  queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AppStoreProvider store={AppStore}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </AppStoreProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
};

describe('Layout', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
