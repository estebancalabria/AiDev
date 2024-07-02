fs = require('fs');
const csv = require('csv-parser');

function readHeaders(headerRow) {
    // Usar convertCommaSeparatedStringToArray para convertir headerRow a array
    headers = convertCommaSeparatedStringToArray(headerRow.join(','));
}

function processData(data) {
    // Convertir data (que ya es un objeto) directamente a nuestro formato deseado usando headers
    const rowData = convertCommaSeparatedStringToObject(headers, Object.values(data).join(','));
    jsonData.push(rowData);
}


function endProcessing() {
    const result = jsonData.length > 0 ? jsonData : null;
    resolve(result);
}

function handleError(error) {
    reject(error);
}

//Ejemplo
//Input
//  csvFilePath="datos.csv"
//Output
// [{nombre:"dsd"}, {nombre:"dsd"}, {nombre:"dsd"}]
function csvToJson(csvFilePath) {
    return new Promise((resolve, reject) => {
        const jsonData = [];
        const headers = [];

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('headers', readHeaders)
            .on('data', processData)
            .on('end', endProcessing)
            .on('error', handleError);
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