import clsx from 'clsx';
import { useState } from 'react';
import { ModalContent } from '../../../../shared/ui/modal-content/ModalContent';
import { UserLoginForm } from '../user-login-form/UserLoginForm';
import { UserRegisterForm } from '../user-register-form/UserRegisterForm';
import styles from './styles.module.css';

const ActionLabel = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  INFO: 'Info',
};

const ACTION_BUTTONS = Object.values(ActionLabel);

export const UserLoginModal = () => {
  const [currentAction, setCurrentAction] = useState(ActionLabel.LOGIN);

  let bodyContent;

  switch (currentAction) {
    case ActionLabel.LOGIN:
      bodyContent = <UserLoginForm />;
      break;
    case ActionLabel.REGISTER:
      bodyContent = <UserRegisterForm />;
      break;
    case ActionLabel.INFO:
      bodyContent = <div>INFO</div>;
      break;
  }

  const headerContent = ACTION_BUTTONS.map((label) => (
    <button
      key={label}
      className={clsx(styles.userLoginModalButton, { [styles.activeButton]: label === currentAction })}
      onClick={() => setCurrentAction(label)}
    >
      {label}
    </button>
  ));

  return <ModalContent header={headerContent} content={bodyContent} />;
};
