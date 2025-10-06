import clsx from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import type { PropsWithClassName } from '@/client/lib/types/PropsWithClassName';
import styles from './styles.module.css';

export type ButtonProps = PropsWithClassName & PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export const Button = (props: ButtonProps) => {
  const { className, children, ...restProps } = props;
  const classNameFinal = clsx(className, styles.button);

  return (
    <button className={classNameFinal} {...restProps}>
      {children}
    </button>
  );
};
