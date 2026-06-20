# playwright-web-framework

End-to-end UI tests written with [Playwright](https://playwright.dev/) (TypeScript) against the
[SDET Unicorns practice site](https://practice.sdetunicorns.com). Tests run across Chromium,
Firefox, and WebKit, follow the **Page Object Model**, generate data with [Faker](https://fakerjs.dev/),
and report through the Playwright HTML report and [Allure](https://allurereport.org/).

[![Playwright Tests](https://github.com/sharisroy/playwright-web-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/sharisroy/playwright-web-framework/actions/workflows/playwright.yml)

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
npm test                                 # all tests, all browsers
npx playwright test --project=chromium   # a single browser
npx playwright test home.spec.ts         # a single file
npx playwright test -g "Access Orders"   # tests matching a title
npx playwright test --ui                 # interactive UI mode
npm run report                           # open the last HTML report
```

## Allure report

Every test runs with `trace: 'on'`, so the Playwright **trace is attached to each test** in the
Allure results (`allure-results/`). Generate and open the report:

```bash
npm run allure:serve       # build a temporary report and open it (quickest)
# or, for a persistent report:
npm run allure:generate    # build allure-report/ from allure-results/
npm run allure:open        # open the generated report
```

Each test's **trace.zip is attached** — download it and open with
`npx playwright show-trace <trace.zip>` to step through the run (DOM snapshots, network, console).

## Project layout

```
tests/                       the specs
  home.spec.ts               navigation, titles, nav links, get-started
  blog.spec.ts               recent-posts widget
  contact.spec.ts            contact form (Faker data) + soft assertions
  upload_files.spec.ts       file upload (two techniques) via a component
  wait.spec.ts               wait strategies: hard / condition / assertion
  account.spec.ts            login + access Orders/Downloads
pages/                       Page Objects, one per page
  home.page.ts, blog.page.ts, contact.page.ts, cart.page.ts
  component/                 reusable widgets shared across pages
    upload.compononent.ts
config/
  credentials.ts             login credentials read by the account tests
test-data/                   static fixtures (test_image.png, 5MB_sample_file.pdf)
playwright.config.ts
tsconfig.json
.github/workflows/
  playwright.yml             CI: runs the suite and publishes the Allure report
```

## How it's organized

- **Page Object Model** — each page's selectors and actions live in a class under `pages/`
  (e.g. `HomePage.navigate()`, `ContactPage.fillForm(...)`). Specs read at the behavior level
  and the selectors live in one place.
- **Components** — reusable widgets that appear across pages live in `pages/component/`
  (e.g. `UploadComponent.uploadFile(...)` encapsulates the file-upload flow).
- **Test data** — random data is generated with Faker (see `contact.spec.ts`); shared values
  like login credentials live in `config/credentials.ts`.
- **Setup hooks** — each spec uses `test.beforeEach` to construct its page object and navigate,
  so tests start from a clean, prepared state.

## Configuration notes

These settings in [`playwright.config.ts`](playwright.config.ts) keep the suite stable
against a slow, shared, live site:

- **`baseURL: 'https://practice.sdetunicorns.com'`** — tests and page objects navigate with
  relative paths (`page.goto('/cart')`, `homePage.navigate('/about')`), so the host lives in one place.
- **`navigationTimeout: 60_000`** — the live site is slow to fire its `load` event; the default
  30s `goto` timeout caused intermittent failures.
- **`timeout: 90_000`** — the per-test timeout, raised above the default 30s so the longer
  `navigationTimeout` can actually take effect (a 30s test timeout would cut a slow navigation off first).
- **`retries: process.env.CI ? 2 : 1`** — one local retry absorbs the site's occasional slow
  loads so a transient blip doesn't fail the run.
- **`trace: 'on'`** — a trace is recorded for every test and attached to the Allure report;
  open it with the Playwright trace viewer.
- **`reporter: [['html'], ['allure-playwright']]`** — both the built-in HTML report and Allure.

## Continuous Integration

[`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) runs the full suite on every
push and pull request to `main`/`master` (Node LTS, all three browsers). The config is CI-aware via
`process.env.CI` — retries, a single worker, and headless Chromium turn on automatically.

On pushes to the default branch the workflow builds the **Allure report (with history)** and publishes
it to **GitHub Pages**, so every run updates a browsable report with trend graphs:

- Report: <https://sharisroy.github.io/playwright-web-framework/>
- The Playwright HTML report is also uploaded as a downloadable artifact on every run.

One-time setup: after the first run creates the `gh-pages` branch, enable
**Settings → Pages → Source: `gh-pages` branch**.
