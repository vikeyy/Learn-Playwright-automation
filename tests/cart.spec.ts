import { test, expect } from './fixtures/fixtures';
import { users } from './data/testData';

/**
 * cart.spec.ts — tests for the shopping cart.
 */

test.describe('Cart Page', () => {

  test.beforeEach(async ({ loginPage, productPage }) => {
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await productPage.goto();
    await productPage.addFirstProductToCart();
  });

  test('should show item in cart after adding product', async ({ cartPage }) => {
    await cartPage.goto();
    const count = await cartPage.getCartItemCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should display cart total', async ({ cartPage }) => {
    await cartPage.goto();
    const total = await cartPage.getCartTotal();
    expect(total).toMatch(/\$\d+\.\d{2}/);
  });

  test('should remove item from cart', async ({ cartPage }) => {
    await cartPage.goto();
    const initialCount = await cartPage.getCartItemCount();
    await cartPage.removeFirstItem();
    const newCount = await cartPage.getCartItemCount();
    expect(newCount).toBeLessThan(initialCount);
  });

  test('should navigate to checkout', async ({ cartPage, page }) => {
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout/);
  });

});
