import { render } from '@testing-library/react';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from '@/client/lib/constants/common';
import { SEATS } from '@/client/lib/utils/mocks';
import { Seats, type SeatsProps } from '@/client/pages/order/seats/Seats';

const DEFAULT_PROPS: SeatsProps = {
  seats: SEATS,
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

    result = render(<Seats {...DEFAULT_PROPS} seats={SEATS} />);

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
