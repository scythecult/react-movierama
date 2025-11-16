import type { User } from '../../../../../common/types/user';
import type { WithMiddlewareStateCreator } from '../../appStore';

type UserSliceState = {
  user: User;
};

export type UserSlice = UserSliceState;

export const createUserSlice: WithMiddlewareStateCreator<UserSlice> = () => ({
  user: { firstName: '', lastName: '', email: '', password: '', gender: '', wantsPromotions: false, phone: '' },
});
