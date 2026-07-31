import { useMutation } from '@tanstack/react-query';
import { signIn, signOut, signUp } from '../../../entities/auth/api/auth.actions';
import { useInvalidateAuth } from '../../../entities/auth/api/auth.hooks';
import type { UserSignInRequest, UserSignOutRequest, UserSignUpRequest } from '../../../entities/auth/model/user.types';

export const useSignUp = () => {
  const invalidateAuth = useInvalidateAuth();

  const authMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => invalidateAuth(),
  });

  return (data: UserSignUpRequest) => authMutation.mutate(data);
};

export const useSignIn = () => {
  const invalidateAuth = useInvalidateAuth();

  const authMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => invalidateAuth(),
  });

  return (data: UserSignInRequest) => authMutation.mutate(data);
};

export const useSignOut = () => {
  const invalidateAuth = useInvalidateAuth();

  const authMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => invalidateAuth(),
  });

  return (data: UserSignOutRequest) => authMutation.mutate(data);
};
