import { useQuery } from '@tanstack/react-query';
import { userQueries } from '../../../../entities/user/api';
import { CustomIconName } from '../../../../shared/ui/custom-icon/constants';
import { IconButton } from '../../../../shared/ui/icon-button/IconButton';

export type UserButtonProps = PropsWithClassName;

export const UserButton = (props: UserButtonProps) => {
  const { className } = props;
  const {
    data: { email, firstName, lastName },
  } = useQuery(userQueries.getOne());
  const userTextFinal = email ? `${firstName} ${lastName}` : 'Personal Account';

  return (
    <IconButton className={className} name={CustomIconName.ACCOUNT}>
      {userTextFinal}
    </IconButton>
  );
};
