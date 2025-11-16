import { expect, type Page, test } from '@playwright/test';
import { AppRoute } from '../../../common/constants/routes';

test.describe('MainPage', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(AppRoute.ROOT);
  });

  test.afterAll(async () => {
    page.close();
  });

  test('should have all necessary elements', async () => {
    await expect(page.getByTestId('slider')).toBeVisible();
    await expect(page.getByTestId('link-bar')).toBeVisible();
    await expect(page.getByTestId('films-list')).toBeVisible();
    await expect(page.getByTestId('news-list')).toBeVisible();
  });
});
