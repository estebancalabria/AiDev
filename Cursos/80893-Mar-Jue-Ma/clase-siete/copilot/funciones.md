# Documentación de `funciones.js`

Este archivo contiene funciones para realizar cálculos estadísticos y de análisis sobre arrays de números en JavaScript. Todas las funciones están documentadas con JSDoc y validan sus entradas para asegurar resultados correctos.

## Índice de funciones
- [`calculateSum`](#calculatesum)
- [`calculateAverage`](#calculateaverage)
- [`calculateStandardDeviation`](#calculatestandarddeviation)
- [`calculateMedian`](#calculatemedian)
- [`findMostFrequentElement`](#findmostfrequentelement)

---

## `calculateSum(arr)`

Calcula la suma de los elementos de un array de números.

```js
calculateSum(arr)
```

**Parámetros:**
- `arr` (`number[]`): Array de números a sumar.

**Retorna:**
- `number`: La suma de los elementos del array.

**Errores:**
- Lanza `TypeError` si el input no es un array o si algún elemento no es un número válido.

---

## `calculateAverage(arr)`

Calcula el promedio de los números en el array. Retorna 0 si el array está vacío.

```js
calculateAverage(arr)
```

**Parámetros:**
- `arr` (`number[]`): Array de números a promediar.

**Retorna:**
- `number`: El valor promedio de los elementos del array.

---

## `calculateStandardDeviation(arr)`

Calcula el desvío estándar de los números en el array. Retorna 0 si el array está vacío.

```js
calculateStandardDeviation(arr)
```

**Parámetros:**
- `arr` (`number[]`): Array de números para calcular el desvío estándar.

**Retorna:**
- `number`: El desvío estándar de los elementos del array.

---

## `calculateMedian(arr)`

Calcula la mediana de los números en el array. Retorna 0 si el array está vacío.

```js
calculateMedian(arr)
```

**Parámetros:**
- `arr` (`number[]`): Array de números para calcular la mediana.

**Retorna:**
- `number`: La mediana de los elementos del array.

---

## `findMostFrequentElement(arr)`

Encuentra el elemento más frecuente en el array. Retorna `undefined` si no hay elementos repetidos o el array está vacío.

```js
findMostFrequentElement(arr)
```

**Parámetros:**
- `arr` (`any[]`): Array de elementos para buscar el más frecuente.

**Retorna:**
- `any | undefined`: El elemento más frecuente o `undefined` si no hay repetidos.

---

## Ejemplo de uso

```js
const datos = [1, 2, 2, 3, 4];
console.log(calculateSum(datos)); // 12
console.log(calculateAverage(datos)); // 2.4
console.log(calculateStandardDeviation(datos)); // 1.019...
console.log(calculateMedian(datos)); // 2
console.log(findMostFrequentElement(datos)); // 2
```

---

> Todas las funciones validan sus entradas y están pensadas para trabajar con arrays de números, salvo `findMostFrequentElement`, que acepta cualquier tipo de elemento.
