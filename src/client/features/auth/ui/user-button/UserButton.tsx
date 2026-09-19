import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { authQueries } from '../../../../entities/auth/api';
import { CustomIconName } from '../../../../shared/ui/custom-icon/constants';
import { IconButton } from '../../../../shared/ui/icon-button/IconButton';
import { ModalPortal } from '../../../../shared/ui/modal/Modal.portal';
import { Skeleton } from '../../../../shared/ui/skeleton/Skeleton';
import { useSignOut } from '../../model/auth.hooks';
import { UserLoginModal } from '../user-login-modal/UserLoginModal';
import styles from './styles.module.css';

export type UserButtonProps = PropsWithClassName;

export const UserButton = (props: UserButtonProps) => {
  const { className } = props;
  const {
    data: { id, email, firstName, lastName },
    isFetching,
  } = useQuery(authQueries.getOne());
  const signOut = useSignOut();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = Boolean(id);
  const userTextFinal = email ? `${firstName} ${lastName}` : '';

  const handleUserButtonClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      console.info('redirect to /profile');
    }
  };

  const handleSignOutButtonClick = () => {
    signOut({ email });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.userButton} data-test-id="user-button">
        {!isFetching && (
          <IconButton className={className} name={CustomIconName.ACCOUNT} onClick={handleUserButtonClick}>
            {userTextFinal}
          </IconButton>
        )}

        {isFetching && <Skeleton width="100%" height="100%" />}
      </div>

      {isModalOpen && (
        <ModalPortal onClose={() => setIsModalOpen(false)}>
          {!isLoggedIn && <UserLoginModal onClose={() => setIsModalOpen(false)} />}

          {isLoggedIn && (
            <div>
              Loggedin user info {email}l<button onClick={handleSignOutButtonClick}>Logout</button>
            </div>
          )}
        </ModalPortal>
      )}
    </>
  );
};
