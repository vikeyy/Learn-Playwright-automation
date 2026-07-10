# Playwright Beginner Project

Simple Playwright + TypeScript automation for [qademo.com](https://qademo.com).

This project is built for **hands-on learning** — one basic E2E flow with comments explaining each concept.

## What you will learn

| Concept | Where to look |
|---------|---------------|
| Page Object Model (POM) | `tests/pages/BasePage.ts`, `tests/pages/ProductPage.ts` |
| OOP — Inheritance | `ProductPage extends BasePage` |
| OOP — Encapsulation | Private XPath fields inside `ProductPage` |
| OOP — Abstraction | `abstract class BasePage` |
| OOP — Polymorphism | Each page implements `getPageTitle()` differently |
| Custom fixtures | `tests/fixtures/fixtures.ts` |
| Test hooks | `beforeAll` and `beforeEach` in `tests/e2e-basic-flow.spec.ts` |
| XPath locators | Private fields in `ProductPage.ts` |
| Config (timeouts, browsers, env) | `playwright.config.ts` |
| Artifacts on failure | Screenshot, video, trace in `playwright.config.ts` |

## Project structure

```
├── playwright.config.ts       # Timeouts, browsers, artifacts, env vars
├── package.json
├── .env                       # BASE_URL and login credentials (not committed)
└── tests/
    ├── e2e-basic-flow.spec.ts # Single E2E test with hooks
    ├── fixtures/
    │   └── fixtures.ts        # Custom productPage fixture
    ├── data/
    │   └── testData.ts        # User credentials and URLs
    └── pages/
        ├── BasePage.ts        # Parent page class (shared waits + navigation)
        └── ProductPage.ts     # Login, catalog, cart actions (XPath)
```

## E2E flow

1. Open home page
2. Click Sign In
3. Login with standard user
4. View product catalog
5. Add first product to cart
6. Open cart and verify cart page

## Getting started

```bash
npm install
npx playwright install
npx playwright test
```

```bash
# Run with browser visible
npx playwright test --headed

# Run only the E2E test on Chrome
npx playwright test tests/e2e-basic-flow.spec.ts --project=chromium

# View HTML report after a run
npx playwright show-report
```

## Environment variables

Create a `.env` file in the project root:

```
BASE_URL=https://qademo.com
USER_USERNAME=standard_user
USER_PASSWORD=standard123
```
