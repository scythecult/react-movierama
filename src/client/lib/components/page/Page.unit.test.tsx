import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { AppStoreProvider } from '../../contexts/app-store/AppStoreProvider';
import { Page } from './Page';

const buildWrappedComponent = () => (
  <AppStoreProvider>
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  </AppStoreProvider>
);

describe('Page', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
