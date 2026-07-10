import { test, expect } from './fixtures/fixtures';
import { urls } from './data/testData';

/**
 * E2E BASIC FLOW TEST
 * -------------------
 * Simple user journey on https://qademo.com:
 *   Login → Catalog → Add product → Open cart → Verify cart page
 *
 * Concepts used in this file:
 *   - Page Object Model (ProductPage class)
 *   - Custom fixture (productPage)
 *   - Hooks (beforeAll, beforeEach)
 *   - Assertions (expect)
 */

test.describe('Basic E2E Flow on qademo.com', () => {

  // Variable shared across tests in this file (set once in beforeAll)
  let suiteStartTime: string;

  /**
   * HOOK: beforeAll
   * Runs ONE time before any test in this describe block.
   * Good for one-time setup like reading config or logging start time.
   */
  test.beforeAll(async () => {
    suiteStartTime = new Date().toISOString();
    console.log(`Test suite started at: ${suiteStartTime}`);
  });

  /**
   * HOOK: beforeEach
   * Runs BEFORE every single test.
   * Good for steps each test needs, like opening the home page.
   */
  test.beforeEach(async ({ page }) => {
    await page.goto(urls.home);
  });

  /**
   * Main E2E test — login, add a product, open cart, verify we are on cart page.
   */
  test('should login, add product to cart, and open cart page', async ({ productPage, page }) => {

    // Step 1: Click Sign In from home (page already opened in beforeEach)
    await productPage.clickSignInFromHome();
    await expect(page).toHaveURL(new RegExp(`${urls.login}$`));

    // Step 2: Login with standard user credentials
    await productPage.loginWithStandardUser();
    await expect(page).toHaveURL(new RegExp(`${urls.catalog}$`));

    // Step 3: Confirm catalog loaded (assertion + polymorphism via getPageTitle)
    await productPage.verifyCatalogIsVisible();
    const pageTitle = await productPage.getPageTitle();
    expect(pageTitle.length).toBeGreaterThan(0);

    // Step 4: Add first product to cart
    await productPage.addFirstProductToCart();

    // Step 5: Open cart and verify
    await productPage.openCartFromNavbar();
    await productPage.verifyCartPageIsVisible();
    await expect(page).toHaveURL(new RegExp(`${urls.cart}$`));
  });

});
