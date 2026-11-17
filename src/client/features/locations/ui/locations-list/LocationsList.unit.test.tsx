import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MOCK_LOCATIONS } from '../../../../../../mocks/data/locations';
import { createTestQueryClient } from '../../../../../tests/unit/helpers';
import { LocationsList } from './LocationsList';

const getCurrentLocationMock = vi.fn();
const getLocationsMock = vi.fn();
const setCurrentLocationMock = vi.hoisted(() => vi.fn());

vi.mock('../../../../entities/locations/api', () => ({
  locationsQueries: {
    current: () => ['location', 'current'],
    getCurrent: () => ({
      queryKey: ['location', 'current'],
      queryFn: getCurrentLocationMock,
    }),
    list: () => ({
      queryKey: ['locations', 'list'],
      queryFn: getLocationsMock,
    }),
  },
}));

vi.mock('../../../../entities/locations/api/locations.actions', () => ({
  setCurrentLocation: setCurrentLocationMock,
}));

describe('LocationsList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    getCurrentLocationMock.mockResolvedValue(MOCK_LOCATIONS[0]);
    getLocationsMock.mockResolvedValue(MOCK_LOCATIONS);
    setCurrentLocationMock.mockReset();
    setCurrentLocationMock.mockResolvedValue(MOCK_LOCATIONS[1]);
  });

  const renderList = () => {
    queryClient = createTestQueryClient();

    return render(
      <QueryClientProvider client={queryClient}>
        <LocationsList />
      </QueryClientProvider>,
    );
  };

  test('should select the clicked city', async () => {
    renderList();

    fireEvent.click(await screen.findByRole('button', { name: 'Астрахань' }));

    await waitFor(() => {
      expect(setCurrentLocationMock).toHaveBeenCalled();
    });

    expect(setCurrentLocationMock.mock.calls[0][0]).toBe(23);
  });

  test('should render no cities when the list is empty', async () => {
    getLocationsMock.mockResolvedValueOnce([]);

    renderList();

    await waitFor(() => {
      expect(getLocationsMock).toHaveBeenCalled();
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(screen.queryByRole('button')).toBeNull();
  });
});
