import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import type z from 'zod';
import { AppRoute } from '../../../../../common/constants/routes';
import { signInSchema } from '../../../../../common/entities/auth';
import { ServerValidationError } from '../../../../shared/api/error/error';
import { Button } from '../../../../shared/ui/button/Button';
import { CheckboxInput } from '../../../../shared/ui/inputs/checkbox-input/CheckboxInput';
import { EmailInput } from '../../../../shared/ui/inputs/email-input/EmailInput';
import { PasswordInput } from '../../../../shared/ui/inputs/password-input/PasswordInput';
import { PhoneInput } from '../../../../shared/ui/inputs/phone-input/PhoneInput';
import { Tabs } from '../../../../shared/ui/tabs/Tabs';
import { useSignIn } from '../../model/auth.hooks';
import styles from './styles.module.css';

type UserSignInFormProps = {
  onRestorePassword?: () => void;
  onSubmit?: () => void;
};

const SignInMethodName = {
  EMAIL: 'Email',
  PHONE: 'Phone',
} as const;

type SignInMethodValue = (typeof SignInMethodName)[keyof typeof SignInMethodName];

type FormStateInput = z.input<typeof signInSchema>;
type FormStateOutput = z.output<typeof signInSchema>;

export const UserSignInForm = (props: UserSignInFormProps) => {
  const { onRestorePassword, onSubmit } = props;
  const { mutateAsync: signIn } = useSignIn();
  const {
    register,
    reset,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormStateInput, unknown, FormStateOutput>({
    mode: 'all',
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', phone: '', tab: SignInMethodName.EMAIL, isPersistent: false },
    shouldUnregister: true,
  });

  const handleFormSubmit = async (data: FormStateOutput) => {
    try {
      await signIn(data);
    } catch (error) {
      if (error instanceof ServerValidationError) {
        console.error(error.errorMap);
        error.handleFormErrors(setError);

        return;
      }
    }

    reset();
    onSubmit?.();
  };

  const tabs = [
    {
      label: SignInMethodName.EMAIL,
      content: () => (
        <EmailInput
          error={errors.email?.message}
          inputProps={{ placeholder: 'Email', ...register('email', { shouldUnregister: true }) }}
        />
      ),
    },
    {
      label: SignInMethodName.PHONE,
      content: () => (
        <PhoneInput
          error={errors.phone?.message}
          inputProps={{ placeholder: 'Phone', ...register('phone', { shouldUnregister: true }) }}
        />
      ),
    },
  ];

  const handleTabChange = (label: SignInMethodValue) => {
    setValue('tab', label, { shouldValidate: true });
    clearErrors();
  };

  return (
    <form className={styles.userSignInForm} noValidate autoComplete="false" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.userSignInFormFields}>
        <h2 className={styles.userSignInFormTitle}>Auth method</h2>

        <Tabs className={styles.userSignInFormTabs} items={tabs} onChange={handleTabChange} />

        {/*For default tab value activation*/}
        <input type="hidden" {...register('tab')} />

        <PasswordInput
          error={errors.password?.message}
          inputProps={{
            placeholder: 'Password',
            ...register('password'),
          }}
        />

        <div className={styles.userSignInFormActions}>
          <CheckboxInput {...register('isPersistent')}>Remember Me</CheckboxInput>

          <Button className={styles.userSignInFormForgotPasswordButton} onClick={onRestorePassword} type="button">
            Forgot Password?
          </Button>
        </div>

        <Button type="submit" disabled={!isValid}>
          Login
        </Button>
      </div>

      <div className={styles.userSignInFormPrivacy}>
        <p className={styles.userSignInFormPrivacyText}>
          By clicking the login button, you accept the terms of the{' '}
          <Link className={styles.userSignInFormPrivacyLink} to={AppRoute.PRIVACY}>
            User Agreement
          </Link>
          .
        </p>
      </div>
    </form>
  );
};
