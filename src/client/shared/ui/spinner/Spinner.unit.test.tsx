import { render } from '@testing-library/react';
import { SpinnerSize } from './constants';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  test('should correspond default layout', () => {
    const result = render(<Spinner />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support "size" prop', () => {
    let result = render(<Spinner size={SpinnerSize.S} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Spinner size={SpinnerSize.M} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Spinner size={SpinnerSize.L} />);

    expect(result.container).toMatchSnapshot();
  });
});
