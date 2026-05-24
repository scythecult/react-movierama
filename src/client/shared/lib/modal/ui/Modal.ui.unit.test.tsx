import { render } from '@testing-library/react';
import { ModalUi, type ModalUiProps } from './Modal.ui';

const DEFAULT_PROPS: ModalUiProps = {
  renderHeader: () => <div>Header</div>,
  renderBody: () => <div>Body</div>,
  onClose: () => {},
};

describe('ModalUi', () => {
  test('should correspond default layout', () => {
    const result = render(<ModalUi {...DEFAULT_PROPS} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "renderHeader" prop', () => {
    let result = render(<ModalUi {...DEFAULT_PROPS} renderHeader={() => <div>Header #1</div>} />);

    expect(result.container).toMatchSnapshot();

    result = render(<ModalUi {...DEFAULT_PROPS} renderHeader={() => <div>Header #2</div>} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "renderBody" prop', () => {
    let result = render(<ModalUi {...DEFAULT_PROPS} renderBody={() => <div>Body #1</div>} />);

    expect(result.container).toMatchSnapshot();

    result = render(<ModalUi {...DEFAULT_PROPS} renderBody={() => <div>Body #2</div>} />);

    expect(result.container).toMatchSnapshot();
  });
});
