import z from 'zod';
import {
  DEFAULT_API_PORT,
  DEFAULT_API_URL,
  DEFAULT_APP_MODE,
  DEFAULT_APP_PORT,
  DEFAULT_APP_URL,
  DEFAULT_NODE_ENV,
  DEFAULT_SSR_PORT,
  DEFAULT_SSR_URL,
} from '../common/constants/defaults';
import { validateBoolean } from '../common/schemas/common';

const env = {
  isE2eTestDebugMode: process.env.IS_E2E_TEST_DEBUG_MODE,
  nodeEnv: process.env.NODE_ENV,
  appMode: process.env.APP_MODE,
  appPort: process.env.APP_PORT,
  appUrl: process.env.APP_URL,
  apiPort: process.env.API_PORT,
  apiUrl: process.env.API_URL,
  ssrPort: process.env.SSR_PORT,
  ssrUrl: process.env.SSR_URL,
  baseUrl: process.env.BASE_URL,
} as const;

const envSchema = z.object({
  isE2eTestDebugMode: validateBoolean().default(false),
  nodeEnv: z.enum(['development', 'test', 'production']).default(DEFAULT_NODE_ENV),
  appMode: z.enum(['local', 'watch', 'test']).default(DEFAULT_APP_MODE),
  appPort: z.coerce.number().default(DEFAULT_APP_PORT),
  appUrl: z.url().default(DEFAULT_APP_URL),
  apiPort: z.coerce.number().default(DEFAULT_API_PORT),
  apiUrl: z.url().default(DEFAULT_API_URL),
  ssrPort: z.coerce.number().default(DEFAULT_SSR_PORT),
  ssrUrl: z.url().default(DEFAULT_SSR_URL),
  baseUrl: z.string().default(DEFAULT_APP_URL),
});

export const Config = envSchema.parse(env);
