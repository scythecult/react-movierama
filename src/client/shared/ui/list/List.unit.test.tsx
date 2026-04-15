import { render } from '@testing-library/react';
import { List, type ListProps } from './List';

const DEFAULT_PROPS: ListProps<number> = {
  items: [],
  renderItem: (prop) => <span key={prop}>{prop}</span>,
};

describe('List', () => {
  test('should correspond default layout', () => {
    const result = render(<List {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "items" prop', () => {
    let result = render(<List {...DEFAULT_PROPS} items={[]} />);

    expect(result.container).toMatchSnapshot();

    result = render(<List {...DEFAULT_PROPS} items={[1, 2, 3]} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "renderItem" prop', () => {
    let result = render(<List items={[4, 5, 6]} renderItem={(prop) => <span key={prop}>{prop}</span>} />);

    expect(result.container).toMatchSnapshot();

    result = render(<List items={[3, 2, 1]} renderItem={(prop) => <span key={prop}>{prop}</span>} />);

    expect(result.container).toMatchSnapshot();
  });
});
