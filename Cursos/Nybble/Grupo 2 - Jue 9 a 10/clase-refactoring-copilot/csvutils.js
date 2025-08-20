
//Input
//   commaSeparatedString="dsd,dsd,dsd"
//Output
//   ["dsd", "dsd", "dsd"]
export function convertCommaSeparatedStringToArray(commaSeparatedString) {
    return commaSeparatedString.split(',');
}

//Input
//  headers=["nombre", "apellido", "edad"]
//  commaSeparatedString="dsd,dsd,dsd"
//Output
// {nombre:"dsd", apellido:"dsd", edad:"dsd"}
export function convertCommaSeparatedStringToObject(headers, commaSeparatedString) {
    const data = commaSeparatedString.split(',');
    const row = {};
    headers.forEach((header, index) => {
        row[header] = rowData[index];
    });
    return row;
}