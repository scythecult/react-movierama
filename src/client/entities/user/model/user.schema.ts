import z from 'zod';
import { emailSchema, passwordSchema } from '../../../shared/lib/auth/schemas';

export const loginSchema = z.object({
  email: emailSchema.optional(),
  phone: z.string().min(10, 'Phone number must be at least 10 characters').optional(),
  password: passwordSchema,
  isPersistent: z.boolean(),
});
