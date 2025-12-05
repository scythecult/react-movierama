import clsx from 'clsx';
import { createElement } from 'react';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { CustomIconName } from './constants';
import IconAccount from './icon-account.svg';
import IconPin from './icon-pin.svg';
import styles from './styles.module.css';

const IconComponentMap = {
  [CustomIconName.ACCOUNT]: IconAccount,
  [CustomIconName.PIN]: IconPin,
};

type CustomIconNameKey = keyof typeof CustomIconName;
export type CustomIconNameValue = (typeof CustomIconName)[CustomIconNameKey];

export type CustomIconProps = PropsWithClassName & {
  name: CustomIconNameValue;
};

export const CustomIcon = (props: CustomIconProps) => {
  const { name, className, ...restProps } = props;
  const IconComponent = IconComponentMap[name] || '';

  const classNameFinal = clsx(styles.customIcon, className, {
    [`${styles.customIcon}--${name}`]: Boolean(name),
  });

  if (IconComponent) {
    return (
      <div className={classNameFinal} {...restProps}>
        {createElement(IconComponent)}
      </div>
    );
  }
};
