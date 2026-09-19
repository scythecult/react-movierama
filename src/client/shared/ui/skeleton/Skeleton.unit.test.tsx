import { render } from '@testing-library/react';
import { SkeletonVariant } from './constants';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  test('should correspond default layout', () => {
    const result = render(<Skeleton />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support "variant" prop', () => {
    let result = render(<Skeleton variant={SkeletonVariant.TEXT} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Skeleton variant={SkeletonVariant.CIRCLE} />);

    expect(result.container).toMatchSnapshot();

    result = render(<Skeleton variant={SkeletonVariant.RECT} />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support "width" and "height" prop', () => {
    let result = render(<Skeleton width="100px" height="100px" />);

    expect(result.container).toMatchSnapshot();

    result = render(<Skeleton width="200px" height="200px" />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support "className" prop', () => {
    let result = render(<Skeleton className="custom-class" />);

    expect(result.container).toMatchSnapshot();

    result = render(<Skeleton className="custom-class" variant={SkeletonVariant.CIRCLE} />);

    expect(result.container).toMatchSnapshot();
  });
});
