import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { AppStoreProvider } from '../../../shared/zustand/AppStoreProvider';
import { Modals } from '../../../widgets/modals';
import { AppStore } from '../../store/AppStore';
import { Layout } from './Layout';

const buildWrappedComponent = () => (
  <Modals>
    <AppStoreProvider store={AppStore}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AppStoreProvider>
  </Modals>
);

vi.mock('../../../entities/locations/api', () => ({
  useGeolocationMutation: () => ({
    mutate: vi.fn(),
  }),
}));

describe('Layout', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
