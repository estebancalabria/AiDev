/*function csvToJson(csvFilePath) {
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
}*/

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