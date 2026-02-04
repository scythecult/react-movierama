import type { User } from '../../../../../common/types/user';
import type { WithMiddlewareStateCreator } from '../../appStore';

type UserSliceState = {
  user: User;
};

export type UserSlice = UserSliceState;

export const createUserSlice: WithMiddlewareStateCreator<UserSlice> = () => ({
  user: { id: -1, firstName: '', lastName: '', email: '', password: '', gender: '', wantsPromotions: false, phone: '' },
});
