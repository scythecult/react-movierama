import { render, screen } from '@testing-library/react';
import { MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { SeatTypeMap } from './const';
import { Seats } from './Seats';

const freeSeat = MOCK_SEATS_DATA[0];
const occupiedSeat = { ...MOCK_SEATS_DATA[1], type: SeatTypeMap.OCCUPIED };

const renderSeats = () => {
  render(
    <Seats seats={[freeSeat, occupiedSeat]} cart={[freeSeat]} canvasWidth={400} canvasHeight={200} />,
  );
};

describe('Seats', () => {
  test('should mark a cart seat as selected and an occupied seat as disabled', () => {
    renderSeats();

    const [selectedSeat, disabledSeat] = screen.getAllByTestId('seat');

    expect(selectedSeat.getAttribute('data-test-selected')).toBe('true');
    expect(selectedSeat.getAttribute('data-test-disabled')).toBe('false');
    expect(selectedSeat.textContent).toContain(String(freeSeat.place));

    expect(disabledSeat.getAttribute('data-test-selected')).toBe('false');
    expect(disabledSeat.getAttribute('data-test-disabled')).toBe('true');
  });

  test('should render an empty hall without seats', () => {
    render(<Seats seats={[]} cart={[]} canvasWidth={400} canvasHeight={200} />);

    expect(screen.queryByTestId('seat')).toBeNull();
  });
});
