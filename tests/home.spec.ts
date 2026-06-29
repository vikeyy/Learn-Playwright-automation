import { test, expect } from './fixtures/fixtures';

/**
 * home.spec.ts — tests for the qademo.com homepage.
 * Uses fixtures to inject HomePage automatically.
 */

test.describe('Home Page', () => {

  test('should load the homepage successfully', async ({ homePage, page }) => {
    await expect(page).toHaveURL('/');
    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBeTruthy();
  });

  test('should display navigation links', async ({ homePage }) => {
    const navLinks = await homePage.getNavLinks();
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test('should browse products from homepage', async ({ homePage, page }) => {
    await homePage.browseProducts();
    await expect(page).toHaveURL(/catalog/);
  });

  test('should navigate to cart when cart icon is clicked', async ({ homePage, page }) => {
    await homePage.clickCartIcon();
    await expect(page).toHaveURL(/cart/);
  });

});
