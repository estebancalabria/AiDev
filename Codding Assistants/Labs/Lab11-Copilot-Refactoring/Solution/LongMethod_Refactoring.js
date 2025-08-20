
//Prompt Utilizado : 
// "El siguiente metodo posee el code smell "long method" me lo podes separar en métodos más cortos para mayor legibilidad y que se entienda mejor"
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