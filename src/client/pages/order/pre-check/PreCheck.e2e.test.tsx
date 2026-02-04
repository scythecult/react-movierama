import { expect, type Page, test } from '@playwright/test';
import { AppRoute } from '../../../../common/constants/routes';
import { toggleFirstSeat } from '../../../../tests/utils';

test.describe('PreCheck', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await page.goto(AppRoute.ORDER);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should have all necessary elements', async () => {
    await toggleFirstSeat(page);

    await expect(page.getByTestId('pre-check')).toBeVisible();
    await expect(page.getByTestId('pre-check-title').and(page.getByRole('heading'))).toBeVisible();
    await expect(page.getByTestId('pre-check-list').and(page.getByRole('list'))).toBeVisible();
    await expect(page.getByTestId('pre-check-item').and(page.getByRole('listitem'))).toBeVisible();
    await expect(page.getByTestId('pre-check-item-place').and(page.getByRole('paragraph'))).toBeVisible();
    await expect(page.getByTestId('pre-check-item-seat-type').and(page.getByRole('paragraph'))).toBeVisible();
    await expect(page.getByTestId('pre-check-item-select')).toBeVisible();
    await expect(page.getByTestId('pre-check-item-price')).toBeVisible();
    await expect(page.getByTestId('pre-check-remove-button').and(page.getByRole('button'))).toBeVisible();
  });

  test('should change ticket type', async () => {
    const selectElement = page.getByTestId('pre-check-item-select').first();
    const priceElement = page.getByTestId('pre-check-item-price').first();

    const selectValue = await selectElement.inputValue();
    const priceText = priceElement.textContent();

    await selectElement.selectOption('child');

    expect(selectValue).not.toBe(selectElement.inputValue());
    expect(priceText).not.toBe(priceElement.textContent());
  });

  test('should remove selected ticket from list', async () => {
    const removeElement = page.getByTestId('pre-check-remove-button');

    await expect(removeElement).toBeVisible();

    await removeElement.click();

    const listItems = await page.getByTestId('pre-check-item').all();

    await expect(page.getByTestId('pre-check-item').and(page.getByRole('listitem'))).not.toBeVisible();
    expect(listItems.length).toBe(0);
  });
});
