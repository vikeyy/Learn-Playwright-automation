import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductPage — represents a product listing / catalog page.
 * Demonstrates: Inheritance, Encapsulation
 */
export class ProductPage extends BasePage {

  private readonly productTitles: Locator;
  private readonly addToCartButtons: Locator;
  private readonly removeFromCartButtons: Locator;
  private readonly catalogHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitles          = page.getByRole('heading', { level: 3 });
    this.addToCartButtons       = page.getByRole('button', { name: /add .+ to cart/i });
    this.removeFromCartButtons  = page.getByRole('button', { name: /remove .+ from cart/i });
    this.catalogHeading         = page.getByRole('heading', { name: 'Product Catalog' });
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async goto(): Promise<void> {
    await this.page.goto('/catalog');
    await this.waitForPageLoad();
    await this.catalogHeading.waitFor({ state: 'visible' });
  }

  async getProductCount(): Promise<number> {
    return this.addToCartButtons.count();
  }

  async getProductTitles(): Promise<string[]> {
    return this.productTitles.allTextContents();
  }

  async getProductPrices(): Promise<string[]> {
    return this.page.getByText(/\$\d+\.\d{2}/).allTextContents();
  }

  async addFirstProductToCart(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/api/cart') && res.ok()),
      this.addToCartButtons.first().click(),
    ]);
    await expect(this.page.getByTestId('navbar-cart-link')).toHaveAttribute('aria-label', /1 item/i);
    await this.waitForPageLoad();
  }

  async addProductToCartById(productId: number): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/api/cart') && res.ok()),
      this.page.getByTestId(`product-add-to-cart-${productId}`).click(),
    ]);
    await this.waitForPageLoad();
  }

  async addProductsToCartByIds(productIds: number[]): Promise<void> {
    for (const productId of productIds) {
      await this.addProductToCartById(productId);
    }
  }

  async clickProductByName(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: new RegExp(`view ${productName}`, 'i') }).click();
    await this.waitForPageLoad();
  }

  async isNoResultsVisible(): Promise<boolean> {
    return this.page.getByText(/no products found|0 products/i).isVisible();
  }

  async verifyProductsVisible(): Promise<void> {
    await expect(this.catalogHeading).toBeVisible();
    await expect(this.addToCartButtons.first()).toBeVisible();
  }
}
