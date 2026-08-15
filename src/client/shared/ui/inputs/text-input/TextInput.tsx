import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import styles from './styles.module.css';

export type TextInputProps = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export const TextInput = (props: TextInputProps) => {
  const { className, error, label, inputProps, prefix, suffix } = props;
  const id = useId();
  const textInputContainerClassName = clsx(className, styles.textInputContainer);
  const textInputFieldClassName = clsx(inputProps?.className, styles.textInputField);

  return (
    <div className={textInputContainerClassName}>
      {label && <label htmlFor={id}>{label}</label>}

      <div className={styles.textInputContainerField}>
        {prefix && <span className={styles.textInputFieldContainerIcon}>{prefix}</span>}

        <input className={textInputFieldClassName} {...inputProps} id={id} />

        {suffix && <span className={styles.textInputFieldContainerIcon}>{suffix}</span>}
      </div>

      {error && <div className={styles.textInputError}>{error}</div>}
    </div>
  );
};
