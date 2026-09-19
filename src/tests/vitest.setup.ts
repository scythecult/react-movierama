import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-id' });

process.env.IS_E2E_TEST_DEBUG_MODE = 'false';
process.env.NODE_ENV = 'test';
process.env.APP_MODE = 'test';
process.env.APP_PORT = '3000';
process.env.APP_URL = 'http://localhost:3000';
process.env.API_PORT = '4000';
process.env.API_URL = 'http://localhost:4000';
process.env.SSR_PORT = '5000';
process.env.SSR_URL = 'http://localhost:5000';
process.env.BCRYPT_SALT_ROUNDS = '10';
process.env.BASE_URL = 'http://localhost:3000';
