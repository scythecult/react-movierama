import { render } from '@testing-library/react';
import { AppStoreProvider } from '../../contexts/app-store/AppStoreProvider';
import { App } from './App';

const buildWrappedComponent = () => (
  <AppStoreProvider>
    <App />
  </AppStoreProvider>
);

describe('App', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
