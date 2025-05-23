function calcularPromedio(numeros) {
    let suma = 0;
    numeros.forEach(num => {
        suma += num;
    });
    return suma / numeros.length;
}

//
// funcion que me devuelve un objeto con el maximo y el minino de un array
//
function calcularMaximoMinimo(numeros) {
    // Validación: debe ser un array
    if (!Array.isArray(numeros)) {
        throw new TypeError("El argumento debe ser un arreglo de números.");
    }
    // Validación: no debe estar vacío
    if (numeros.length === 0) {
        throw new Error("El arreglo no puede estar vacío.");
    }
    // Validación: todos deben ser números finitos
    for (let i = 0; i < numeros.length; i++) {
        if (typeof numeros[i] !== "number" || !Number.isFinite(numeros[i])) {
            throw new TypeError(`El elemento en la posición ${i} no es un número válido.`);
        }
    }

    let maximo = numeros[0];
    let minimo = numeros[0];

    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] > maximo) {
            maximo = numeros[i];
        }
        if (numeros[i] < minimo) {
            minimo = numeros[i];
        }
    }

    return { maximo, minimo };
}

/**
 * Calcula el desvío estándar de un arreglo de números.
 *
 * @param {number[]} numeros - Un arreglo de números para calcular el desvío estándar.
 * @returns {number} El desvío estándar de los números proporcionados.
 */
function calcularDesvioEstandar(numeros) {
    const promedio = calcularPromedio(numeros);
    let sumaCuadrados = 0;
    for (let i = 0; i < numeros.length; i++) {
        sumaCuadrados += Math.pow(numeros[i] - promedio, 2);
    }
    const varianza = sumaCuadrados / numeros.length;
    return Math.sqrt(varianza);
}

/**
 * Calcula la mediana de un arreglo de números.
 *
 * @param {number[]} numeros - Un arreglo de números.
 * @returns {number} La mediana del arreglo.
 */
function calcularMediana(numeros) {
    const arr = [...numeros].sort((a, b) => a - b);
    const n = arr.length;
    if (n % 2 === 0) {
        // Si es par, promedio de los dos del medio
        return (arr[n / 2 - 1] + arr[n / 2]) / 2;
    } else {
        // Si es impar, el del medio
        return arr[Math.floor(n / 2)];
    }
}

