import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CheckoutPage — represents the checkout form page.
 */
export class CheckoutPage extends BasePage {

  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly phoneInput: Locator;
  private readonly addressInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateDropdown: Locator;
  private readonly postcodeInput: Locator;
  private readonly placeOrderButton: Locator;
  private readonly orderConfirmation: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput    = page.locator('#billing_first_name');
    this.lastNameInput     = page.locator('#billing_last_name');
    this.emailInput        = page.locator('#billing_email');
    this.phoneInput        = page.locator('#billing_phone');
    this.addressInput      = page.locator('#billing_address_1');
    this.cityInput         = page.locator('#billing_city');
    this.stateDropdown     = page.locator('#billing_state');
    this.postcodeInput     = page.locator('#billing_postcode');
    this.placeOrderButton  = page.getByRole('button', { name: /place order/i });
    this.orderConfirmation = page.locator('.woocommerce-order-received, .order-confirmation');
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout');
    await this.waitForPageLoad();
  }

  async fillBillingDetails(details: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
  }): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.phoneInput.fill(details.phone);
    await this.addressInput.fill(details.address);
    await this.cityInput.fill(details.city);
    await this.postcodeInput.fill(details.postcode);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
    await this.waitForPageLoad();
  }

  async isOrderConfirmed(): Promise<boolean> {
    return this.orderConfirmation.isVisible();
  }

  async verifyCheckoutPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout/);
    await expect(this.firstNameInput).toBeVisible();
  }
}
