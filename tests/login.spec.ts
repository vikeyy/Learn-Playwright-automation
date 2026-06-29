import { test, expect } from '../fixtures/fixtures';
import { users } from '../data/testData';

/**
 * login.spec.ts — tests for the login functionality.
 */

test.describe('Login Page', () => {

  test('should display the login form', async ({ loginPage, page }) => {
    await expect(page).toHaveURL(/my-account/);
    const isLoaded = await loginPage.verifyLoginPageLoaded();
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(users.invalidUser.email, users.invalidUser.password);
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
  });

  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(users.validUser.email, users.validUser.password);
    // After successful login, should redirect away from login page
    await expect(page).not.toHaveURL(/my-account.*login/);
  });

  test('should navigate to forgot password page', async ({ loginPage, page }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/lost-password|forgot-password/);
  });

});
