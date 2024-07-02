import { convertCommaSeparatedStringToArray, convertCommaSeparatedStringToObject } from './csvutils.js';

function csvToJson(csvFilePath) {
    const jsonData = [];
    const fileData = readFile(csvFilePath);
    const rows = fileData.split('\n');

    const headers = convertCommaSeparatedStringToArray(rows[0]);

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