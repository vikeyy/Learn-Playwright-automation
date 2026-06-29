import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * OrdersPage — represents the order confirmation page after checkout.
 */
export class OrdersPage extends BasePage {

  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  getOrderNumberFromUrl(): string {
    const match = this.page.url().match(/\/orders\/(\d+)/);
    return match?.[1] ?? '';
  }

  async verifyOrderConfirmationPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/orders\/\d+/);
    const orderNumber = this.getOrderNumberFromUrl();
    expect(orderNumber).toBeTruthy();
    await expect(this.page.getByText(orderNumber)).toBeVisible();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.page.waitForURL(/\/catalog/, { timeout: 15000 });
  }
}
