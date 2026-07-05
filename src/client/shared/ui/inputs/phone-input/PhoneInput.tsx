import { PhoneIcon } from '@heroicons/react/24/solid';
import { TextInput, type TextInputProps } from '../text-input/TextInput';
import styles from './styles.module.css';

// const PHONE_NUMBER_REGEX = /^\+?[1-9]\d{1,14}$/;
// const PHONE_REGEX = /(?:\d{1}-?\s?)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/m;
// const PHONE_MASK = '+7 (___) ___-__-__';

export const PhoneInput = (props: TextInputProps) => {
  const { inputProps, ...rest } = props;

  return (
    <TextInput
      prefix={<PhoneIcon className={styles.phoneInputIcon} />}
      inputProps={{ ...inputProps, type: 'tel' }}
      {...rest}
    />
  );
};
