import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export type CheckoutFormDetails = {
  firstName: string;
  lastName: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
};

/**
 * CheckoutPage — represents the qademo.com checkout form.
 */
export class CheckoutPage extends BasePage {

  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly cardNumberInput: Locator;
  private readonly expiryInput: Locator;
  private readonly cvvInput: Locator;
  private readonly cardholderNameInput: Locator;
  private readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput      = page.getByTestId('checkout-first-name');
    this.lastNameInput       = page.getByTestId('checkout-last-name');
    this.addressInput        = page.getByTestId('checkout-address');
    this.cardNumberInput     = page.getByTestId('checkout-card-number');
    this.expiryInput         = page.getByTestId('checkout-expiry');
    this.cvvInput            = page.getByTestId('checkout-cvv');
    this.cardholderNameInput = page.getByTestId('checkout-cardholder-name');
    this.placeOrderButton    = page.getByTestId('place-order-button');
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout');
    await this.waitForPageLoad();
  }

  async fillCheckoutForm(details: CheckoutFormDetails): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.cardNumberInput.fill(details.cardNumber);
    await this.expiryInput.fill(details.expiry);
    await this.cvvInput.fill(details.cvv);
    await this.cardholderNameInput.fill(details.cardholderName);
  }

  async placeOrder(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/\/orders\/\d+/, { timeout: 30000 }),
      this.placeOrderButton.click(),
    ]);
  }

  async verifyCheckoutPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.firstNameInput).toBeVisible();
  }
}
