# Module 3 · Topic 1 — Data-Driven Testing with JSON (companion project)

Flash QE Specialist Track · redAcademy

## Setup
```bash
npm install
npx playwright install chromium
```

## Run
```bash
npm test                              # all 7 tests (starts the demo app automatically)
npm run test:list                     # see the 5 tests generated from transfers.json
npx playwright test -g "TRF-003"      # run one data row
npm run test:data                     # data-integrity checks (no browser needed)
npx playwright show-report            # open the HTML report
```

## Files
| Path | Purpose |
| --- | --- |
| `testdata/transfers.json` | Data source: input + expected output per case |
| `tests/types/transfer.ts` | `TransferCase` interface — the shape of one row |
| `tests/transfer.data-driven.spec.ts` | One test body, looped over every row |
| `tests/transfer.data-integrity.spec.ts` | Guards the data file itself (unique ids, valid statuses) |
| `demo-app/` | Flash wallet demo app (`/transfer`), resets to R1,000.00 on every load |
| `playwright.config.ts` | `baseURL` + `webServer` that boots the demo app |

## Lab
1. Add `TRF-006` — negative amount `-50.00` → error `Amount must be greater than R0.00`, balance `R1,000.00`.
2. Run `npx playwright test -g "TRF-006"`.
3. Give TRF-006 the id `TRF-001` on purpose. Run `npm run test:list` (no error: the titles still differ), then `npm run test:data` — the integrity test catches it. Fix it.

Verified: Playwright 1.63 test runner, all 7 tests passing against the demo app.
