fs = require('fs');
const csv = require('csv-parser');

function processHeaders(headerRow) {
    headers.push(...headerRow);
}

function processData(data) {
    const rowData = {};
    headers.forEach((header, index) => {
        rowData[header] = data[index];
    });
    jsonData.push(rowData);
}
//Ejemplo
//Input
//   csvFilePath="datos.csv"    
//Output
//   [{nombre:"dsd"}, {nombre:"dsd"}, {nombre:"dsd"}]

function csvToJson(csvFilePath) {
    return new Promise((resolve, reject) => {
        const jsonData = [];
        const headers = [];

        const readStream = fs.createReadStream(csvFilePath);
        readStream
            .pipe(csv())
            .on('headers', (headerRow) => {
                processHeaders(headerRow);
            })
            .on('data', (data) => {
                processData(data);
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