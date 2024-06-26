const { test, expect } = require('@playwright/test');

test('Login successful redirects to secure page', async ({ page }) => {
  // Abrir la página de login
  await page.goto('https://practice.expandtesting.com/login');

  // Completar el formulario de login
  await page.fill('#username', 'practice');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');

  // Esperar a que se redirija a la página segura
 
  // Esperar a la redirección o al mensaje de bienvenida
  await page.waitForURL('**/secure', { timeout: 5000 });

  // Verificar que la URL actual sea la página segura
//  expect(page.url()).toBe('**/secure');

  // También se puede verificar algún elemento en la página segura si es necesario
  const headingText = await page.textContent('h1');
  expect(headingText).toContain("Secure Area page for Automation Testing Practice");

  // Opcional: Tomar una captura de pantalla de la página segura
  await page.screenshot({ path: 'secure_page.png' });
});
