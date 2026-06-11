import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { userQueries } from '../../../../entities/user/api';
import { CustomIconName } from '../../../../shared/ui/custom-icon/constants';
import { IconButton } from '../../../../shared/ui/icon-button/IconButton';
import { ModalPortal } from '../../../../shared/ui/modal/Modal.portal';
import { UserLoginModal } from '../user-login-modal/UserLoginModal';

export type UserButtonProps = PropsWithClassName;

export const UserButton = (props: UserButtonProps) => {
  const { className } = props;
  const {
    data: { email, firstName, lastName },
  } = useQuery(userQueries.getOne());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userTextFinal = email ? `${firstName} ${lastName}` : 'Personal Account';

  return (
    <>
      <IconButton className={className} name={CustomIconName.ACCOUNT} onClick={() => setIsModalOpen(true)}>
        {userTextFinal}
      </IconButton>

      {isModalOpen && (
        <ModalPortal onClose={() => setIsModalOpen(false)}>
          <UserLoginModal />
        </ModalPortal>
      )}
    </>
  );
};
