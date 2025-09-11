/**
 * Calcula la suma de los elementos de un array de números.
 * @param {number[]} arr - Array de números a sumar.
 * @returns {number} La suma de los elementos del array.
 * @throws {TypeError} Si el input no es un array o si algún elemento no es un número válido.
 */
function calculateSum(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array.');
    }

    if (arr.length === 0) return 0;

    for (const val of arr) {
        if (typeof val !== 'number' || Number.isNaN(val)) {
            throw new TypeError('All elements in the array must be valid numbers.');
        }
    }

    return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * Calcula el promedio de los números en el array.
 * Retorna 0 si el array está vacío.
 * @param {number[]} arr - Array de números a promediar.
 * @returns {number} El valor promedio de los elementos del array.
 */
function calculateAverage(arr) {
    if (arr.length === 0) return 0;
    const sum = calculateSum(arr);
    return sum / arr.length;
}

/**
 * Calcula el desvío estándar de los números en el array.
 * Retorna 0 si el array está vacío.
 * @param {number[]} arr - Array de números para calcular el desvío estándar.
 * @returns {number} El desvío estándar de los elementos del array.
 */
function calculateStandardDeviation(arr) {
    if (arr.length === 0) return 0;
    const avg = calculateAverage(arr);
    const squaredDifferences = arr.map(val => (val - avg) ** 2);
    const variance = calculateAverage(squaredDifferences);
    return Math.sqrt(variance);
}

/**
 * Calcula la mediana de los números en el array.
 * Retorna 0 si el array está vacío.
 * @param {number[]} arr - Array de números para calcular la mediana.
 * @returns {number} La mediana de los elementos del array.
 */
function calculateMedian(arr) {
    if (arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
        return sorted[mid];
    }
}

/**
 * Encuentra el elemento más frecuente en el array.
 * Retorna undefined si no hay elementos repetidos o el array está vacío.
 * @param {any[]} arr - Array de elementos para buscar el más frecuente.
 * @returns {any|undefined} El elemento más frecuente o undefined si no hay repetidos.
 */
function findMostFrequentElement(arr) {
    if (arr.length === 0) return undefined;
    const counts = {};
    let maxCount = 1;
    let mostFrequent;
    for (const el of arr) {
        counts[el] = (counts[el] || 0) + 1;
        if (counts[el] > maxCount) {
            maxCount = counts[el];
            mostFrequent = el;
        }
    }
    return maxCount > 1 ? mostFrequent : undefined;
}


