import { expect, type Page, test } from '@playwright/test';
import { AppRoute } from '../../../common/constants/routes';
import { selectFirstSeat } from '../../../tests/utils';

test.describe('OrderPage', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(AppRoute.ORDER_PAGE);
  });

  test.afterAll(async () => {
    page.close();
  });

  test('should have all necessary elements', async () => {
    await expect(page.getByTestId('order-page')).toBeVisible();
    await expect(page.getByTestId('order-footer')).toBeVisible();

    const paymentElement = page.getByTestId('payment-button').and(page.getByRole('button'));

    await expect(paymentElement).toBeVisible();
    await expect(paymentElement).toBeDisabled();
  });

  test('should enable payment button on seat select', async () => {
    await selectFirstSeat(page);

    await expect(page.getByTestId('payment-button').and(page.getByRole('button'))).toBeEnabled();
  });
});
