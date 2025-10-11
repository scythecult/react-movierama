import type { StateCreator } from 'zustand';

type UserSliceState = {
  user: {
    name: string;
  };
};

type UserSliceActions = {
  setUsername: (name: string) => void;
};

export type UserSlice = UserSliceState & UserSliceActions;

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: { name: 'check' },
  setUsername: (name) =>
    set(({ user }) => ({
      user: { ...user, name },
    })),
});
