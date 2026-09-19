import clsx from 'clsx';
import { SkeletonVariant, type SkeletonVariantValue } from './constants';
import styles from './styles.module.css';

export type SkeletonProps = {
  variant?: SkeletonVariantValue;
  width?: string;
  height?: string;
  className?: string;
};

export const Skeleton = (props: SkeletonProps) => {
  const { variant = SkeletonVariant.CIRCLE, width = '0', height = '0', className = '' } = props;
  const skeletonClassName = clsx(styles.skeletonBase, styles[variant], className);

  const style = {
    width,
    height,
  };

  return <div className={skeletonClassName} style={style} aria-hidden="true" data-test-id="skeleton" />;
};
