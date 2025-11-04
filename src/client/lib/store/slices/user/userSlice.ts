import type { WithMiddlewareStateCreator } from '../../appStore';

type UserSliceState = {
  user: {
    name: string;
  };
};

type UserSliceActions = {
  setUsername: (name: string) => void;
};

export type UserSlice = UserSliceState & UserSliceActions;

export const createUserSlice: WithMiddlewareStateCreator<UserSlice> = (set) => ({
  user: { name: '' },
  setUsername: (name) =>
    set(({ user }) => ({
      user: { ...user, name },
    })),
});
