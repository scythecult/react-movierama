import { type InputHTMLAttributes, type PropsWithChildren, useId } from 'react';
import styles from './styles.module.css';

export type CheckboxInputProps = PropsWithChildren<InputHTMLAttributes<HTMLInputElement> & { error?: string }>;

export const CheckboxInput = (props: CheckboxInputProps) => {
  const id = useId();
  const { children, error, ...rest } = props;

  return (
    <div className={styles.checkbox}>
      <input className={styles.checkboxInput} id={id} type="checkbox" {...rest} />

      <label htmlFor={id}>{children}</label>

      {error && <div className={styles.checkboxInputError}>{error}</div>}
    </div>
  );
};
