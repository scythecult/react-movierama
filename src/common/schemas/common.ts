import z from 'zod';

export const validateBoolean = () => z.enum(['true', 'false']).transform((value) => value === 'true');
