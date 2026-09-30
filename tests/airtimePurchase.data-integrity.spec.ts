import { test, expect } from '@playwright/test';
import airtimePurchase from '../testdata/airtimeActivity.json';
import type { AirtimePurchase } from './types/airtimePurchase';

const cases = airtimePurchase as AirtimePurchase[];

test('airtime-activity.json: every case id is unique', () => {
  const ids = cases.map((tc) => tc.caseId);
  expect(new Set(ids).size).toBe(ids.length);
});

test('airtime-activity.json: every case is complete', () => {
  for (const tc of cases) {
    expect(['success', 'error'], `${tc.caseId} status`).toContain(tc.expect.outcome);
    expect(tc.expect.message, `${tc.caseId} message`).toBeTruthy();
    expect(tc.expect.walletBalance, `${tc.caseId} balanceAfter`).toMatch(/^R[\d,]+\.\d{2}$/);
  }
});
