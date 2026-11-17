import { render, screen } from '@testing-library/react';
import { LocationsModal } from './LocationsModal';

vi.mock('../locations-list/LocationsList', () => ({ LocationsList: () => 'Locations list' }));

describe('LocationsModal', () => {
  test('should show the locations heading and list', () => {
    render(<LocationsModal />);

    expect(screen.getByRole('heading', { name: 'Locations' })).toBeTruthy();
    expect(screen.getByText('Locations list')).toBeTruthy();
  });
});
