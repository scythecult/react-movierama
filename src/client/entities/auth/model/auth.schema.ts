import z from 'zod';
import { emailSchema, passwordSchema } from '../../../shared/lib/auth/schemas';

export const signInSchema = z.object({
  email: emailSchema.optional(),
  phone: z.string().min(10, 'Phone number must be at least 10 characters').optional(),
  password: passwordSchema,
  isPersistent: z.boolean(),
});

export const signUpSchema = z
  .object({
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    email: emailSchema,
    firstName: z.string().min(1, 'Name is required'),
    lastName: z.string().min(1, 'Surname is required'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm  password is required'),
    isPromoChecked: z.boolean().optional(),
    isLegalChecked: z.boolean().refine((isLegalChecked) => isLegalChecked, {
      message: 'You must agree to the personal agreement',
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
