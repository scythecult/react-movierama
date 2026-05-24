import { render } from '@testing-library/react';
import { MOCK_GEOLOCATION } from '../../../../../../mocks/data/geolocation';
import { AppStore } from '../../../../app/store/AppStore';
import { ModalProvider } from '../../../../shared/lib/modal';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { LocationsButton } from './LocationsButton';

vi.mock('../../../../entities/locations/api', () => ({
  useGeolocationMutation: () => ({
    mutate: vi.fn(),
  }),

  locationsQueries: {
    getOne: vi.fn(),
  },
}));

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      data: MOCK_GEOLOCATION.current,
    })),
  };
});

const buildWrappedComponent = () => (
  <ModalProvider>
    <AppStoreProvider store={AppStore}>
      <LocationsButton />
    </AppStoreProvider>
  </ModalProvider>
);

describe('LocationsButton', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result).toMatchSnapshot();
  });
});
