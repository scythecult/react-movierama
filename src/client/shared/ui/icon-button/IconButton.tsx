import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { CustomIcon, type CustomIconNameValue } from '../custom-icon/CustomIcon';
import styles from './styles.module.css';

export type IconButtonProps = PropsWithChildren<
  PropsWithClassName<{
    name?: CustomIconNameValue;
    onClick?: () => void;
    IconComponent?: React.ReactNode;
  }>
>;

export const IconButton = (props: IconButtonProps) => {
  const { name, children, className, onClick, IconComponent } = props;
  const isCustomIconVisible = !IconComponent && name;
  const classNameFinal = clsx(styles.iconButton, className);

  return (
    <button className={classNameFinal} onClick={onClick} type="button">
      {IconComponent}

      {isCustomIconVisible && <CustomIcon name={name} />}

      {children}
    </button>
  );
};
