import type z from 'zod';
import type { signInSchema, signOutSchema, signUpSchema, userSchema } from './auth.schema';

// TODO Possibly rename whole module
export type UserData = z.infer<typeof userSchema>;

export type UserResponse = {
  user: Omit<UserData, 'password'>;
};

export type UserSignInRequest = z.infer<typeof signInSchema>;

export type UserSignUpRequest = z.infer<typeof signUpSchema>;

export type UserSignOutRequest = z.infer<typeof signOutSchema>;
