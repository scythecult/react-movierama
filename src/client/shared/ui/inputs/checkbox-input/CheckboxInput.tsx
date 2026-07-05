import { type InputHTMLAttributes, type PropsWithChildren, useId } from 'react';
import styles from './styles.module.css';

export type CheckboxInputProps = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>;

export const CheckboxInput = (props: CheckboxInputProps) => {
  const id = useId();
  const { children, ...rest } = props;

  return (
    <div className={styles.checkbox}>
      <input className={styles.checkboxInput} id={id} type="checkbox" {...rest} />

      <label htmlFor={id}>{children}</label>
    </div>
  );
};
