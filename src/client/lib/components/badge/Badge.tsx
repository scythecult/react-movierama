import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './styles.module.css';

export type BadgeProps = PropsWithChildren<PropsWithClassName>;

export const Badge = (props: BadgeProps) => {
  const { className, children } = props;
  const classNameFinal = clsx(styles.badge, className);

  return <div className={classNameFinal}>{children}</div>;
};
