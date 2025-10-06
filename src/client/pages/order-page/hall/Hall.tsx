import type { PropsWithChildren } from 'react';
import styles from './styles.module.css';

export type HallProps = PropsWithChildren;

export const Hall = (props: HallProps) => {
  const { children } = props;

  return (
    <div className={styles.hall}>
      <div className={styles.hallScreen}></div>
      {children}
    </div>
  );
};
