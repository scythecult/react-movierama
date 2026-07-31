import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_GEOLOCATION } from '../../../../../mocks/data/geolocation';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import { MOCK_USER } from '../../../../../mocks/data/user';
import { ModalProvider } from '../../../shared/lib/modal';
import { AppStoreProvider } from '../../../shared/lib/store';
import { AppStore } from '../../store/AppStore';
import { Layout } from './Layout';

const getGeolocationMock = vi.fn().mockResolvedValue(MOCK_GEOLOCATION);
const getLocationsMock = vi.fn().mockResolvedValue(MOCK_LOCATIONS);
const getMeMock = vi.fn().mockResolvedValue(MOCK_USER);

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
}));

vi.mock('../../../entities/auth/api', () => ({
  authQueries: {
    getOne: () => ({
      queryKey: ['auth', 'one'],
      queryFn: getMeMock,
      initialData: {
        id: 0,
        phone: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        wantsPromotions: false,
      },
    }),
  },
}));

vi.mock('../../../features/auth/model/auth.hooks', () => ({
  useSignIn: () => vi.fn(),
  useSignOut: () => vi.fn(),
}));

vi.mock('../../../features/locations/model/locations.hooks', () => ({
  useChangeLocation: () => vi.fn(),
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
