import { cleanup } from '@testing-library/react';

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

afterEach(() => {
  cleanup();
});
