import clsx from 'clsx';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import { Link, type LinkProps } from 'react-router';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './styles.module.css';

export type LinkButtonProps = PropsWithClassName<
  PropsWithChildren<LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { isDisabled?: boolean }>
>;

export const LinkButton = (props: LinkButtonProps) => {
  const { className, children, isDisabled = false, ...restProps } = props;
  const classNameFinal = clsx(className, styles.button, { [styles.isDisabled]: isDisabled });

  return (
    <Link className={classNameFinal} {...restProps}>
      {children}
    </Link>
  );
};
