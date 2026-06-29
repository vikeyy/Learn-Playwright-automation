import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductPage — represents a product listing / search results page.
 * Demonstrates: Inheritance, Encapsulation
 */
export class ProductPage extends BasePage {

  private readonly productCards: Locator;
  private readonly productTitles: Locator;
  private readonly productPrices: Locator;
  private readonly addToCartButtons: Locator;
  private readonly sortDropdown: Locator;
  private readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.productCards      = page.locator('.product, .product-card, li.product');
    this.productTitles     = page.locator('.product h2, .woocommerce-loop-product__title');
    this.productPrices     = page.locator('.price, .product-price');
    this.addToCartButtons  = page.locator('a.add_to_cart_button, button.add-to-cart');
    this.sortDropdown      = page.locator('select.orderby, [name="orderby"]');
    this.noResultsMessage  = page.locator('.woocommerce-info, .no-products-found');
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async getProductTitles(): Promise<string[]> {
    return this.productTitles.allTextContents();
  }

  async getProductPrices(): Promise<string[]> {
    return this.productPrices.allTextContents();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.addToCartButtons.first().click();
    await this.waitForPageLoad();
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const product = this.page.locator('.product', { hasText: productName });
    await product.locator('a.add_to_cart_button, button.add-to-cart').click();
    await this.waitForPageLoad();
  }

  async clickProductByName(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName }).first().click();
    await this.waitForPageLoad();
  }

  async sortProductsBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
    await this.waitForPageLoad();
  }

  async isNoResultsVisible(): Promise<boolean> {
    return this.noResultsMessage.isVisible();
  }

  async verifyProductsVisible(): Promise<void> {
    await expect(this.productCards.first()).toBeVisible();
  }
}
