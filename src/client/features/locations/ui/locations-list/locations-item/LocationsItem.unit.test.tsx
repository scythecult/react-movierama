import { render } from '@testing-library/react';
import { MOCK_LOCATIONS } from '../../../../../../../mocks/data/locations';
import { LocationsItem, type LocationsItemProps } from './LocationsItem';

const DEFAULT_PROPS: LocationsItemProps = {
  locationsItem: MOCK_LOCATIONS[0],
  currentLocationId: 1,
  onClick: () => {},
};

describe('LocationItem', () => {
  test('should correspond default layout', () => {
    const result = render(<LocationsItem {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "locationItem" prop', () => {
    let result = render(<LocationsItem {...DEFAULT_PROPS} locationsItem={MOCK_LOCATIONS[0]} />);

    expect(result.container).toMatchSnapshot();

    result = render(<LocationsItem {...DEFAULT_PROPS} locationsItem={MOCK_LOCATIONS[1]} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "currentLocationId" prop', () => {
    let result = render(<LocationsItem {...DEFAULT_PROPS} currentLocationId={1} />);

    expect(result.container).toMatchSnapshot();

    result = render(<LocationsItem {...DEFAULT_PROPS} currentLocationId={2} />);

    expect(result.container).toMatchSnapshot();
  });
});
