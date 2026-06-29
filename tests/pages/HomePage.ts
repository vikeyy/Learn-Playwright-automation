import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage — represents the qademo.com home page.
 * Demonstrates: Inheritance (extends BasePage), Encapsulation (private locators)
 */
export class HomePage extends BasePage {

  // Encapsulation: locators are private — only accessible through methods
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly navLinks: Locator;
  private readonly cartIcon: Locator;
  private readonly logo: Locator;

  constructor(page: Page) {
    super(page); // calls BasePage constructor
    this.searchInput  = page.locator('input[name="s"], #search, [placeholder*="Search"]');
    this.searchButton = page.locator('button[type="submit"], .search-submit');
    this.navLinks     = page.locator('nav a, .nav-links a');
    this.cartIcon     = page.locator('.cart, .cart-icon, a[href*="cart"]');
    this.logo         = page.locator('.logo, header img, a.brand');
  }

  // Implements the abstract method from BasePage
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async clickCartIcon(): Promise<void> {
    await this.cartIcon.click();
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
