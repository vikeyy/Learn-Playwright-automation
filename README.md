# Playwright Automation Framework

TypeScript + Playwright test automation framework for [qademo.com](https://qademo.com) using the Page Object Model (POM).

## Project structure

```
playwright-automation/
├── playwright.config.ts        # Playwright configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── .env                        # Environment variables (not committed)
├── .gitignore
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions CI
└── tests/
    ├── pages/                  # Page Object classes
    │   ├── BasePage.ts         # Abstract base — shared methods
    │   ├── HomePage.ts
    │   ├── LoginPage.ts
    │   ├── ProductPage.ts
    │   ├── CartPage.ts
    │   └── CheckoutPage.ts
    ├── fixtures/
    │   └── fixtures.ts         # Custom fixtures for page injection
    ├── data/
    │   └── testData.ts         # Centralised test data
    ├── utils/
    │   └── helpers.ts          # Reusable utility functions
    ├── home.spec.ts
    ├── login.spec.ts
    ├── product.spec.ts
    ├── cart.spec.ts
    └── api.spec.ts
```

## Getting started

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npx playwright test

# Run with browser visible
npx playwright test --headed

# Run in interactive UI mode
npx playwright test --ui

# Run a specific file
npx playwright test tests/login.spec.ts

# View HTML report
npx playwright show-report
```

## OOP concepts used

| Pillar | Where |
|---|---|
| Encapsulation | Private locators in each Page class |
| Inheritance | All pages extend `BasePage` |
| Abstraction | `BasePage` has abstract `getPageTitle()` method |
| Polymorphism | Each page overrides `getPageTitle()` differently |
