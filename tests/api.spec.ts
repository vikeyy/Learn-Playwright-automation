import { test, expect } from '@playwright/test';

/**
 * api.spec.ts — API tests using Playwright's built-in request context.
 * Tests backend endpoints directly without a browser UI.
 */

test.describe('API Tests', () => {

  test('should return 200 for homepage', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);
  });

  test('should return products from shop endpoint', async ({ request }) => {
    const response = await request.get('/shop');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('product');
  });

  test('should return 404 for non-existent page', async ({ request }) => {
    const response = await request.get('/this-page-does-not-exist-xyz');
    expect(response.status()).toBe(404);
  });

  test('should have correct content-type for homepage', async ({ request }) => {
    const response = await request.get('/');
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/html');
  });

});
