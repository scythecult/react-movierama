import z from 'zod';

export const validateBoolean = () => z.enum(['true', 'false']).transform((value) => value === 'true');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'At least one uppercase letter')
  .regex(/[0-9]/, 'At least one number');

export const emailSchema = z.email('Please enter a valid email address');
