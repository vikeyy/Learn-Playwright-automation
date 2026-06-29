import { test, expect } from '../fixtures/fixtures';
import { products } from '../data/testData';

/**
 * product.spec.ts — tests for product listing and search results.
 */

test.describe('Product Page', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.searchProduct(products.searchTerm);
  });

  test('should display products after search', async ({ productPage }) => {
    const count = await productPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should display product titles', async ({ productPage }) => {
    const titles = await productPage.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
    titles.forEach(title => expect(title.trim()).not.toBe(''));
  });

  test('should add first product to cart', async ({ productPage, page }) => {
    await productPage.addFirstProductToCart();
    // After adding to cart, a success notice or cart count should update
    await expect(page.locator('.woocommerce-message, .added_to_cart, .cart-count')).toBeVisible();
  });

  test('should navigate to product detail on click', async ({ productPage, page }) => {
    const titles = await productPage.getProductTitles();
    if (titles.length > 0) {
      await productPage.clickProductByName(titles[0].trim());
      await expect(page).toHaveURL(/product|shop/);
    }
  });

});
