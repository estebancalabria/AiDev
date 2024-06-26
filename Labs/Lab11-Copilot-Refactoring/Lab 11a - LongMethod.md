# Laboratorio de Refactoring con GitHub Copilot: Long Method 🔍🛠️

¡Bienvenidos a este emocionante laboratorio! En esta práctica, exploraremos cómo utilizar GitHub Copilot para refactorizar un método largo y mejorarlo gradualmente. Aprenderemos a aplicar diferentes técnicas de refactorización y a separar responsabilidades en métodos más pequeños y legibles. Para utilizar GitHub Copilot, seleccionamos el código que deseamos refactorizar y presionamos `Ctrl+i`.

## Paso 1: Código Original 📄

```javascriptconst 
fs = require('fs');
const csv = require('csv-parser');

function csvToJson(csvFilePath) {
  return new Promise((resolve, reject) => {
    const jsonData = [];
    const headers = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('headers', (headerRow) => {
        headers.push(...headerRow);
      })
      .on('data', (data) => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = data[index];
        });
        jsonData.push(rowData);
      })
      .on('end', () => {
        const result = jsonData.length > 0 ? jsonData : null;
        resolve(result);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Ejemplo de uso
csvToJson('datos.csv')
  .then(jsonData => {
    console.log(jsonData);
  })
  .catch(error => {
    console.error(`Error al procesar el archivo CSV: ${error}`);
  });
```

Como podemos observar, este método `csvToJson` realiza múltiples tareas: leer un archivo CSV, procesar cada fila, construir un objeto JSON y devolverlo. Todas estas responsabilidades se encuentran mezcladas en una sola función, lo que dificulta la legibilidad, el mantenimiento y las pruebas unitarias.

## Paso 2: Refactorización 1 🛠️

Prompt Utilizado: 

> "El siguiente método posee el code smell 'long method', me lo puedes separar en métodos más cortos para mayor legibilidad y que se entienda mejor"

```javascript

function csvToJson(csvFilePath) {
    return new Promise((resolve, reject) => {
        const jsonData = [];
        const headers = [];

        const readStream = fs.createReadStream(csvFilePath);
        const csvParser = csv();

        readStream
            .pipe(csvParser)
            .on('headers', handleHeaders)
            .on('data', handleData)
            .on('end', handleEnd)
            .on('error', handleError);

        function handleHeaders(headerRow) {
            headers.push(...headerRow);
        }

        function handleData(data) {
            const rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = data[index];
            });
            jsonData.push(rowData);
        }

        function handleEnd() {
            const result = jsonData.length > 0 ? jsonData : null;
            resolve(result);
        }

        function handleError(error) {
            reject(error);
        }
    });
}
```

En esta refactorización, hemos separado las responsabilidades en funciones auxiliares más pequeñas: `handleHeaders`, `handleData`, `handleEnd` y `handleError`. Esto facilita la lectura y el mantenimiento del código, además de permitir pruebas unitarias más específicas.

## Paso 3: Refactorización 2 - Código Síncrono ⏳

Prompt Utilizado: 
> "Convierte este código asíncrono a síncrono"

```javascript
function csvToJson(csvFilePPath) {
    const jsonData = [];
    const headers = [];

    const fileData = fs.readFileSync(csvFilePath, 'utf-8');
    const rows = fileData.split('\n');

    headers.push(...rows[0].split(','));

    for (let i = 1; i < rows.length; i++) {
        const data = rows[i].split(',');
        const rowData = {};
        headers.forEach((header, index) => {
            rowData[header] = data[index];
        });
        jsonData.push(rowData);
    }

    const result = jsonData.length > 0 ? jsonData : null;
    return result;
}
```

¡Aquí es donde entra en juego GitHub Copilot! Podemos solicitar a Copilot que nos ayude a convertir el código asíncrono a síncrono.

## Paso 4: Refactorización 3 - Mejora del Código Síncrono 💡

Prompt Utilizado: 

> "Mejora este código síncrono, extrae funciones auxiliares, agrega validaciones y manejo de errores más robusto"

```javascript
function csvToJson(csvFilePath) {
    const jsonData = [];
    const headers = [];

    const fileData = readFile(csvFilePath);
    const rows = fileData.split('\n');

    processHeaders(headers, rows[0]);

    for (let i = 1; i < rows.length; i++) {
        const data = rows[i].split(',');
        const rowData = processRow(headers, data);
        jsonData.push(rowData);
    }

    const result = jsonData.length > 0 ? jsonData : null;
    return result;
}

function readFile(filePath) {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return fileData;
}

function processHeaders(headers, headerRow) {
    headerRow.split(',').forEach(header => {
        headers.push(header);
    });
}

function processRow(headers, rowData) {
    const row = {};
    headers.forEach((header, index) => {
        row[header] = rowData[index];
    });
    return row;
}
```

En esta refactorización, podemos aplicar cualquier mejora adicional que Copilot sugiera o que consideremos apropiada, como extraer funciones auxiliares, agregar validaciones, manejar errores de manera más robusta, etc.

## Paso 5: Conclusión 🎉

¡Felicitaciones! Has completado este laboratorio de refactorización con GitHub Copilot. Has aprendido a separar responsabilidades en métodos más pequeños, a convertir código asíncrono a síncrono y a mejorar el código con las sugerencias de Copilot.

Recuerda que GitHub Copilot es una herramienta de asistencia y no reemplaza completamente el trabajo del desarrollador. Siempre debes revisar y validar las sugerencias de Copilot antes de aceptarlas. Además, es importante seguir las mejores prácticas y los estándares de codificación de tu equipo o proyecto.

¡Sigue practicando y explorando las capacidades de GitHub Copilot! 🚀