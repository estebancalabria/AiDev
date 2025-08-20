/**
 * copilotDemo.js
 * 
 * Este archivo contiene clases de utilidades.
 * 
 * Desarrollado por Esteban Calabria.
 * 
 * Fecha de creación: ${new Date().toLocaleDateString()}
 */

/**
 * Converts a string to title case.
 * @param {string} str - The input string.
 * @returns {string} - The string converted to title case.
 */
function convertirFecha(fecha){
    const fechaArray = fecha.split('-');
    return fechaArray[2] + '-' + fechaArray[1] + '-' + fechaArray[0];
}

/**
 * Calculates the mean value of an array.
 * @param {number[]} arr - The input array.
 * @returns {number} The mean value.
 */
function calculateMean(arr) {
    const sum = calculateSum(arr);
    const mean = sum / arr.length;
    return mean;
}

/**
 * Calculates the sum of an array.
 * @param {number[]} arr - The input array.
 * @returns {number} The sum of the array elements.
 */
function calculateSum(arr) {
    const sum = arr.reduce((acc, num) => acc + num, 0);
    return sum;
}

/**
 * Calculates the median value of an array.
 * @param {number[]} arr - The input array.
 * @returns {number} The median value.
 */
function calculateMedian(arr) {
    const sortedArr = arr.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedArr.length / 2);
    if (sortedArr.length % 2 === 0) {
        const median = (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
        return median;
    } else {
        const median = sortedArr[middleIndex];
        return median;
    }
}

function convertKeysToLowercase(obj) {
    const entries = Object.entries(obj);
    const lowercasedEntries = entries.map(([key, value]) => [key.toLowerCase(), value]);
    const lowercasedObj = Object.fromEntries(lowercasedEntries);
    return lowercasedObj;
}


