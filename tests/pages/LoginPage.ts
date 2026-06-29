import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage — represents the login / sign-in page.
 * Demonstrates: Encapsulation (private fields), Inheritance (extends BasePage)
 */
export class LoginPage extends BasePage {

  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput        = page.getByLabel('Email address').or(page.locator('#email, input[name="email"]'));
    this.passwordInput     = page.getByLabel('Password').or(page.locator('#password, input[name="password"]'));
    this.loginButton       = page.getByRole('button', { name: /login|sign in/i });
    this.errorMessage      = page.locator('.error-message, .alert-danger, .woocommerce-error');
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    this.registerLink      = page.getByRole('link', { name: /register|create account/i });
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async goto(): Promise<void> {
    await this.page.goto('/my-account');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.innerText();
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async clickRegister(): Promise<void> {
    await this.registerLink.click();
  }

  async verifyLoginPageLoaded(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
    await expect(this.emailInput).toBeVisible();
  }
}
