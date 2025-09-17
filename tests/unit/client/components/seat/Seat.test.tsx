import { render } from '@testing-library/react';
import { Seat } from '@/client/lib/components/seat/Seat';

describe('Seat', () => {
  test('should correspond default layout', () => {
    const result = render(<Seat />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "isSelected" prop', () => {
    let result = render(<Seat isSelected />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seat isSelected={false} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "isOccupied" prop', () => {
    let result = render(<Seat isOccupied />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seat isOccupied={false} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "isDisabled" prop', () => {
    let result = render(<Seat isDisabled />);

    expect(result.container).toMatchSnapshot();

    result = render(<Seat isDisabled={false} />);

    expect(result.container).toMatchSnapshot();
  });
});
