import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { SiteNavigation } from './SiteNavigation';

const buildWrappedComponent = () => (
  <BrowserRouter>
    <SiteNavigation />
  </BrowserRouter>
);

describe('SiteNavigation', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
