import type { Page } from 'playwright/test';

export const toggleFirstSeat = async (page: Page) => {
  const seatElement = page.getByTestId('seat').and(page.getByRole('button')).first();

  await seatElement.click();
};
