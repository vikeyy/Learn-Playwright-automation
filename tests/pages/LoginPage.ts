import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage — represents the login / sign-in page.
 * Demonstrates: Encapsulation (private fields), Inheritance (extends BasePage)
 */
export class LoginPage extends BasePage {

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly backToHomeLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput   = page.getByLabel('Username');
    this.passwordInput   = page.getByLabel('Password');
    this.loginButton     = page.getByTestId('login-submit-button');
    this.errorMessage    = page.getByText('Invalid username or password');
    this.backToHomeLink  = page.getByRole('link', { name: /back to home/i });
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await Promise.race([
      this.page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 10000 }),
      this.errorMessage.waitFor({ state: 'visible', timeout: 10000 }),
    ]).catch(() => {});
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.innerText();
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }

  async clickBackToHome(): Promise<void> {
    await this.backToHomeLink.click();
    await this.waitForPageLoad();
  }

  async verifyLoginPageLoaded(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
  }
}
