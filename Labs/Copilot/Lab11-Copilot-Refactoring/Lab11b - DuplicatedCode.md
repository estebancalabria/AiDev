# Laboratorio de Refactoring con GitHub Copilot: Código Duplicado 🔄🛠️

En este laboratorio, aprenderemos a identificar y eliminar código duplicado utilizando GitHub Copilot. El objetivo principal es reutilizar funciones existentes y mejorar la legibilidad y mantenibilidad del código.

## Paso 1: Código Inicial 📄

Comenzaremos con el siguiente código duplicado en el archivo `duplicatedCode.js`:

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

También tenemos un archivo `CsvUtils.js` con algunas funciones útiles:

```javascript
export function convertCommaSeparatedStringToArray(commaSeparatedString) {
    return commaSeparatedString.split(',');
}

export function convertCommaSeparatedStringToObject(headers, commaSeparatedString) {
    const data = commaSeparatedString.split(',');
    const row = {};
    headers.forEach((header, index) => {
        row[header] = rowData[index];
    });
    return row;
}
```

## Paso 2: Identificar Código Duplicado 🔍

Prompt Utilizado: "Detecto código duplicado en `#file:DuplicatedCode.js`. Me gustaría reutilizar funciones ya declaradas en `#file:DuplicatedCode-CsvUtils.js` y refactorizar el código. Enumera primero las funciones en `#file:DuplicatedCode-CsvUtils.js` y fija si las puedes utilizar en lugar de las que ya están en `#file:DuplicatedCode.js`, actualizando el código."

```javascript
import { convertCommaSeparatedStringToArray, convertCommaSeparatedStringToObject } from './DuplicatedCode-CsvUtils.js';

function csvToJson(csvFilePath) {
    const jsonData = [];
    const headers = [];
    const fileData = readFile(csvFilePath);
    const rows = fileData.split('\n');

    headers = convertCommaSeparatedStringToArray(rows[0]);

    for (let i = 1; i < rows.length; i++) {
        const rowData = convertCommaSeparatedStringToObject(headers, rows[i]);
        jsonData.push(rowData);
    }

    const result = jsonData.length > 0 ? jsonData : null;
    return result;
}

function readFile(filePath) {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return fileData;
}
```

En esta refactorización, hemos eliminado las funciones `processHeaders` y `processRow` duplicadas y, en su lugar, utilizamos las funciones `convertCommaSeparatedStringToArray` y `convertCommaSeparatedStringToObject` del archivo `CsvUtils.js`.

## Paso 3: Validar y Mejorar la Refactorización 💡

Prompt Utilizado: "Revisa el código refactorizado y sugiere mejoras adicionales, como extraer funciones auxiliares, agregar validaciones y manejar errores de manera más robusta."

```javascript
import { convertCommaSeparatedStringToArray, convertCommaSeparatedStringToObject } from './DuplicatedCode-CsvUtils.js';
import { readFileSync } from 'fs';

function csvToJson(csvFilePath) {
    const rows = readFileSync(csvFilePath, 'utf-8').split('\n');
    const headers = convertCommaSeparatedStringToArray(rows[0]);
    const jsonData = rows.slice(1).map(row => convertCommaSeparatedStringToObject(headers, row));

    return jsonData.length > 0 ? jsonData : null;
}

// Posibles mejoras adicionales sugeridas por Copilot:
// - Manejar errores de lectura de archivo
// - Validar que el archivo CSV tenga un formato válido
// - Agregar tipos y validaciones de entrada
// - Extraer la lógica de filtrar filas vacías en una función separada
```

En esta refactorización mejorada, hemos:

- Utilizado la función `readFileSync` de Node.js para leer el archivo CSV.
- Simplificado el procesamiento de filas utilizando el método `slice` y `map`.
- Sugerido mejoras adicionales, como manejar errores de lectura de archivo, validar el formato del archivo CSV, agregar tipos y validaciones de entrada, y extraer la lógica de filtrado de filas vacías en una función separada.

## Paso 4: Conclusión 🎉

¡Felicitaciones! Has completado este laboratorio de refactoring de código duplicado con GitHub Copilot. Has aprendido a identificar código duplicado, reutilizar funciones existentes y mejorar la legibilidad y mantenibilidad del código.

Recuerda que GitHub Copilot es una herramienta de asistencia y no reemplaza completamente el trabajo del desarrollador. Siempre debes revisar y validar las sugerencias de Copilot antes de aceptarlas. Además, es importante seguir las mejores prácticas y los estándares de codificación de tu equipo o proyecto.

¡Sigue practicando y explorando las capacidades de GitHub Copilot! 🚀