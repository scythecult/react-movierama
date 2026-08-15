import z from 'zod';
import { emailSchema, passwordSchema } from '../../schemas';

export const userSchema = z.object({
  id: z.string(),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  firstName: z.string(),
  lastName: z.string(),
  email: emailSchema,
  password: passwordSchema,
  isPromoChecked: z.boolean().optional(),
  isLegalChecked: z.boolean().refine((isLegalChecked) => isLegalChecked, {
    message: 'You must agree to the personal agreement',
  }),
});

const contactSchema = z.discriminatedUnion('tab', [
  z.object({
    tab: z.literal('Phone'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    email: emailSchema.optional(),
  }),
  z.object({
    tab: z.literal('Email'),
    email: emailSchema,
    phone: z.string().min(10, 'Phone number must be at least 10 characters').optional(),
  }),
]);

export const signInSchema = contactSchema.and(
  z.object({
    password: passwordSchema,
    isPersistent: z.boolean().optional(),
  }),
);

export const signUpSchema = userSchema
  .omit({ id: true })
  .and(
    z.object({
      confirmPassword: z.string().min(1, 'Confirm  password is required'),
    }),
  )
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const signOutSchema = z.object({
  email: emailSchema,
});
