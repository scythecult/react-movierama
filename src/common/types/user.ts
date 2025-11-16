export type User = {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other' | string;
  wantsPromotions: boolean;
};

export type UserData = {
  user: User;
};
