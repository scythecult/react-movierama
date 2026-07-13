export type UserData = {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other' | string;
  wantsPromotions: boolean;
};

export type UserResponse = {
  user: UserData;
};

export type UserSignInRequest = {
  password: string;
  isPersistent: boolean;
  email?: string | undefined;
  phone?: string | undefined;
};
