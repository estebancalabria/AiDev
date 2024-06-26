const fs = require('fs');
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