import { render } from '@testing-library/react';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/zustand/AppStoreProvider';
import { UserButton, type UserButtonProps } from './UserButton';

const buildWrappedComponent = (props: UserButtonProps = {}) => (
  <AppStoreProvider store={AppStore}>
    <UserButton {...props} />
  </AppStoreProvider>
);

describe('UserButton', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    let result = render(buildWrappedComponent({ className: 'custom-class' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ className: 'custom-class-v2' }));

    expect(result.container).toMatchSnapshot();
  });
});
