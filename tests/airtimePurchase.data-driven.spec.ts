import { test, expect } from '@playwright/test';
import airtimePurchase from '../testdata/airtimeActivity.json';
import type { AirtimePurchase } from './types/airtimePurchase';

const cases = airtimePurchase as AirtimePurchase[];

test.describe('Airtime purchase — data-driven', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/airtime');
  });

  for (const tc of cases) {
    test(`${tc.caseId}: ${tc.scenario}`, async ({ page }) => {
      await page.getByRole('combobox', { name: 'Network' }).selectOption(tc.purchase.network);
      await page.getByLabel('Cellphone number').fill(tc.purchase.cellphone);
      await page.getByLabel('Airtime amount (R)').fill(tc.purchase.amount);
      await page.getByRole('button', { name: 'Buy airtime' }).click();

      const status = page.getByTestId('airtime-result');
      await expect(status).toHaveAttribute('data-result', tc.expect.outcome);
      await expect(status).toHaveText(tc.expect.message);
      await expect(page.getByTestId('balance')).toHaveText(tc.expect.walletBalance);
    });
  }
});
