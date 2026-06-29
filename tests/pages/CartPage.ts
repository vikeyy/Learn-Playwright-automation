import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage — represents the shopping cart page.
 * Demonstrates: Inheritance, Encapsulation
 */
export class CartPage extends BasePage {

  private readonly cartItems: Locator;
  private readonly cartItemNames: Locator;
  private readonly cartTotal: Locator;
  private readonly removeButtons: Locator;
  private readonly checkoutButton: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly quantityInputs: Locator;
  private readonly updateCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems        = page.locator('tr.cart_item, .cart-item');
    this.cartItemNames    = page.locator('.cart_item .product-name a, .cart-item .item-name');
    this.cartTotal        = page.locator('.cart-totals .amount, .order-total .amount');
    this.removeButtons    = page.locator('a.remove, .remove-item');
    this.checkoutButton   = page.getByRole('link', { name: /proceed to checkout|checkout/i });
    this.emptyCartMessage = page.locator('.cart-empty, .woocommerce-info');
    this.quantityInputs   = page.locator('input.qty, input[name*="qty"]');
    this.updateCartButton = page.getByRole('button', { name: /update cart/i });
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart');
    await this.waitForPageLoad();
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return this.cartItemNames.allTextContents();
  }

  async getCartTotal(): Promise<string> {
    return this.cartTotal.innerText();
  }

  async removeFirstItem(): Promise<void> {
    await this.removeButtons.first().click();
    await this.waitForPageLoad();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.waitForPageLoad();
  }

  async isCartEmpty(): Promise<boolean> {
    return this.emptyCartMessage.isVisible();
  }

  async updateQuantity(itemIndex: number, quantity: number): Promise<void> {
    await this.quantityInputs.nth(itemIndex).fill(quantity.toString());
    await this.updateCartButton.click();
    await this.waitForPageLoad();
  }

  async verifyItemInCart(productName: string): Promise<void> {
    await expect(this.page.locator('.cart_item', { hasText: productName })).toBeVisible();
  }

  async verifyCartPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart/);
  }
}
