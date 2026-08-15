import { UserCircleIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { signUpSchema } from '../../../../../common/entities/auth';
import { ServerValidationError } from '../../../../shared/api/error/error';
import { Button } from '../../../../shared/ui/button/Button';
import { CheckboxInput } from '../../../../shared/ui/inputs/checkbox-input/CheckboxInput';
import { EmailInput } from '../../../../shared/ui/inputs/email-input/EmailInput';
import { PasswordInput } from '../../../../shared/ui/inputs/password-input/PasswordInput';
import { PhoneInput } from '../../../../shared/ui/inputs/phone-input/PhoneInput';
import { TextInput } from '../../../../shared/ui/inputs/text-input/TextInput';
import { useSignUp } from '../../model/auth.hooks';
import styles from './styles.module.css';

type UserSignUpFormProps = {
  onSubmit?: () => void;
};

type FormStateInput = z.input<typeof signUpSchema>;
type FormStateOutput = z.output<typeof signUpSchema>;

export const UserSignUpForm = (props: UserSignUpFormProps) => {
  const { onSubmit } = props;
  const { mutateAsync: signUp } = useSignUp();
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormStateInput, unknown, FormStateOutput>({ mode: 'all', resolver: zodResolver(signUpSchema) });

  const handleFormSubmit = async (data: FormStateOutput) => {
    try {
      await signUp(data);
    } catch (error) {
      if (error instanceof ServerValidationError) {
        error.handleFormErrors(setError);

        return;
      }
    }

    reset();
    onSubmit?.();
  };

  return (
    <form className={styles.userSignUpForm} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.userSignUpFormContent}>
        <h2 className={styles.userSignUpFormTitle}>Add your details</h2>

        <div className={styles.userSignUpFormFields}>
          <PhoneInput
            className={styles.userSignUpFormFieldA}
            error={errors.phone?.message}
            inputProps={{ placeholder: 'Phone', ...register('phone') }}
          />

          <EmailInput
            className={styles.userSignUpFormFieldB}
            error={errors.email?.message}
            inputProps={{ placeholder: 'Email', ...register('email') }}
          />

          {/*TODO Mb should move to NameInput or smth*/}
          <TextInput
            className={styles.userSignUpFormFieldC}
            error={errors.firstName?.message}
            prefix={<UserCircleIcon width={24} height={24} />}
            inputProps={{ placeholder: 'Name', ...register('firstName') }}
          />

          <TextInput
            className={styles.userSignUpFormFieldD}
            error={errors.lastName?.message}
            prefix={<UserCircleIcon width={24} height={24} />}
            inputProps={{ placeholder: 'Surname', ...register('lastName') }}
          />

          <PasswordInput
            className={styles.userSignUpFormFieldE}
            error={errors.password?.message}
            inputProps={{
              placeholder: 'Password',
              ...register('password'),
            }}
          />

          <PasswordInput
            className={styles.userSignUpFormFieldF}
            error={errors.confirmPassword?.message}
            inputProps={{
              placeholder: 'Confirm Password',
              ...register('confirmPassword'),
            }}
          />
        </div>

        <div className={styles.userSignUpFormLegal}>
          <CheckboxInput {...register('isPromoChecked')}>
            I agree to receive information and promotional materials
          </CheckboxInput>

          <CheckboxInput error={errors.isLegalChecked?.message} {...register('isLegalChecked')}>
            I agree to the terms and conditions and give my consent to the processing of my personal data by AO
            "Movierama" in accordance with the Federal Law of 27.07.2006 №152-FZ "About Personal Data", on the terms and
            for the purposes, as defined in the Privacy Policy
          </CheckboxInput>
        </div>

        <Button type="submit" disabled={!isValid}>
          Register
        </Button>
      </div>
    </form>
  );
};
