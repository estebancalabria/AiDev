
/**
 * Returns the maximum integer value from an array.
 *
 * @param {number[]} arr - The array of integers to search.
 * @returns {number} The maximum integer in the array.
 * @throws {Error} If the input is not an array.
 * @throws {Error} If the array is empty.
 * @throws {Error} If any element in the array is not an integer.
 */
function maxValue(arr) {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array.");
    }
    if (arr.length === 0) {
        throw new Error("Array is empty.");
    }
    for (let i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i])) {
            throw new Error("All elements must be integers.");
        }
    }
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

//quiero una funciion que calcule el promedio en un array
/**
 * Calculates the average (mean) of an array of numbers.
 *
 * @param {number[]} arr - The array of numbers to average.
 * @returns {number|undefined} The average value, or undefined if the array is empty.
 */
function average(arr){
  if(arr.length === 0) return undefined;
  let sum = 0;
  for(let i = 0; i < arr.length; i++){
    sum += arr[i];
  }
  return sum / arr.length;
}

function standardDeviation(arr) {
    if (arr.length === 0) return undefined;
    const avg = average(arr);
    let sumSq = 0;
    for (let i = 0; i < arr.length; i++) {
        sumSq += Math.pow(arr[i] - avg, 2);
    }
    return Math.sqrt(sumSq / arr.length);
}

function mode(arr) {
    if (arr.length === 0) return undefined;
    
    // Crear un mapa para contar las frecuencias
    const frecuencias = {};
    
    // Contar cada elemento
    for (let i = 0; i < arr.length; i++) {
        const elemento = arr[i];
        frecuencias[elemento] = (frecuencias[elemento] || 0) + 1;
    }
    
    // Encontrar la frecuencia máxima
    let maxFrecuencia = 0;
    for (let elemento in frecuencias) {
        if (frecuencias[elemento] > maxFrecuencia) {
            maxFrecuencia = frecuencias[elemento];
        }
    }
    
    // Encontrar todos los elementos con la frecuencia máxima
    const modas = [];
    for (let elemento in frecuencias) {
        if (frecuencias[elemento] === maxFrecuencia) {
            // Convertir de vuelta a número si es necesario
            const valor = isNaN(elemento) ? elemento : Number(elemento);
            modas.push(valor);
        }
    }
    
    // Si todos los elementos aparecen una sola vez, no hay moda
    if (maxFrecuencia === 1 && modas.length === arr.length) {
        return null; // No hay moda
    }
    
    // Si hay una sola moda, devolver el valor, si hay múltiples devolver el array
    return modas.length === 1 ? modas[0] : modas;
}



