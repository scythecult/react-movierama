import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './styles.module.css';

export type LayoutProps = PropsWithChildren<PropsWithClassName>;

export const Layout = (props: LayoutProps) => {
  const { className, children } = props;
  const classNameFinal = clsx(styles.layout, className);

  return <div className={classNameFinal}>{children}</div>;
};
