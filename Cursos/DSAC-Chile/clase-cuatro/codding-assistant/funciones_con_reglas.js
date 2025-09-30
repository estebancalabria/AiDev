/*
Ver reglas en @rules.txt
*/

function determinar_mayor(arr) {
    // Validar que el array no esté vacío y que todos los elementos sean números enteros
    if (arr.length === 0) return undefined;
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number' || !Number.isInteger(arr[i])) {
            throw new Error("All elements must be integers.");     
        }
    }
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    ....