# playwright-web-framework

End-to-end UI tests written with [Playwright](https://playwright.dev/) against the
[SDET Unicorns practice site](https://practice.sdetunicorns.com). Tests run across
Chromium, Firefox, and WebKit.

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
npx playwright install        # download the browser binaries
```

## Running the tests

```bash
npx playwright test                      # all tests, all browsers
npx playwright test --project=chromium   # a single browser
npx playwright test home.spec.ts         # a single file
npx playwright test home.spec.ts:31      # a single test (by line number)
npx playwright test --ui                 # interactive UI mode
npx playwright show-report               # open the last HTML report
```

## Project layout

```
tests/
  home.spec.ts      navigation, titles, nav links
  blog.spec.ts      recent-posts widget
  contact.spec.ts   contact form submission + soft assertions
playwright.config.ts
```

## Configuration notes

These settings in [`playwright.config.ts`](playwright.config.ts) keep the suite stable
against a slow, shared, live site:

- **`navigationTimeout: 60_000`** — the live site is slow to fire its `load` event;
  the default 30s `goto` timeout caused intermittent failures.
- **`timeout: 90_000`** — the per-test timeout, raised above the default 30s so the
  longer `navigationTimeout` can actually take effect (a 30s test timeout would cut a
  slow navigation off first).
- **`retries: process.env.CI ? 2 : 1`** — one local retry absorbs the site's occasional
  slow loads so a transient blip doesn't fail the run.
- **`trace: 'on-first-retry'`** — a trace is captured when a test is retried; open it
  with `npx playwright show-report`.
