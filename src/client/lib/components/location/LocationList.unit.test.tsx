import { render } from '@testing-library/react';
import { MOCK_LOCATION } from '../../../../../mocks/data/location';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import { LocationList, type LocationListProps } from './LocationList';

const DEFAULT_PROPS: LocationListProps = {
  currentLocation: MOCK_LOCATION,
  locations: MOCK_LOCATIONS,
  onClick: () => {},
};

describe('LocationList', () => {
  test('should correspond default layout', () => {
    const result = render(<LocationList {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "locations" prop', () => {
    let result = render(<LocationList {...DEFAULT_PROPS} locations={[]} />);

    expect(result.container).toMatchSnapshot();

    result = render(<LocationList {...DEFAULT_PROPS} locations={MOCK_LOCATIONS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "currentLocation" prop', () => {
    let result = render(<LocationList {...DEFAULT_PROPS} currentLocation={{ id: 1, name: 'Yaroslavl' }} />);

    expect(result.container).toMatchSnapshot();

    result = render(<LocationList {...DEFAULT_PROPS} currentLocation={{ id: 2, name: 'Moscow' }} />);

    expect(result.container).toMatchSnapshot();
  });
});
