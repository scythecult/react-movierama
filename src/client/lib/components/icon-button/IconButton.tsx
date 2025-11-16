import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './styles.module.css';

export const IconButtonName = {
  LOCATION: 'location',
  LOGIN: 'login',
} as const;

export type IconButtonNameValue = (typeof IconButtonName)[keyof typeof IconButtonName];

export type IconButtonProps = PropsWithChildren<
  PropsWithClassName & {
    name: IconButtonNameValue;
    onClick?: () => void;
  }
>;

export const IconButton = (props: IconButtonProps) => {
  const { name = IconButtonName.LOCATION, children, className, onClick } = props;
  const classNameFinal = clsx(styles.iconButton, className);

  return (
    <button className={classNameFinal} onClick={onClick}>
      <span>{name}</span> {children}
    </button>
  );
};
