const { test, expect } = require('@playwright/test');

test('successful login', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://practice.expandtesting.com/login');

  // Fill in the username and password fields
  await page.fill('#username', 'practice');
  await page.fill('#password', 'SuperSecretPassword!');

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the page to navigate to the secure page
  await page.waitForURL('https://practice.expandtesting.com/secure');

  // Check if the URL has changed to the secure page
  await expect(page).toHaveURL('https://practice.expandtesting.com/secure');

  //Tomaar Screenshot
  //Compara el screenshot con el esperado usando la llamada a la api
});