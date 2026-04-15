import { render } from '@testing-library/react';
import { MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { TEST_CART_ITEMS } from '../../../../../tests/constants';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from './const';
import { Seats, type SeatsProps } from './Seats';

const DEFAULT_PROPS: SeatsProps = {
  seats: MOCK_SEATS_DATA,
  cart: TEST_CART_ITEMS,
  canvasWidth: DEFAULT_CANVAS_WIDTH,
  canvasHeight: DEFAULT_CANVAS_HEIGHT,
  onClick: (_: number) => {},
};

describe('Seats', () => {
  test('should correspond default layout', () => {
    const result = render(<Seats {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "seats" prop', () => {
    let result = render(<Seats {...DEFAULT_PROPS} seats={[]} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seats {...DEFAULT_PROPS} seats={MOCK_SEATS_DATA} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "cart" prop', () => {
    let result = render(<Seats {...DEFAULT_PROPS} cart={[]} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seats {...DEFAULT_PROPS} cart={TEST_CART_ITEMS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "canvasWidth" prop', () => {
    let result = render(<Seats {...DEFAULT_PROPS} canvasWidth={100} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seats {...DEFAULT_PROPS} canvasWidth={200} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "canvasHeight" prop', () => {
    let result = render(<Seats {...DEFAULT_PROPS} canvasHeight={100} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seats {...DEFAULT_PROPS} canvasHeight={200} />);

    expect(result.container).toMatchSnapshot();
  });
});
