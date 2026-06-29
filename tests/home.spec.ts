import { test, expect } from '../fixtures/fixtures';

/**
 * home.spec.ts — tests for the qademo.com homepage.
 * Uses fixtures to inject HomePage automatically.
 */

test.describe('Home Page', () => {

  test.beforeEach(async ({ homePage }) => {
    // homePage.goto() is already called in the fixture
    // Add any additional setup here if needed
  });

  test('should load the homepage successfully', async ({ homePage, page }) => {
    await expect(page).toHaveURL('/');
    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBeTruthy();
  });

  test('should display navigation links', async ({ homePage }) => {
    const navLinks = await homePage.getNavLinks();
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test('should search for a product', async ({ homePage, page }) => {
    await homePage.searchProduct('shirt');
    await expect(page).toHaveURL(/\?s=shirt|\/search/);
  });

  test('should navigate to cart when cart icon is clicked', async ({ homePage, page }) => {
    await homePage.clickCartIcon();
    await expect(page).toHaveURL(/cart/);
  });

});
