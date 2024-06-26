const { test, expect } = require('@playwright/test');

test('Login fallido con credenciales incorrectas', async ({ page }) => {
  // Navega a la página de inicio de sesión
  await page.goto('https://practice.expandtesting.com/login'); // Reemplaza 'URL_DE_LA_PAGINA' con la URL real

  // Introduce credenciales incorrectas
  await page.fill('#username', 'usuario_incorrecto'); // Usuario incorrecto
  await page.fill('#password', 'contraseña_incorrecta'); // Contraseña incorrecta

  // Haz clic en el botón de login
  await page.click('button[type="submit"]');

  // Espera y verifica que aparezca un mensaje de error
  await expect(page).toHaveURL(/.*\/authenticate/); // Verifica si la URL cambia
  await expect(page.locator('text=error message')).toBeVisible(); // Verifica que aparezca un mensaje de error. Ajusta esto según tu mensaje de error real.
});
