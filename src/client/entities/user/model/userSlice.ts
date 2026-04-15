import type { UserData } from './types';

type UserSliceState = {
  user: UserData;
};

export type UserSlice = UserSliceState;

export const createUserSlice: WithMiddlewareStateCreator<UserSlice> = () => ({
  user: { id: -1, firstName: '', lastName: '', email: '', password: '', gender: '', wantsPromotions: false, phone: '' },
});
