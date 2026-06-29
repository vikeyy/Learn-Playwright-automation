import { Page } from '@playwright/test';

/**
 * helpers.ts — reusable utility functions used across tests.
 */

// Wait for a number of milliseconds (use sparingly — prefer auto-waiting)
export async function wait(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

// Generate a random email for test user registration
export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `testuser_${timestamp}@example.com`;
}

// Generate a random string
export function generateRandomString(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

// Scroll to an element and click it
export async function scrollAndClick(page: Page, selector: string): Promise<void> {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
  await element.click();
}

// Dismiss any dialog that appears
export async function handleDialog(page: Page, action: 'accept' | 'dismiss' = 'accept'): Promise<void> {
  page.on('dialog', async dialog => {
    if (action === 'accept') {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });
}

// Check if a URL contains a specific path
export function urlContains(url: string, path: string): boolean {
  return url.includes(path);
}

// Format price string to number
export function parsePrice(priceText: string): number {
  return parseFloat(priceText.replace(/[^0-9.]/g, ''));
}
