import { expect, type Page, test } from '@playwright/test';
import { AppPath, AppRoute } from '../../../common/constants/routes';
import { toggleFirstSeat } from '../../../tests/utils';

test.describe('Order', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await page.goto(AppRoute.ORDER);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should have all necessary elements', async () => {
    await expect(page.getByTestId('layout')).toBeVisible();
    await expect(page.getByTestId('order-footer')).toBeVisible();

    const paymentElement = page.getByTestId('payment-button').and(page.getByRole('link'));

    await expect(paymentElement).toBeVisible();
    await expect(paymentElement).toHaveAttribute('href', `${AppRoute.ORDER}/${AppPath.CHECKOUT}`);

    await expect(paymentElement).toHaveAttribute('data-test-disabled', 'true');
  });

  test('should enable payment button on seat select', async () => {
    await toggleFirstSeat(page);

    const paymentElement = page.getByTestId('payment-button').and(page.getByRole('link'));

    await expect(paymentElement).toBeVisible();
    await expect(paymentElement).toHaveAttribute('href', `${AppRoute.ORDER}/${AppPath.CHECKOUT}`);
    await expect(paymentElement).toHaveAttribute('data-test-disabled', 'false');
  });
});
