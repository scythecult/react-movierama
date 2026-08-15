import { useState } from 'react';
import { Tabs } from '../../../../shared/ui/tabs/Tabs';
import { UserRestoreForm } from '../user-restore-form/UserRestoreForm';
import { UserSignInForm } from '../user-signin-form/UserSignInForm';
import { UserSignUpForm } from '../user-signup-form/UserSignUpForm';

const Action = {
  SIGN_IN: 'Login',
  SIGN_UP: 'Register',
  INFO: 'Info',
  RESTORE_PASSWORD: 'Restore Password',
};

type UserLoginModalProps = {
  onClose?: () => void;
};

export const UserLoginModal = (props: UserLoginModalProps) => {
  const { onClose } = props;
  const [currentAction, setCurrentAction] = useState(Action.SIGN_IN);
  const isRestoreFormVisible = currentAction === Action.RESTORE_PASSWORD;

  const tabs = [
    {
      label: Action.SIGN_IN,
      content: () => (
        <UserSignInForm onSubmit={onClose} onRestorePassword={() => setCurrentAction(Action.RESTORE_PASSWORD)} />
      ),
    },
    {
      label: Action.SIGN_UP,
      content: () => <UserSignUpForm onSubmit={onClose} />,
    },
    {
      label: Action.INFO,
      content: () => <div>INFO</div>,
    },
  ];

  return (
    <>
      {!isRestoreFormVisible && <Tabs items={tabs} />}

      {isRestoreFormVisible && <UserRestoreForm onBackToLogin={() => setCurrentAction(Action.SIGN_IN)} />}
    </>
  );
};
