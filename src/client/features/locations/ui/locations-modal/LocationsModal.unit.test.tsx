import { render } from '@testing-library/react';
import { LocationsModal } from './LocationsModal';

vi.mock('../locations-list/LocationsList', () => ({ LocationsList: () => 'Locations list' }));

describe('LocationsModal', () => {
  test('should correspond default layout', () => {
    const result = render(<LocationsModal />);

    expect(result.container).toMatchSnapshot();
  });
});
