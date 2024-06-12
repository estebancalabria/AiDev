const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless:false});
  const context = await browser.newContext();

  // Caso de inicio de sesión exitoso
  const pageSuccess = await context.newPage();
  await pageSuccess.goto('https://practice.expandtesting.com/login');
  await pageSuccess.fill('#username', 'practice');
  await pageSuccess.fill('#password', 'SuperSecretPassword!');
  await Promise.all([
    pageSuccess.waitForNavigation(),
    pageSuccess.click('button[type="submit"]')
  ]);
  await pageSuccess.waitForSelector('#flash-message'); // Espera a que aparezca el mensaje de éxito
  console.log("Inicio de sesión exitoso");
  await browser.close();
})();

  (async () => {
  // Caso de inicio de sesión fallido
  const browser = await chromium.launch({headless:false});
  const context = await browser.newContext();

  const pageFailure = await context.newPage();
  await pageFailure.goto('https://practice.expandtesting.com/login');
  await pageFailure.fill('#username', 'usuario_invalido');
  await pageFailure.fill('#password', 'contraseña_invalida');
  await Promise.all([
    pageFailure.waitForNavigation(),
    pageFailure.click('button[type="submit"]')
  ]);
  await pageFailure.waitForSelector('.alert-danger'); // Espera a que aparezca el mensaje de error
  console.log("Inicio de sesión fallido");

  await browser.close();
})();
