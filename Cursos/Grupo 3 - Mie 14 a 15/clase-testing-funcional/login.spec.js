const { test, expect } = require('@playwright/test');

test('Login exitoso en la página de práctica', async ({ page }) => {
  // Navegar a la página de login
  await page.goto('https://practice.expandtesting.com/login');

  // Llenar el formulario de login
  await page.fill('#username', 'practice');
  await page.fill('#password', 'SuperSecretPassword!');

  // Hacer clic en el botón de login
  await page.click('button[type="submit"]');

  // Esperar a la redirección o al mensaje de bienvenida
  await page.waitForURL('**/secure', { timeout: 5000 });

  // Validar que se muestra el mensaje de bienvenida
  const welcomeMessage = await page.locator('text=You logged into a secure area!').textContent();
  expect(welcomeMessage).toContain('You logged into a secure area!');
});
