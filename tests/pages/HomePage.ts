import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage — represents the qademo.com home page.
 * Demonstrates: Inheritance (extends BasePage), Encapsulation (private locators)
 */
export class HomePage extends BasePage {

  private readonly browseProductsLink: Locator;
  private readonly heroSignInButton: Locator;
  private readonly navLinks: Locator;
  private readonly cartLink: Locator;
  private readonly logo: Locator;

  constructor(page: Page) {
    super(page);
    this.browseProductsLink = page.getByRole('link', { name: 'Browse Products' });
    this.heroSignInButton   = page.getByTestId('hero-signin-button');
    this.navLinks            = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link');
    this.cartLink            = page.getByTestId('navbar-cart-link');
    this.logo                = page.getByRole('link', { name: 'QA Demo home' });
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async browseProducts(): Promise<void> {
    await this.browseProductsLink.click();
    await this.waitForPageLoad();
  }

  async clickHeroSignIn(): Promise<void> {
    await this.heroSignInButton.click();
    await this.waitForPageLoad();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
    await this.waitForPageLoad();
  }

  async searchProduct(productName: string): Promise<void> {
    await this.page.goto(`/catalog?search=${encodeURIComponent(productName)}`);
    await this.waitForPageLoad();
  }

  async clickCartIcon(): Promise<void> {
    await this.cartLink.click();
    await this.waitForPageLoad();
  }

  async isLogoVisible(): Promise<boolean> {
    return this.logo.isVisible();
  }

  async getNavLinks(): Promise<string[]> {
    return this.navLinks.allTextContents();
  }

  async clickNavLink(linkText: string): Promise<void> {
    await this.page.getByRole('link', { name: linkText }).click();
    await this.waitForPageLoad();
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL('/');
    await expect(this.logo).toBeVisible();
  }
}
