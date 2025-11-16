import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Logo } from './Logo';

const buildWrappedComponent = () => (
  <BrowserRouter>
    <Logo />
  </BrowserRouter>
);

describe('Logo', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
