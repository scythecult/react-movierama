import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { LinkButton, type LinkButtonProps } from './LinkButton';

const DEFAULT_PROPS = {
  isDisabled: false,
  to: '/',
};

const buildWrappedComponent = (props: LinkButtonProps) => {
  const { children } = props;

  return (
    <BrowserRouter>
      <LinkButton {...props}>{children}</LinkButton>
    </BrowserRouter>
  );
};

describe('LinkButton', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent(DEFAULT_PROPS));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "children" prop', () => {
    const result = render(buildWrappedComponent({ ...DEFAULT_PROPS, children: 'Children' }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    const result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class', children: 'Children' }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "isDisabled" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, isDisabled: true, children: 'Children' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, isDisabled: false, children: 'Children' }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "to" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, to: '/test', children: 'Children' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, to: '/test100500', children: 'Children' }));

    expect(result.container).toMatchSnapshot();
  });
});
