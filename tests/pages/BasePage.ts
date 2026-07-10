import { Page } from '@playwright/test';

/**
 * BASE PAGE (Page Object Model)
 * --------------------------------
 * POM = keep selectors and page actions in a class, not inside the test file.
 *
 * OOP - ABSTRACTION:
 *   "abstract" means you cannot create BasePage directly.
 *   Child pages (like ProductPage) must implement getPageTitle().
 *
 * OOP - INHERITANCE:
 *   ProductPage extends BasePage, so it gets navigateTo(), waitForXpath(), etc.
 */
export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Every child page must implement this method (Abstraction)
  abstract getPageTitle(): Promise<string>;

  // Shared helper — open any path on the site
  async navigateTo(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  // Simple wait — pause for X milliseconds (beginner-friendly, use sparingly)
  async simpleWait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  // Wait until an element found by XPath is visible on the page
  async waitForXpath(xpath: string, timeoutMs: number = 10000): Promise<void> {
    await this.page.locator(`xpath=${xpath}`).waitFor({
      state: 'visible',
      timeout: timeoutMs,
    });
  }

  // Click an element found by XPath
  async clickXpath(xpath: string): Promise<void> {
    await this.waitForXpath(xpath);
    await this.page.locator(`xpath=${xpath}`).click();
  }

  // Fill text into an input found by XPath
  async fillXpath(xpath: string, text: string): Promise<void> {
    await this.waitForXpath(xpath);
    await this.page.locator(`xpath=${xpath}`).fill(text);
  }

  // Get current browser URL
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
