import { render } from '@testing-library/react';
import { IconButton, IconButtonName, type IconButtonProps } from './IconButton';

const DEFAULT_PROPS: IconButtonProps = {
  name: IconButtonName.LOCATION,
  children: 'Current Location',
};

describe('Location', () => {
  test('should correspond default layout', () => {
    const result = render(<IconButton {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "children" prop', () => {
    let result = render(<IconButton {...DEFAULT_PROPS}>check</IconButton>);

    expect(result.container).toMatchSnapshot();

    result = render(<IconButton {...DEFAULT_PROPS}>check v2</IconButton>);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "name" prop', () => {
    let result = render(<IconButton {...DEFAULT_PROPS} name={IconButtonName.LOCATION} />);

    expect(result.container).toMatchSnapshot();

    result = render(<IconButton {...DEFAULT_PROPS} name={IconButtonName.LOCATION} />);

    expect(result.container).toMatchSnapshot();
  });
});
