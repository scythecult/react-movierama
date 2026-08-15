import { Button } from '../../../../shared/ui/button/Button';
import styles from './styles.module.css';

type UserRestoreFormProps = {
  onBackToLogin: () => void;
};

export const UserRestoreForm = (props: UserRestoreFormProps) => {
  const { onBackToLogin } = props;

  return (
    <div className={styles.userRestoreForm}>
      <h2 className={styles.userRestoreFormTitle}>Restore password</h2>
      <p>
        To recover your password, please provide the email address or phone number you used during registration. We will
        send you a message with instructions on how to proceed.
      </p>
      <Button onClick={onBackToLogin}>Back to Login</Button>
    </div>
  );
};
