//Prompt: 
// Detecte el code Smell "Long Method". Podes mejorar el codigo y de paso hacerlo sincronico sin promesas
/*function csvToJson(csvFilePPath) {
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
}*/

//Version 2
//Prompt Utilizado :  "El siguiente metodo posee el code smell "long method" me lo podes separar en métodos más cortos para mayor legibilidad y que se entienda mejor"
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