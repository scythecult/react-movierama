import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { AppStore } from '../../../app/store/AppStore';
import { AppStoreProvider } from '../../../shared/zustand/AppStoreProvider';
import { Modals } from '../../modals';
import { Header, type HeaderProps } from './Header';

const DEFAULT_PROPS: HeaderProps = {
  className: '',
};

const buildWrappedComponent = (props: HeaderProps = DEFAULT_PROPS) => {
  return (
    <Modals>
      <AppStoreProvider store={AppStore}>
        <BrowserRouter>
          <Header {...props} />
        </BrowserRouter>
      </AppStoreProvider>
    </Modals>
  );
};

vi.mock('../../../entities/locations/api', () => ({
  useGeolocationMutation: () => ({
    mutate: vi.fn(),
  }),
}));

describe('Header', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class-v2' }));

    expect(result.container).toMatchSnapshot();
  });
});
