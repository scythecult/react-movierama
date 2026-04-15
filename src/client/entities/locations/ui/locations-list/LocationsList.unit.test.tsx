import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_GEOLOCATION } from '../../../../../../mocks/data/geolocation';
import { MOCK_LOCATIONS } from '../../../../../../mocks/data/locations';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/zustand/AppStoreProvider';
import { LocationsList, type LocationsListProps } from './LocationsList';

const DEFAULT_PROPS: LocationsListProps = {
  className: '',
};

const state = {
  location: MOCK_GEOLOCATION,
  locations: MOCK_LOCATIONS,
};

const buildWrappedComponent = (props: LocationsListProps = DEFAULT_PROPS) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppStoreProvider initialState={state} store={AppStore}>
        <BrowserRouter>
          <LocationsList {...props} />
        </BrowserRouter>
      </AppStoreProvider>
    </QueryClientProvider>
  );
};

vi.mock('../../../../entities/locations/api', () => ({
  useGeolocationMutation: () => ({
    mutate: vi.fn(),
  }),
}));

describe('LocationsList', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    let result = render(buildWrappedComponent({ className: 'custom-class' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ className: 'custom-class-v2' }));

    expect(result.container).toMatchSnapshot();
  });
});
