//Una funcion que interambie dos valores
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Randomizes the order of elements in an array.
 * @param {Array} arr - The array to be randomized.
 */
function randomizeArray(arr){
    for (let i = 0; i < arr.length-1; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        swap(arr, i, randomIndex);
    }
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}