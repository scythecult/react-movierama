import { fireEvent, render, screen } from '@testing-library/react';
import { MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { RemoveFromCartButton } from './RemoveFromCartButton';

const [firstSeat, secondSeat] = MOCK_SEATS_DATA;

const renderButtons = () => {
  render(
    <AppStoreProvider store={AppStore}>
      <RemoveFromCartButton seatId={firstSeat.id} />
      <RemoveFromCartButton seatId={secondSeat.id} />
    </AppStoreProvider>,
  );
};

describe('RemoveFromCartButton', () => {
  beforeEach(() => {
    AppStore.setState({
      cart: [firstSeat, secondSeat],
      cartTotalPrice: firstSeat.price + secondSeat.price,
    });
  });

  test('should remove only the chosen seat', () => {
    renderButtons();

    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);

    expect(AppStore.getState().cart.map((item) => item.id)).toEqual([secondSeat.id]);
    expect(AppStore.getState().cartTotalPrice).toBe(secondSeat.price);
  });
});
