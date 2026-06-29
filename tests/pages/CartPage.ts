import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage — represents the shopping cart page.
 * Demonstrates: Inheritance, Encapsulation
 */
export class CartPage extends BasePage {

  private readonly removeButtons: Locator;
  private readonly checkoutButton: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly cartHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.removeButtons     = page.getByRole('button', { name: /remove .+ from cart/i });
    this.checkoutButton    = page.getByRole('button', { name: /proceed to checkout/i });
    this.emptyCartMessage  = page.getByText('Your cart is empty');
    this.cartHeading       = page.getByRole('heading', { name: 'Shopping Cart' });
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart');
    await this.waitForPageLoad();
    await Promise.race([
      this.cartHeading.waitFor({ state: 'visible' }),
      this.emptyCartMessage.waitFor({ state: 'visible' }),
    ]);
  }

  async getCartItemCount(): Promise<number> {
    return this.removeButtons.count();
  }

  async getCartItemNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.removeButtons.count();
    for (let i = 0; i < count; i++) {
      const label = await this.removeButtons.nth(i).getAttribute('aria-label');
      if (label) {
        names.push(label.replace(/^Remove\s+/i, '').replace(/\s+from cart$/i, ''));
      }
    }
    return names;
  }

  async getCartTotal(): Promise<string> {
    const mainText = await this.page.locator('main').textContent();
    const match = mainText?.match(/Total\s*\$(\d+\.\d{2})/i);
    return match ? `$${match[1]}` : '';
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

  async verifyItemInCart(productName: string): Promise<void> {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async verifyCartPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart/);
  }
}
