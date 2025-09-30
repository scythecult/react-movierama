import { render } from '@testing-library/react';
import type { SeatData } from '@/client/lib/types/OrderData';
import { Seats, type SeatsProps } from '@/client/pages/order/seats/Seats';
import { SEATS } from '../../../../constants/common';

const DEFAULT_PROPS: SeatsProps = {
  seats: SEATS,
  onClick: (_: SeatData) => {
  },
};


describe('Seats', () => {
  test('should correspond default layout', () => {
    const result = render(<Seats {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });
});
