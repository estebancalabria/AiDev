
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