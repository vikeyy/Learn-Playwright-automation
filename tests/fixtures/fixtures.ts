import { test as base } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

/**
 * CUSTOM FIXTURES
 * ----------------
 * A fixture gives each test its own ready-to-use objects (like ProductPage).
 * This avoids repeating "new ProductPage(page)" in every test.
 *
 * "extend" adds our productPage on top of Playwright's built-in "page" fixture.
 * Each test gets a fresh browser page — tests stay isolated from each other.
 *
 * Usage:
 *   test('my test', async ({ productPage }) => { ... })
 */

type MyFixtures = {
  productPage: ProductPage;
};

export const test = base.extend<MyFixtures>({
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});

export { expect } from '@playwright/test';
