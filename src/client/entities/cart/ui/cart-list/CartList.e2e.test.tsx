import { expect, type Page, test } from '@playwright/test';
import { AppRoute } from '../../../../../common/constants/routes';
import { toggleFirstSeat } from '../../../../../tests/utils';

test.describe('CartList', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await page.goto(AppRoute.ORDER);

    await page.waitForTimeout(1000);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should have all necessary elements', async () => {
    await toggleFirstSeat(page);

    await expect(page.getByTestId('cart')).toBeVisible();
    await expect(page.getByTestId('cart-title').and(page.getByRole('heading'))).toBeVisible();
    await expect(page.getByTestId('cart-item').and(page.getByRole('listitem'))).toBeVisible();
    await expect(page.getByTestId('cart-item-place').and(page.getByRole('paragraph'))).toBeVisible();
    await expect(page.getByTestId('cart-item-seat-type').and(page.getByRole('paragraph'))).toBeVisible();
    await expect(page.getByTestId('ticket-type-select')).toBeVisible();
    await expect(page.getByTestId('cart-price')).toBeVisible();
    await expect(page.getByTestId('cart-remove-button').and(page.getByRole('button'))).toBeVisible();
  });

  test('should change ticket type', async () => {
    const selectElement = page.getByTestId('ticket-type-select').first();
    const priceElement = page.getByTestId('cart-price').first();

    const selectValue = await selectElement.inputValue();
    const priceText = priceElement.textContent();

    await selectElement.selectOption('child');

    expect(selectValue).not.toBe(selectElement.inputValue());
    expect(priceText).not.toBe(priceElement.textContent());
  });

  test('should remove selected ticket from list', async () => {
    const removeElement = page.getByTestId('cart-remove-button');

    await expect(removeElement).toBeVisible();

    await removeElement.click();

    const listItems = await page.getByTestId('cart-item').all();

    await expect(page.getByTestId('cart-item').and(page.getByRole('listitem'))).not.toBeVisible();
    expect(listItems.length).toBe(0);
  });
});
