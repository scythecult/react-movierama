import { useMutation } from '@tanstack/react-query';
import { signIn, signOut, signUp } from '../../../entities/auth/api/auth.actions';
import { useInvalidateAuth } from '../../../entities/auth/api/auth.hooks';

export const useSignUp = () => {
  const invalidateAuth = useInvalidateAuth();

  const authMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => invalidateAuth(),
  });

  return authMutation;
};

export const useSignIn = () => {
  const invalidateAuth = useInvalidateAuth();

  const authMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => invalidateAuth(),
  });

  return authMutation;
};

export const useSignOut = () => {
  const invalidateAuth = useInvalidateAuth();

  const authMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => invalidateAuth(),
  });

  return () => authMutation.mutate();
};
