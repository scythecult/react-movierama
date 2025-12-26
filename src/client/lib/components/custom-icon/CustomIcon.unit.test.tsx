import { render } from '@testing-library/react';
import { CustomIconName } from './constants';
import { CustomIcon, type CustomIconProps } from './CustomIcon';

const DEFAULT_PROPS: CustomIconProps = {
  name: CustomIconName.ACCOUNT,
};

describe('CustomIcon', () => {
  test('should correspond default layout', () => {
    const result = render(<CustomIcon {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "name" prop', () => {
    let result = render(<CustomIcon name={CustomIconName.PIN} />);

    expect(result.container).toMatchSnapshot();

    result = render(<CustomIcon name={CustomIconName.ACCOUNT} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    let result = render(<CustomIcon {...DEFAULT_PROPS} className="custom-class" />);

    expect(result.container).toMatchSnapshot();

    result = render(<CustomIcon {...DEFAULT_PROPS} className="custom-class-v2" />);

    expect(result.container).toMatchSnapshot();
  });
});
