import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import type z from 'zod';
import { AppRoute } from '../../../../../common/constants/routes';
import { loginSchema } from '../../../../entities/auth/model/auth.schema';
import { Button } from '../../../../shared/ui/button/Button';
import { CheckboxInput } from '../../../../shared/ui/inputs/checkbox-input/CheckboxInput';
import { EmailInput } from '../../../../shared/ui/inputs/email-input/EmailInput';
import { PasswordInput } from '../../../../shared/ui/inputs/password-input/PasswordInput';
import { PhoneInput } from '../../../../shared/ui/inputs/phone-input/PhoneInput';
import { Tabs } from '../../../../shared/ui/tabs/Tabs';
import { useSignIn } from '../../model/auth.hooks';
import styles from './styles.module.css';

type UserLoginFormProps = {
  onRestorePassword?: () => void;
  onSubmit?: () => void;
};

const LoginAuthMethodName = {
  EMAIL: 'Email',
  PHONE: 'Phone',
};

type FormStateInput = z.input<typeof loginSchema>;
type FormStateOutput = z.output<typeof loginSchema>;

export const UserLoginForm = (props: UserLoginFormProps) => {
  const { onRestorePassword, onSubmit } = props;
  const signIn = useSignIn();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormStateInput, unknown, FormStateOutput>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: { isPersistent: false },
    shouldUnregister: true,
  });

  const handleFormSubmit = (data: FormStateOutput) => {
    signIn(data);
    reset();
    onSubmit?.();
  };

  const tabs = [
    {
      label: LoginAuthMethodName.EMAIL,
      content: (
        <EmailInput
          error={errors.email?.message}
          inputProps={{ placeholder: 'Email', ...register('email', { shouldUnregister: true }) }}
        />
      ),
    },
    {
      label: LoginAuthMethodName.PHONE,
      content: (
        <PhoneInput
          error={errors.phone?.message}
          inputProps={{ placeholder: 'Phone', ...register('phone', { shouldUnregister: true }) }}
        />
      ),
    },
  ];

  return (
    <form className={styles.userLoginForm} noValidate autoComplete="false" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.userLoginFormFields}>
        <h2 className={styles.userLoginFormTitle}>Auth method</h2>

        {/*TODO Fix shouldUnregister*/}
        <Tabs className={styles.userLoginFormTabs} items={tabs} />

        <PasswordInput
          error={errors.password?.message}
          inputProps={{
            placeholder: 'Password',
            ...register('password'),
          }}
        />

        <div className={styles.userLoginFormActions}>
          <CheckboxInput {...register('isPersistent')}>Remember Me</CheckboxInput>

          <Button className={styles.userLoginFormForgotPasswordButton} onClick={onRestorePassword} type="button">
            Forgot Password?
          </Button>
        </div>

        <Button type="submit" disabled={!isValid}>
          Login
        </Button>
      </div>

      <div className={styles.userLoginFormPrivacy}>
        <p className={styles.userLoginFormPrivacyText}>
          By clicking the login button, you accept the terms of the{' '}
          <Link className={styles.userLoginFormPrivacyLink} to={AppRoute.PRIVACY}>
            User Agreement
          </Link>
          .
        </p>
      </div>
    </form>
  );
};
