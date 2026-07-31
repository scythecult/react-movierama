import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_GEOLOCATION } from '../../../../../mocks/data/geolocation';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import { MOCK_USER } from '../../../../../mocks/data/user';
import { AppStore } from '../../../app/store/AppStore';
import { ModalProvider } from '../../../shared/lib/modal';
import { AppStoreProvider } from '../../../shared/lib/store';
import { Header, type HeaderProps } from './Header';

const getGeolocationMock = vi.fn().mockResolvedValue(MOCK_GEOLOCATION);
const getLocationsMock = vi.fn().mockResolvedValue(MOCK_LOCATIONS);
const getMeMock = vi.fn().mockResolvedValue(MOCK_USER);

vi.mock('../../../entities/locations/api', () => ({
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

vi.mock('../../../features/locations/model/locations.hooks', () => ({
  useChangeLocation: () => vi.fn(),
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

const DEFAULT_PROPS: HeaderProps = {
  className: '',
};

let queryClient: QueryClient;

const buildWrappedComponent = (props: HeaderProps = DEFAULT_PROPS) => {
  queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AppStoreProvider store={AppStore}>
          <BrowserRouter>
            <Header {...props} />
          </BrowserRouter>
        </AppStoreProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
};

describe('Header', () => {
  test('should correspond default layout', async () => {
    const result = render(buildWrappedComponent());

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', async () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class' }));

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class-v2' }));

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();
  });
});
