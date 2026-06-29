import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { checkoutDetails, e2eProducts, urls } from './data/testData';

/**
 * e2e-checkout-flow.spec.ts
 *
 * End-to-end user journey on qademo.com:
 * Home → Login → Catalog → Cart → Checkout → Order confirmation → Catalog
 *
 * Uses Page Object Model — no locators in the spec file.
 * Runs serially with extended timeout for the full purchase flow.
 */
test.describe('E2E Checkout Flow', () => {

  test.describe.configure({ mode: 'serial' });

  test('should complete full purchase journey from home to order confirmation', async ({ page }) => {
    test.setTimeout(120_000);

    const homePage     = new HomePage(page);
    const loginPage    = new LoginPage(page);
    const productPage  = new ProductPage(page);
    const cartPage     = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const ordersPage   = new OrdersPage(page);

    // Step 1: Navigate to home and click Sign In
    await homePage.goto();
    await expect(page).toHaveURL(new RegExp(`${urls.home}$`));
    await homePage.clickHeroSignIn();

    // Step 2: Login with Standard User test credential
    await expect(page).toHaveURL(new RegExp(`${urls.login}$`));
    await loginPage.loginWithStandardUser();
    await expect(page).toHaveURL(new RegExp(`${urls.catalog}$`));

    // Step 3: Add two products to cart
    await productPage.addProductsToCartByIds([
      e2eProducts.firstItemId,
      e2eProducts.secondItemId,
    ]);

    // Step 4: Open cart
    await homePage.openCart();
    await expect(page).toHaveURL(new RegExp(`${urls.cart}$`));

    // Step 5: Proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(new RegExp(`${urls.checkout}$`));

    // Step 6: Fill checkout form and place order
    await checkoutPage.fillCheckoutForm(checkoutDetails);
    await checkoutPage.placeOrder();

    // Step 7: Verify order confirmation page displays order number
    await ordersPage.verifyOrderConfirmationPage();

    // Step 8: Continue shopping back to catalog
    await ordersPage.continueShopping();
    await expect(page).toHaveURL(new RegExp(`${urls.catalog}$`));
  });

});
