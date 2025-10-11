import type { PropsWithChildren } from 'react';
import styles from './styles.module.css';

export type HallProps = PropsWithChildren;

export const Hall = (props: HallProps) => {
  const { children } = props;

  return (
    <div className={styles.hall} data-test-id="hall">
      <div className={styles.hallScreen} data-test-id="hall-screen"></div>
      {children}
    </div>
  );
};
