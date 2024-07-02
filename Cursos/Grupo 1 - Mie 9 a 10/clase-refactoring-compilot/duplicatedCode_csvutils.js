
//Ejemplo
//Input
// commaSeparatedString = 'John,25,New York'
//Output
// ['John', '25', 'New York']
export function convertCommaSeparatedStringToArray(commaSeparatedString) {
    return commaSeparatedString.split(',');
}

//Ejemplo
//Input 
//   const headers = ['name', 'age', 'city'];
//   const commaSeparatedString = 'John,25,New York';
//Output
//   { name: 'John', age: '25', city: 'New York' }
export function convertCommaSeparatedStringToObject(headers, commaSeparatedString) {
    const data = commaSeparatedString.split(',');
    const row = {};
    headers.forEach((header, index) => {
        row[header] = rowData[index];
    });
    return row;
}

