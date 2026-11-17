import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MOCK_LOCATIONS } from '../../../../../../mocks/data/locations';
import { createTestQueryClient } from '../../../../../tests/unit/helpers';
import { LocationsButton } from './LocationsButton';

const locationApi = vi.hoisted(() => ({
  current: vi.fn(),
  detect: vi.fn(),
}));

vi.mock('../../../../entities/locations/api', () => ({
  locationsQueries: {
    current: () => ['location', 'current'],
    getCurrent: () => ({
      queryKey: ['location', 'current'],
      queryFn: locationApi.current,
    }),
    detectCurrent: () => ({
      queryKey: ['location', 'detect'],
      queryFn: locationApi.detect,
    }),
    list: () => ({
      queryKey: ['locations', 'list'],
      queryFn: () => Promise.resolve(MOCK_LOCATIONS),
      initialData: MOCK_LOCATIONS,
    }),
  },
}));

describe('LocationsButton', () => {
  let queryClient: QueryClient;
  let modalsRoot: HTMLDivElement;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    locationApi.current.mockReset();
    locationApi.detect.mockReset();
    locationApi.detect.mockResolvedValue(null);
    modalsRoot = document.createElement('div');
    modalsRoot.id = 'modals';
    document.body.append(modalsRoot);
  });

  afterEach(() => {
    modalsRoot.remove();
  });

  const renderButton = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <LocationsButton />
      </QueryClientProvider>,
    );
  };

  test('should show a skeleton while the location is resolving', () => {
    locationApi.current.mockImplementation(() => new Promise(() => {}));

    renderButton();

    expect(screen.getByTestId('skeleton')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  test('should show the selected city', async () => {
    locationApi.current.mockResolvedValue({ id: 1, name: 'Москва и МО' });

    renderButton();

    expect(await screen.findByRole('button', { name: 'Москва и МО' })).toBeTruthy();
    expect(screen.queryByTestId('skeleton')).toBeNull();
  });

  test('should ask to choose a location when none is selected', async () => {
    locationApi.current.mockResolvedValue({ id: 0, name: '' });

    renderButton();

    expect(await screen.findByRole('button', { name: 'Choose Location' })).toBeTruthy();
  });

  test('should open and close the locations modal', async () => {
    locationApi.current.mockResolvedValue({ id: 1, name: 'Москва и МО' });

    renderButton();

    fireEvent.click(await screen.findByRole('button', { name: 'Москва и МО' }));

    expect(screen.getByRole('heading', { name: 'Locations' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Астрахань' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'close-modal' }));

    expect(screen.queryByRole('heading', { name: 'Locations' })).toBeNull();
  });
});
