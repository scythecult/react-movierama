import { render } from '@testing-library/react';
import { App } from '@/client/lib/components/app/App';
import { AppStoreProvider } from '@/client/lib/providers/AppStoreProvider';

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
