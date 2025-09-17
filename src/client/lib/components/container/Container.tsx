import type { PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const Container = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};
