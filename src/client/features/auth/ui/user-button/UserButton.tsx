import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { authQueries } from '../../../../entities/auth/api';
import { CustomIconName } from '../../../../shared/ui/custom-icon/constants';
import { IconButton } from '../../../../shared/ui/icon-button/IconButton';
import { ModalPortal } from '../../../../shared/ui/modal/Modal.portal';
import { UserLoginModal } from '../user-login-modal/UserLoginModal';

export type UserButtonProps = PropsWithClassName;

export const UserButton = (props: UserButtonProps) => {
  const { className } = props;
  const {
    data: { id, email, firstName, lastName },
  } = useQuery(authQueries.getOne());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = Boolean(id);
  const userTextFinal = email ? `${firstName} ${lastName}` : 'Load...';

  return (
    <>
      <IconButton className={className} name={CustomIconName.ACCOUNT} onClick={() => setIsModalOpen(true)}>
        {userTextFinal}
      </IconButton>

      {isModalOpen && (
        <ModalPortal onClose={() => setIsModalOpen(false)}>
          {!isLoggedIn && <UserLoginModal onClose={() => setIsModalOpen(false)} />}

          {isLoggedIn && <div>Loggedin user info {email}l</div>}
        </ModalPortal>
      )}
    </>
  );
};
