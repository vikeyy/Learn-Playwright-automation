import { test, expect } from './fixtures/fixtures';
import { users } from './data/testData';

/**
 * login.spec.ts — tests for the login functionality.
 */

test.describe('Login Page', () => {

  test('should display the login form', async ({ loginPage, page }) => {
    await expect(page).toHaveURL(/login/);
    await loginPage.verifyLoginPageLoaded();
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
  });

  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).not.toHaveURL(/login/);
  });

  test('should navigate back to home page', async ({ loginPage, page }) => {
    await loginPage.clickBackToHome();
    await expect(page).toHaveURL('/');
  });

});
