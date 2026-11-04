import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MOCK_GEOLOCATION } from '../../../../../../mocks/data/geolocation';
import { LocationsButton } from './LocationsButton';

const getGeolocationMock = vi.fn().mockResolvedValue(MOCK_GEOLOCATION.current);

vi.mock('../../../../entities/locations/api', () => ({
  locationsQueries: {
    getCurrent: () => ({
      queryKey: ['locations', 'one'],
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

describe('LocationsButton', () => {
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

  const renderLocationsButton = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <LocationsButton />
      </QueryClientProvider>,
    );
  };

  test('should correspond default layout', async () => {
    const result = renderLocationsButton();

    await waitForElementToBeRemoved(() => screen.getByTestId('skeleton'));

    expect(result.container).toMatchSnapshot();
  });
});
