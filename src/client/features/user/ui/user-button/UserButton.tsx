import { CustomIconName } from '../../../../shared/ui/custom-icon/constants';
import { IconButton } from '../../../../shared/ui/icon-button/IconButton';
import { useAppStore } from '../../../../shared/zustand/useAppStore';

export type UserButtonProps = PropsWithClassName;

export const UserButton = (props: UserButtonProps) => {
  const { className } = props;
  const user = useAppStore((state) => state.user);
  const userTextFinal = user.email ? `${user.firstName} ${user.lastName}` : 'Personal Account';

  return (
    <IconButton className={className} name={CustomIconName.ACCOUNT}>
      {userTextFinal}
    </IconButton>
  );
};
