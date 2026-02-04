import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_GEOLOCATION } from '../../../../../mocks/data/geolocation';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import { AppStoreProvider } from '../../contexts/app-store/AppStoreProvider';
import { LocationList, type LocationListProps } from './LocationList';

const queryClient = new QueryClient();

const DEFAULT_PROPS: LocationListProps = {
  className: '',
};

const state = {
  location: MOCK_GEOLOCATION,
  locations: MOCK_LOCATIONS,
};

const buildWrappedComponent = (props: LocationListProps = DEFAULT_PROPS) => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider initialState={state}>
      <BrowserRouter>
        <LocationList {...props} />
      </BrowserRouter>
    </AppStoreProvider>
  </QueryClientProvider>
);

vi.mock('../../api/geolocation/hooks', () => ({
  useGeolocationMutation: () => ({
    mutate: vi.fn(),
  }),
}));

describe('LocationList', () => {
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
