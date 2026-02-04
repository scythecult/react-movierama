import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { AppStoreProvider } from '../../contexts/app-store/AppStoreProvider';
import { LocationsModalProvider } from '../../locations-modal/components/LocationsModalProvider';
import { Header, type HeaderProps } from './Header';

const DEFAULT_PROPS: HeaderProps = {
  className: '',
};

const buildWrappedComponent = (props: HeaderProps = DEFAULT_PROPS) => (
  <AppStoreProvider>
    <BrowserRouter>
      <LocationsModalProvider>
        <Header {...props} />
      </LocationsModalProvider>
    </BrowserRouter>
  </AppStoreProvider>
);

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
