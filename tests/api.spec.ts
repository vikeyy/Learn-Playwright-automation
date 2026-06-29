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

  test('should return products from API endpoint', async ({ request }) => {
    const response = await request.get('/api/products');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('should return 404 for non-existent API route', async ({ request }) => {
    const response = await request.get('/api/catalog');
    expect(response.status()).toBe(404);
  });

  test('should have correct content-type for homepage', async ({ request }) => {
    const response = await request.get('/');
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/html');
  });

});
