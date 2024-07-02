const fs = require('fs');
const csv = require('csv-parser');

function processHeaders(headerRow) {
    headers.push(...headerRow);
}

function processRowData(data) {
    const rowData = {};
    headers.forEach(function(header, index) {
        rowData[header] = data[index];
    });
    jsonData.push(rowData);
}

function finalizeParsing() {
    const result = jsonData.length > 0 ? jsonData : null;
    return result;
}

async function csvToJson(csvFilePath) {
    const jsonData = [];
    const headers = [];

    try {
        const readStream = fs.createReadStream(csvFilePath);
        const csvParser = csv();

        await new Promise((resolve, reject) => {
            readStream.on('error', function(error) {
                reject(error);
            });

            csvParser.on('headers', function(headerRow) {
                processHeaders(headerRow);
            });

            csvParser.on('data', function(data) {
                processRowData(data);
            });

            csvParser.on('end', function() {
                resolve();
            });

            readStream.pipe(csvParser);
        });

        return finalizeParsing();
    } catch (error) {
        throw new Error(`Error al procesar el archivo CSV: ${error}`);
    }
}

// Ejemplo de uso
csvToJson('datos.csv')
  .then(jsonData => {
    console.log(jsonData);
  })
  .catch(error => {
    console.error(`Error al procesar el archivo CSV: ${error}`);
  });