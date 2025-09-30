import { render } from '@testing-library/react';
import { describe } from 'vitest';
import { AppStoreProvider } from '@/client/lib/providers/AppStoreProvider';
import { PreCheck, type PreCheckProps } from '@/client/pages/order/pre-check/PreCheck';
import { SELECTED_SEATS } from '../../../../constants/common';

const DEFAULT_PROPS: PreCheckProps = {
  selectedSeats: [],
  onRemoveSeatClick: () => {
  },
  onTicketTypeChange: () => {
  },
};

const buildWrappedComponent = (props = DEFAULT_PROPS) => (
  <AppStoreProvider>
    <PreCheck {...props} />
  </AppStoreProvider>
);

describe('PreCheck', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "selectedSeats" prop', () => {
    const result = render(buildWrappedComponent({ ...DEFAULT_PROPS, selectedSeats: SELECTED_SEATS }));

    expect(result.container).toMatchSnapshot();
  });
});