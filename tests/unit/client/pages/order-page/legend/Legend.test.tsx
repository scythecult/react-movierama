import { render } from '@testing-library/react';
import { Legend, type LegendProps } from '@/client/pages/order/legend/Legend';
import { SEAT_TYPES } from '../../../../constants/common';


const DEFAULT_PROPS: LegendProps = {
  seatTypes: [],
};

describe('Legend', () => {
  test('should correspond default layout', () => {
    const result = render(<Legend {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "seatTypes" prop', () => {
    const result = render(<Legend seatTypes={SEAT_TYPES} />);
    expect(result.container).toMatchSnapshot();
  });
});
