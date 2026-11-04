import z from 'zod';

export const getHallplanQuerySchema = z.object({
  locationId: z.coerce.number().int().positive().optional(),
});
