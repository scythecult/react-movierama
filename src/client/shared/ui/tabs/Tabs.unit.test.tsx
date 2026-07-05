import { render } from '@testing-library/react';
import { Tabs } from './Tabs';

const items = [
  { label: 'Tab 1', content: <div>Content 1</div> },
  { label: 'Tab 2', content: <div>Content 2</div> },
];

describe('Tabs', () => {
  test('should correspond default layout', () => {
    const result = render(<Tabs items={items} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support "className" prop', () => {
    let result = render(<Tabs items={items} className="custom-class" />);

    expect(result.container).toMatchSnapshot();

    result = render(<Tabs items={items} />);

    expect(result.container).toMatchSnapshot();
  });
});
