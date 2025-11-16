import type { PropsWithChildren } from 'react';
import styles from './styles.module.css';

export type LinkBarProps = PropsWithChildren;

export const LinkBar = (props: LinkBarProps) => {
  const { children } = props;

  return (
    <div className={styles.linkBar} data-test-id="link-bar">
      <div className={styles.linkBarContent}>{children}</div>
    </div>
  );
};
