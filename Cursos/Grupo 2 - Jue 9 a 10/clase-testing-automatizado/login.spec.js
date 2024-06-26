const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();

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
  const url = page.url();
  if (url === 'https://practice.expandtesting.com/secure') {
    console.log('Login successful');
  } else {
    console.log('Login failed');
  }

  await browser.close();
})();
