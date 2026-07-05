import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { TextInput, type TextInputProps } from '../text-input/TextInput';
import styles from './styles.module.css';

export const PasswordInput = (props: TextInputProps) => {
  const { inputProps, ...rest } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = isPasswordVisible ? 'text' : 'password';

  return (
    <TextInput
      prefix={<LockClosedIcon className={styles.passwordInputIcon} />}
      suffix={
        <button
          className={styles.passwordButton}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          type="button"
        >
          {isPasswordVisible && <EyeIcon className={styles.passwordInputIcon} />}

          {!isPasswordVisible && <EyeSlashIcon className={styles.passwordInputIcon} />}
        </button>
      }
      inputProps={{ ...inputProps, type: inputType }}
      {...rest}
    />
  );
};
