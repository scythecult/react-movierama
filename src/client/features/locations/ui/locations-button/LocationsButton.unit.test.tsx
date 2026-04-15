import { render } from '@testing-library/react';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/zustand/AppStoreProvider';
import { Modals } from '../../../../widgets/modals';
import { LocationsButton } from './LocationsButton';

const buildWrappedComponent = () => (
  <Modals>
    <AppStoreProvider store={AppStore}>
      <LocationsButton />
    </AppStoreProvider>
  </Modals>
);

vi.mock('../../../../entities/locations/api', () => ({
  useGeolocationMutation: () => ({
    mutate: vi.fn(),
  }),
}));

describe('LocationsButton', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result).toMatchSnapshot();
  });
});
