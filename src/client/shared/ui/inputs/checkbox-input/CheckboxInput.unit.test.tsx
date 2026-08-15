import { render } from '@testing-library/react';
import { CheckboxInput } from './CheckboxInput';

describe('CheckboxInput', () => {
  test('should correspond default layout', () => {
    const result = render(<CheckboxInput />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support "children" prop', () => {
    let result = render(<CheckboxInput>Check</CheckboxInput>);

    expect(result.container).toMatchSnapshot();

    result = render(<CheckboxInput>Check 2</CheckboxInput>);
    expect(result.container).toMatchSnapshot();
  });
});
