import { render } from '@testing-library/react';
import { MOCK_SEAT_TYPES } from '../../../../../../mocks/data/seats';
import { Legend, type LegendProps } from './Legend';

const DEFAULT_PROPS: LegendProps = {
  seatTypes: [],
};

describe('Legend', () => {
  test('should correspond default layout', () => {
    const result = render(<Legend {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "seatTypes" prop', () => {
    const result = render(<Legend seatTypes={MOCK_SEAT_TYPES} />);
    expect(result.container).toMatchSnapshot();
  });
});
