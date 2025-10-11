import { expect, type Page, test } from '@playwright/test';
import { AppRoute } from '@/client/lib/constants/routes';

test.describe('Legend', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(AppRoute.ORDER_PAGE);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should have all necessary elements', async () => {
    await expect(page.getByTestId('legend')).toBeVisible();

    const legendItems = await page.locator('legend-item').all();

    for (const legendItem of legendItems) {
      await expect(legendItem).toBeVisible();
    }
  });
});
