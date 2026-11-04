import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_GEOLOCATION } from '../../../../../mocks/data/geolocation';
import { MOCK_USER } from '../../../../../mocks/data/user';
import { ModalProvider } from '../../../shared/lib/modal';
import { AppStoreProvider } from '../../../shared/lib/store';
import { AppStore } from '../../store/AppStore';
import { Layout } from './Layout';

const getGeolocationMock = vi.fn().mockResolvedValue(MOCK_GEOLOCATION);
const getMeMock = vi.fn().mockResolvedValue(MOCK_USER);

vi.mock('../../../entities/locations/api', () => ({
  locationsQueries: {
    getCurrent: () => ({
      queryKey: ['geolocation'],
      queryFn: getGeolocationMock,
      initialData: {
        id: 0,
        name: '',
      },
    }),
    detectCurrent: () => ({
      queryKey: ['locations', 'detect'],
      queryFn: vi.fn().mockResolvedValue(null),
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

describe('Layout', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const renderLayout = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <AppStoreProvider store={AppStore}>
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
          </AppStoreProvider>
        </ModalProvider>
      </QueryClientProvider>,
    );
  };

  test('should correspond default layout', async () => {
    const { container } = renderLayout();

    // Ожидаем, пока все индикаторы загрузки (например, "Loading...") исчезнут с экрана.
    // Если ваши лоадеры в Layout называются иначе, замените текст 'Loading...' на актуальный.
    await waitForElementToBeRemoved(() => screen.queryAllByTestId('skeleton'));

    expect(container).toMatchSnapshot();
  });
});
