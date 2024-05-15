


/**
 * Converts the keys of an object to title case.
 * @param {Object} obj - The object whose keys are to be converted to title case.
 * @returns {Object} - A new object with keys converted to title case.
 */
function convertKeysToTitleCase(obj) {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        const titleCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
        newObj[titleCaseKey] = obj[key];
    });
    return newObj;
}

/**
 * Sorts an array using the merge sort algorithm.
 *
 * @param {Array} arr - The array to be sorted.
 * @returns {Array} - The sorted array.
 */
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

/**
 * Merges two sorted arrays into a single sorted array.
 *
 * @param {Array} left - The left sorted array.
 * @param {Array} right - The right sorted array.
 * @returns {Array} - The merged sorted array.
 */
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

