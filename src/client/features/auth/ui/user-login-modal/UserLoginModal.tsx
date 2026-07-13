import { useState } from 'react';
import { Tabs } from '../../../../shared/ui/tabs/Tabs';
import { UserLoginForm } from '../user-login-form/UserLoginForm';
import { UserRegisterForm } from '../user-register-form/UserRegisterForm';
import { UserRestoreForm } from '../user-restore-form/UserRestoreForm';

const Action = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  INFO: 'Info',
  RESTORE_PASSWORD: 'Restore Password',
};

type UserLoginModalProps = {
  onClose?: () => void;
};

export const UserLoginModal = (props: UserLoginModalProps) => {
  const { onClose } = props;
  const [currentAction, setCurrentAction] = useState(Action.LOGIN);
  const isRestoreFormVisible = currentAction === Action.RESTORE_PASSWORD;

  const tabs = [
    {
      label: Action.LOGIN,
      content: <UserLoginForm onSubmit={onClose} onRestorePassword={() => setCurrentAction(Action.RESTORE_PASSWORD)} />,
    },
    {
      label: Action.REGISTER,
      content: <UserRegisterForm />,
    },
    {
      label: Action.INFO,
      content: <div>INFO</div>,
    },
  ];

  return (
    <>
      {!isRestoreFormVisible && <Tabs items={tabs} />}

      {isRestoreFormVisible && <UserRestoreForm onBackToLogin={() => setCurrentAction(Action.LOGIN)} />}
    </>
  );
};
