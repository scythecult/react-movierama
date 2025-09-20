import { render } from '@testing-library/react';
import { MoviePicker } from '@/client/pages/order/movie-picker/MoviePicker';

describe('MoviePicker', () => {
  test('should correspond default layout', () => {
    const result = render(<MoviePicker />);

    expect(result.container).toMatchSnapshot();
  });
});
