import { convertCommaSeparatedStringToconvertCommaSeparatedStringToObjectArray, convertCommaSeparatedStringToObject } from './duplicatedCode_csvutils';

function csvToJson(csvFilePath) {
    const jsonData = [];
    const fileData = readFile(csvFilePath);
    const rows = fileData.split('\n');

    // Usando convertCommaSeparatedStringToArray para procesar los encabezados
    const headers = convertCommaSeparatedStringToArray(rows[0]);

    for (let i = 1; i < rows.length; i++) {
        // Usando convertCommaSeparatedStringToObject para procesar cada fila
        const rowData = (headers, rows[i]);
        jsonData.push(rowData);
    }

    const result = jsonData.length > 0 ? jsonData : null;
    return result;
}

function readFile(filePath) {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return fileData;
}