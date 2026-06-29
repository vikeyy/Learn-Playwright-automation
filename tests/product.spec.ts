import { test, expect } from './fixtures/fixtures';
import { products } from './data/testData';

/**
 * product.spec.ts — tests for product listing and catalog.
 */

test.describe('Product Page', () => {

  test.beforeEach(async ({ productPage }) => {
    await productPage.goto();
  });

  test('should display products on catalog page', async ({ productPage }) => {
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
    await expect(page.getByRole('button', { name: /remove .+ from cart/i }).first()).toBeVisible();
  });

  test('should navigate to product detail on click', async ({ productPage, page }) => {
    await productPage.clickProductByName(products.firstProduct);
    await expect(page).toHaveURL(/\/products\//);
  });

});
