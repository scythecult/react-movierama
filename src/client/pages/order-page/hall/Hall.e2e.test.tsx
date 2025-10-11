import { expect, type Page, test } from '@playwright/test';
import { AppRoute } from '@/client/lib/constants/routes';

test.describe('Hall', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Open a new browser page.
    await page.goto(AppRoute.ORDER_PAGE); // Go to specific URL
  });

  test.afterAll(async () => {
    await page.close(); // Close the browser.
  });

  test('should have all necessary elements', async () => {
    await expect(page.getByTestId('hall')).toBeVisible();
    await expect(page.getByTestId('hall-screen')).toBeVisible();
    await expect(page.getByTestId('seats-container')).toBeVisible();

    const seats = await page.locator('seat').all();

    for (const seat of seats) {
      await expect(seat).toBeVisible();
    }
  });

  test('should select seat', async () => {
    const seatElement = page.getByTestId('seat').and(page.getByRole('button')).first();

    await expect(seatElement).toHaveAttribute('data-test-selected', 'false');
    await expect(seatElement).toContainText('1');

    seatElement.click();

    await expect(seatElement).toHaveAttribute('data-test-selected', 'true');
  });
});
