import { render } from '@testing-library/react';
import { LinkBar } from './LinkBar';

describe('LinkBar', () => {
  test('should correspond default layout', () => {
    const result = render(<LinkBar />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "children" prop', () => {
    let result = render(<LinkBar>Children</LinkBar>);

    expect(result.container).toMatchSnapshot();

    result = render(<LinkBar>Children v2</LinkBar>);

    expect(result.container).toMatchSnapshot();
  });
});
