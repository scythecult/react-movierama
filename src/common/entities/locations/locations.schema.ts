import z from 'zod';

export const locationSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const setCurrentLocationSchema = z.object({
  locationId: z.number().int().positive(),
});

export const locationParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
