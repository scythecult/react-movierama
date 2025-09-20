import type { PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const Hall = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className={styles.hall}>
      <div className={styles.hallScreen}></div>
      {children}
    </div>
  );
};
