import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_NEWS } from '../../../../../../mocks/data/news';
import { NewsListItem, type NewsListItemProps } from './NewsListItem';

const DEFAULT_PROPS: NewsListItemProps = {
  ...MOCK_NEWS[0],
};

const buildWrappedComponent = (props: NewsListItemProps = DEFAULT_PROPS) => (
  <BrowserRouter>
    <NewsListItem {...props} />
  </BrowserRouter>
);

describe('NewsListItem', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "id" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, id: 1 }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, id: 2 }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "headline" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, headline: 'headline' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, headline: 'headline v2' }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "addedAt" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, addedAt: 'addedAt' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, addedAt: 'addedAt v2' }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "image" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, image: '/' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, image: '/v2' }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "preview" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, preview: 'preview' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, preview: 'preview v2' }));

    expect(result.container).toMatchSnapshot();
  });
});
