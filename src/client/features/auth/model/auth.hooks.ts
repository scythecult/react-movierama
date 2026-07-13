import { useMutation } from '@tanstack/react-query';
import { signIn, signUp } from '../../../entities/auth/api/auth.actions';
import { useInvalidateAuth } from '../../../entities/auth/api/auth.hooks';
import type { UserData, UserSignInRequest } from '../../../entities/auth/model/user.types';

export const useSignUp = () => {
  const invalidateAuth = useInvalidateAuth();

  const authMutation = useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      // Invalidate only necessary queries
      await invalidateAuth();
    },
  });

  return (data: UserData) => authMutation.mutate(data);
};

export const useSignIn = () => {
  const invalidateAuth = useInvalidateAuth();

  const authMutation = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      // Invalidate only necessary queries
      await invalidateAuth();
    },
  });

  return (data: UserSignInRequest) => authMutation.mutate(data);
};
