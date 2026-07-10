import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { users } from '../data/testData';

/**
 * PRODUCT PAGE (Page Object Model)
 * ---------------------------------
 * This one page class handles our simple E2E flow:
 *   Home → Login → Catalog → Add to cart → Cart
 *
 * OOP - INHERITANCE:
 *   ProductPage extends BasePage and reuses navigateTo(), waitForXpath(), etc.
 *
 * OOP - ENCAPSULATION:
 *   XPath strings are "private" — only this class can see and use them.
 *   Tests call public methods like login() instead of touching XPaths directly.
 *
 * OOP - POLYMORPHISM:
 *   getPageTitle() is implemented here in a way specific to the catalog page.
 */
export class ProductPage extends BasePage {

  // ENCAPSULATION: XPath locators stored as private fields
  private readonly xpathSignInLink = "//a[@data-testid='navbar-signin-link']";
  private readonly xpathUsernameInput = "//input[@name='username']";
  private readonly xpathPasswordInput = "//input[@name='password']";
  private readonly xpathLoginButton = "//button[@data-testid='login-submit-button']";
  private readonly xpathStandardUserButton = "//button[@data-testid='test-credential-standard_user']";
  private readonly xpathCatalogHeading = "//h1[contains(text(),'Product Catalog')]";
  private readonly xpathAddFirstProductButton = "(//button[contains(@data-testid,'product-add-to-cart')])[1]";
  private readonly xpathCartLink = "//a[@data-testid='navbar-cart-link']";
  private readonly xpathCartHeading = "//h1[contains(text(),'Shopping Cart')]";

  constructor(page: Page) {
    super(page);
  }

  // POLYMORPHISM: ProductPage defines its own getPageTitle() behavior
  async getPageTitle(): Promise<string> {
    await this.waitForXpath(this.xpathCatalogHeading);
    return this.page.title();
  }

  // Step 1: Click Sign In from home page
  async clickSignInFromHome(): Promise<void> {
    await this.clickXpath(this.xpathSignInLink);
  }

  // Step 1 (full): Open home page and click Sign In
  async openHomeAndClickSignIn(): Promise<void> {
    await this.navigateTo('/');
    await this.simpleWait(1000);
    await this.clickXpath(this.xpathSignInLink);
  }

  // Step 2: Log in with the standard test user
  async loginWithStandardUser(): Promise<void> {
    await this.waitForXpath(this.xpathLoginButton);
    await this.clickXpath(this.xpathStandardUserButton);
    await this.simpleWait(500);
    await this.clickXpath(this.xpathLoginButton);
    await this.page.waitForURL(/\/catalog/, { timeout: 15000 });
  }

  // Step 2 (alternative): Type username and password manually
  async login(username: string, password: string): Promise<void> {
    await this.fillXpath(this.xpathUsernameInput, username);
    await this.fillXpath(this.xpathPasswordInput, password);
    await this.clickXpath(this.xpathLoginButton);
    await this.page.waitForURL(/\/catalog/, { timeout: 15000 });
  }

  // Step 3: Open catalog and confirm products are shown
  async openCatalog(): Promise<void> {
    await this.navigateTo('/catalog');
    await this.waitForXpath(this.xpathCatalogHeading);
  }

  async verifyCatalogIsVisible(): Promise<void> {
    await expect(this.page.locator(`xpath=${this.xpathCatalogHeading}`)).toBeVisible();
    await expect(this.page.locator(`xpath=${this.xpathAddFirstProductButton}`)).toBeVisible();
  }

  // Step 4: Click Add to Cart on the first product
  async addFirstProductToCart(): Promise<void> {
    await this.waitForXpath(this.xpathAddFirstProductButton);
    await this.clickXpath(this.xpathAddFirstProductButton);
    await this.simpleWait(1000);
  }

  // Step 5: Open cart from the navbar
  async openCartFromNavbar(): Promise<void> {
    await this.clickXpath(this.xpathCartLink);
    await this.waitForXpath(this.xpathCartHeading);
  }

  async verifyCartPageIsVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart/);
    await expect(this.page.locator(`xpath=${this.xpathCartHeading}`)).toBeVisible();
  }

  // Quick login helper used by hooks — goes straight to catalog
  async loginAndOpenCatalog(): Promise<void> {
    await this.openHomeAndClickSignIn();
    await this.login(users.validUser.username, users.validUser.password);
    await this.verifyCatalogIsVisible();
  }
}
