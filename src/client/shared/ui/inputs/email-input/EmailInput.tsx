import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { TextInput, type TextInputProps } from '../text-input/TextInput';
import styles from './styles.module.css';

export const EmailInput = (props: TextInputProps) => {
  const { inputProps, ...rest } = props;

  return (
    <TextInput
      prefix={<AtSymbolIcon className={styles.emailInputIcon} />}
      inputProps={{ ...inputProps, type: 'email' }}
      {...rest}
    />
  );
};
