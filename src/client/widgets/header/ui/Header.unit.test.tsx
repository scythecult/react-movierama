import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_GEOLOCATION } from '../../../../../mocks/data/geolocation';
import { AppStore } from '../../../app/store/AppStore';
import { ModalProvider } from '../../../shared/lib/modal';
import { AppStoreProvider } from '../../../shared/lib/store';
import { Header, type HeaderProps } from './Header';

const DEFAULT_PROPS: HeaderProps = {
  className: '',
};

vi.mock('../../../entities/locations/api/locations.loaders', () => ({
  getGeolocation: vi.fn().mockResolvedValue(MOCK_GEOLOCATION),
}));

vi.mock('../../../entities/locations/api/locations.actions', () => ({
  useGeolocationMutation: () => ({
    mutate: vi.fn(),
  }),
}));

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
