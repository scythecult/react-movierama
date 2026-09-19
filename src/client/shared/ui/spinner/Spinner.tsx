import clsx from 'clsx';
import { SpinnerSize, type SpinnerSizeValue } from './constants';
import styles from './styles.module.css';

export type SpinnerProps = PropsWithClassName<{
  size?: SpinnerSizeValue;
}>;

export const Spinner = (props: SpinnerProps) => {
  const { size = SpinnerSize.S } = props;
  const spinnerClassName = clsx(styles.loadingSpinner, styles[size]);

  return (
    <div className={styles.spinnerContainer} role="status" data-test-id="spinner">
      <div className={spinnerClassName}></div>

      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
