import { render } from '@testing-library/react';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  test('should correspond default layout', () => {
    const result = render(<TextInput />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support "label" prop', () => {
    let result = render(<TextInput label="Test" />);

    expect(result.container).toMatchSnapshot();

    result = render(<TextInput label="Test 2" />);
    expect(result.container).toMatchSnapshot();
  });

  test('should support "prefix" prop', () => {
    let result = render(<TextInput prefix={<p>Prefix</p>} />);

    expect(result.container).toMatchSnapshot();

    result = render(<TextInput prefix={<p>Prefix 2</p>} />);
    expect(result.container).toMatchSnapshot();
  });

  test('should support "suffix" prop', () => {
    let result = render(<TextInput suffix={<p>Suffix</p>} />);

    expect(result.container).toMatchSnapshot();

    result = render(<TextInput suffix={<p>Suffix 2</p>} />);
    expect(result.container).toMatchSnapshot();
  });

  test('should support "error" prop', () => {
    let result = render(<TextInput error={'Error'} />);

    expect(result.container).toMatchSnapshot();

    result = render(<TextInput error={'Error 2'} />);
    expect(result.container).toMatchSnapshot();
  });

  test('should support "className" prop', () => {
    let result = render(<TextInput className={'test'} />);

    expect(result.container).toMatchSnapshot();

    result = render(<TextInput className={'test 2'} />);
    expect(result.container).toMatchSnapshot();
  });
});
