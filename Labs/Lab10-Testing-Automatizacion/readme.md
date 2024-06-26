🚀 **Automatización de Pruebas de Frontend con Playwright y Jest**

En este laboratorio, aprenderemos a configurar un proyecto para realizar pruebas automatizadas en el frontend de una aplicación web utilizando Playwright y Jest. Utilizaremos ChatGPT para generar pruebas basadas en el código HTML de una página web.

## Paso 1: Configurar el Proyecto

📁 **1.1. Instalar Node.js** 
Asegúrate de tener Node.js instalado en tu sistema. Puedes descargarlo desde ```javascript[aquí](https://nodejs.org/)</code>.

📂 **1.2. Crear un Directorio para el Proyecto**
Crea un nuevo directorio para tu proyecto y navega hasta él en tu terminal.

```
mkdir proyecto-pruebas
cd proyecto-pruebas
```

📦 **1.3. Inicializar el Proyecto Node.js**
Inicializa un nuevo proyecto Node.js utilizando npm.

```
npm init -y
```

⚙️ **1.4. Instalar Playwright y Jest**
Instala las dependencias necesarias para Playwright y Jest.

```
npm install playwright jest @playwright/test --save-dev
```

🔧 **1.5. Instalar los Drivers de Playwright**
Instala los drivers necesarios para Playwright ejecutando el siguiente comando en tu terminal:

```
npx playwright install
```

## Paso 2: Generar Pruebas con ChatGPT

🖥️ **2.1. Copiar el HTML de la Página**
Ve a la página [https://practice.expandtesting.com/login](https://practice.expandtesting.com/login) en tu navegador web. Haz clic derecho en cualquier lugar de la página y selecciona "Ver código fuente" o "Inspeccionar" para acceder al código fuente HTML de la página.

📋 **2.2. Copiar el Código HTML**
Selecciona todo el código HTML de la página y cópialo al portapapeles.

🤖 **2.3. Generar Pruebas con ChatGPT**
Pega el código HTML en esta conversación y solicita a ChatGPT que genere pruebas automatizadas utilizando Playwright o Jest. Por ejemplo:

"Hey ChatGPT, ¿podrías generar pruebas automatizadas para esta página web utilizando el código HTML que te proporcionaré? Aquí está el código HTML: [pegar el código HTML aquí]"

ChatGPT te proporcionará los scripts de prueba basados en el código HTML proporcionado.

## Paso 3: Configurar Playwright y Jest

⚙️ **3.1. Configurar Jest (opcional)**
Crea un archivo de configuración para Jest llamado 
```
jest.config.js
``` 
y agrégale el siguiente contenido:

```
module.exports = {
  testMatch: ["**/__tests__/**/*.spec.[jt]s?(x)"],
};
```

🛠️ **3.2. Configurar Playwright**
Crea un archivo de configuración para Playwright llamado 
```
playwright.config.js
``` 
y agrégale el siguiente contenido:

```
const { devices } = require('@playwright/test');

module.exports = {
  use: {
    // Configura Playwright para usar Chrome y Firefox
    ...devices['Pixel 5'],
    browserName: 'chromium',
  },
};
```

## Paso 4: Escribir Pruebas

✏️ **4.1. Crear Prueba en Jest**
Crea un directorio ```javascript__tests__</code> y dentro de él, crea un archivo de prueba llamado ```javascriptlogin.spec.js</code> con el siguiente contenido:

```
const { test, expect } = require('@playwright/test');

test('Login exitoso', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  await page.fill('#username', 'practice');
  await page.fill('#password', 'SuperSecretPassword!');
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]')
  ]);

  const flashMessage = await page.waitForSelector('#flash-message');
  expect(flashMessage).not.toBeNull();
});
```

## Paso 5: Ejecutar Pruebas

▶️ **5.1. Ejecutar Pruebas con Jest**
Ejecuta las pruebas utilizando Jest desde la terminal:

```
npx jest
```

Esto ejecutará las pruebas en modo headless utilizando Playwright y Jest, y te mostrará los resultados en la terminal.
