import { type BrowserContext, expect, type Page, test } from '@playwright/test';
import { AppRoute } from '../../../common/constants/routes';

test.describe('Main', () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto(AppRoute.ROOT);
  });

  test.afterAll(async () => {
    await context.close();
    await page.close();
  });

  test('should have all necessary elements', async () => {
    await expect(page.getByTestId('slider')).toBeVisible();
    await expect(page.getByTestId('link-bar')).toBeVisible();
    await expect(page.getByTestId('films-list')).toBeVisible();
    await expect(page.getByTestId('news-list')).toBeVisible();
  });
});
