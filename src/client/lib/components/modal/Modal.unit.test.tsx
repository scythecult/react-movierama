import { render } from '@testing-library/react';
import { Modal, type ModalProps } from './Modal';

const DEFAULT_PROPS: ModalProps = {
  renderHeader: () => <div>Header</div>,
  renderBody: () => <div>Body</div>,
  onClose: () => {},
};

describe('Modal', () => {
  test('should correspond default layout', () => {
    const result = render(<Modal {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "renderHeader" prop', () => {
    let result = render(<Modal {...DEFAULT_PROPS} renderHeader={() => <div>Header #1</div>} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Modal {...DEFAULT_PROPS} renderHeader={() => <div>Header #2</div>} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "renderBody" prop', () => {
    let result = render(<Modal {...DEFAULT_PROPS} renderBody={() => <div>Body #1</div>} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Modal {...DEFAULT_PROPS} renderBody={() => <div>Body #2</div>} />);

    expect(result.container).toMatchSnapshot();
  });
});
