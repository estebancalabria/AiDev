




//Generarme un funcion que tome un objeto json y convierta las claves a minuscula
function convertirClavesMinuscula(objeto){
    let objetoMinuscula = {};
    Object.keys(objeto).forEach(key => {
        objetoMinuscula[key.toLowerCase()] = objeto[key];
    });
    return objetoMinuscula;
}

// Implementación del algoritmo de Merge Sort
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

// Ejemplo de uso
const arr = [5, 3, 8, 4, 2, 1, 6, 7];
const sortedArr = mergeSort(arr);
console.log(sortedArr);