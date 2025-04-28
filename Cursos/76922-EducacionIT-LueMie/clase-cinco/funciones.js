

//Devuelve la mayor diferencia entre elementos consecutivos de un array.
javascript
/**
 * Returns the maximum absolute difference between consecutive elements in the input array.
 * @param {number[]} arr - An array of numbers.
 * @returns {number} The largest absolute difference between any two consecutive elements.
 */
function maxAdjacentDiff(arr) {
    if (!Array.isArray(arr) || arr.length < 2) return 0;
    let max = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      let diff = Math.abs(arr[i] - arr[i + 1]);
      if (diff > max) max = diff;
    }
    return max;
}


//Buscar Valor en una matriz
function contains(matrix, value) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === value) return true;
      }
    }
    return false;
  }



