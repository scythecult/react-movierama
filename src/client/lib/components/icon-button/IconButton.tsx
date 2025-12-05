import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { CustomIcon, type CustomIconNameValue } from '../custom-icon/CustomIcon';
import styles from './styles.module.css';

export type IconButtonProps = PropsWithChildren<
  PropsWithClassName & {
    name: CustomIconNameValue;
    onClick?: () => void;
  }
>;

export const IconButton = (props: IconButtonProps) => {
  const { name, children, className, onClick } = props;
  const classNameFinal = clsx(styles.iconButton, className);

  return (
    <button className={classNameFinal} onClick={onClick}>
      <CustomIcon name={name} /> {children}
    </button>
  );
};
