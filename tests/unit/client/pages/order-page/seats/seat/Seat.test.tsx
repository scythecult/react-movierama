import { render } from '@testing-library/react';
import { Seat, type SeatProps } from '@/client/pages/order/seats/seat/Seat';

const DEFAULT_PROPS: SeatProps = {
  onClick: () => {},
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  type: 0,
  place: 0,
  state: 0,
};

describe('Seat', () => {
  test('should correspond default layout', () => {
    const result = render(<Seat {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "x" prop', () => {
    let result = render(<Seat {...DEFAULT_PROPS} x={10} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seat {...DEFAULT_PROPS} x={20} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "y" prop', () => {
    let result = render(<Seat {...DEFAULT_PROPS} y={10} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seat {...DEFAULT_PROPS} y={20} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "w" prop', () => {
    let result = render(<Seat {...DEFAULT_PROPS} w={100} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seat {...DEFAULT_PROPS} w={200} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "h" prop', () => {
    let result = render(<Seat {...DEFAULT_PROPS} h={100} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seat {...DEFAULT_PROPS} h={200} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "type" prop', () => {
    let result = render(<Seat {...DEFAULT_PROPS} type={1} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seat {...DEFAULT_PROPS} type={2} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "place" prop', () => {
    let result = render(<Seat {...DEFAULT_PROPS} place={1} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seat {...DEFAULT_PROPS} place={2} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "state" prop', () => {
    let result = render(<Seat {...DEFAULT_PROPS} state={1} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seat {...DEFAULT_PROPS} state={2} />);

    expect(result.container).toMatchSnapshot();
  });
});
