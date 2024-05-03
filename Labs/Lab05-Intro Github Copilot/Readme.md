# Laboratorio de GitHub Copilot 🔬

En este laboratorio, exploraremos las funcionalidades de GitHub Copilot en Visual Studio Code.

## Objetivos ✅

En este laboratorio aprenderemos
* A Generar codigo con Github Copilot
* A utlizar la IA para documentar nuestro codigo
* A explicar como funciona un codigo y arreglarlo con IA de ser necesario
* A utilizar pruebas unitarias con IA para asegurarnos que nuestro codigo funcione
* A utilizar el Github Copilot Chat
* A generar proyectos desde cero en las tecnologias mas utilizadas

## Pasos 🚀

### Preparacion del entorno

1. **Instalar GitHub Copilot**: Sigue las instrucciones de instalación en [GitHub Copilot](https://copilot.github.com/).

2. **Generar un proyecto de VSCode**: Abre Visual Studio Code y crea un nuevo proyecto. Vamos a trabajar sobre un archivo CopilotDemo.js

### Probar la generacion de codigo:

   Vamos a utilizar la capacidad de generacion de codigo para generar unas funciones. 
   Vamos a probar generar una funciones para por ejemplo: 
   * Convertir un string a titleCase (la primera con mayuscula, el resto con minuscula)
   * Un metodo que convierte una fecha de formato yyyy-MM-dd a dd-MM-yyyy
   * Crear un bloque con tres funciones para calcular promedio, media y mediana en un array
   * Convertir las claves de un json a minuscula.
   * Desarrollar el mergeSort
   Vamos a usar esos ejemplos para probar 4 formas diferentes de generacion de codigo que nos ofrece GithubCopilot.

#### Generacion de codigo pasiva

Copilot funciona de forma pasiva y nos va haciendo sugerencias a medida que escribimos codigo siempre que utilicemos nombres de funciones significativos. En este caso vamos a escribir la cabecera de la funcion titleCase(str){ y vamos a ver como Copilot hace una sugerencia de codigo en gris. Dicho codigo se llama "ghost code" y lo puedo aceptar con el tabulador [Tab]. En mi caso me genero lo siguiente

```javascript
function titleCase(str) {
    const words = str.split(' ');
    const titleCasedWords = words.map(word => {
        const firstLetter = word[0].toUpperCase();
        const restOfWord = word.slice(1).toLowerCase();
        return firstLetter + restOfWord;
    });
    const titleCasedStr = titleCasedWords.join(' ');
    return titleCasedStr;
}
```
     
#### Generacion de codigo con comentarios (Comment Assisted Code Generation)

Otra forma de utilizar copilot para generar codigo se llama Comment Assisted Code Generation o generacion de codigo asistida por comentarios.
En este caso vamos a escribir un comentario como el que se muestra a continuacion

```javascript
//Generar una funcion que convierta una fecha de formato yyyy-MM-dd a formato dd-MM-yyy
```
Vamos a darle [Enter] y esperar que en base al comentario Github Copilot nos genere una funcion. En mi caso genero lo siguiente

```javascript
//Generar una funcion que convierta una fecha de formato yyyy-MM-dd a formato dd-MM-yyy
function convertirFecha(fecha){
    const fechaArray = fecha.split('-');
    return fechaArray[2] + '-' + fechaArray[1] + '-' + fechaArray[0];
}
```
     
#### Generacion de codigo con el Github Copilot chat Inline (ctrl+i)

El el comando ctrl+i para habilita la ventana emergente para tener acceso al Github Copilot Chat Inline, es decir, en el lugar donde tenemos el cursor. Esta opcion es ideal cuando queremos refactorizar codigo seleccionado o cuando queremos generar mas de una funcion. Vamos a probar pidiendole que "generar  funciones una que calcule la media de un arreglo, otra para el desvio estandar y otra para la mediana. En mi caso me genero:

```javascript
function calculateStandardDeviation(arr) {
    const mean = calculateMean(arr);
    const squaredDifferences = arr.map(num => Math.pow(num - mean, 2));
    const variance = calculateMean(squaredDifferences);
    const standardDeviation = Math.sqrt(variance);
    return standardDeviation;
}

function calculateMean(arr) {
    const sum = arr.reduce((acc, num) => acc + num, 0);
    const mean = sum / arr.length;
    return mean;
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
```
     
#### Generacion de codigo con el Github Copilot chat

En el caso anterior usamos el Github Copilot Chat pero tambien podemos acceder al Chat directamente para generar codigo. En la barra lateral de la izquierda o SideBar de Visual Studio Code podemos encontrar la opcion para acceder al chat. En este caso vamos a pedirle que nos genere una funcion para generar un metodo que reciba un objeto json y convierta sus claves en minuscula (nunca se encontraron con una api rebele de devuelve las claves de un json en minuscula? 😎). En mi caso genera lo siguiente

```javascript
function convertKeysToLowercase(obj) {
    const entries = Object.entries(obj);
    const lowercasedEntries = entries.map(([key, value]) => [key.toLowerCase(), value]);
    const lowercasedObj = Object.fromEntries(lowercasedEntries);
    return lowercasedObj;
}
```
         
### Documentar con IA (/doc)

Vamos a seleccionar la IA para documentar las funciones generada automaticamente. Esto se puede hacer seleccionando el nombre de la funcion y ya sea con el Ctrl+I o el menu emergente de copilot con el boton derecho del mouse

* Utiliza el comando `/doc` sobre una función para realizar esta tarea.
* Tambien podemos abir el girhub copilot chat para generar la documentacion de todo el archivo

### Explicar codigo con IA (/explan)

Utiliza el comando `/explain` sobre una función para solicitar una explicación detallada de su funcionamiento.

Utilizar tanto el Ctr+i junto con el comando /explain para entender como funciona alguna de las funciones generadas. Probar lo mismo seleccionando el codigo de la funcion y utilizando el Github Copilot chat para ver como toma el contexto a partir del codigo seleccionado

### Probar generar pruebas unitarias (/test)

Es importante desconfiar del codigo generado con la IA. 
Con la IA se redefine la forma de utilizar las pruebas unitarias como herramienta
Utiliza el comando `/test` sobre una función para generar pruebas unitarias automáticamente.
* Probar el comando /test solo que probablemente genere tests por consola
* Probar el comando /test jest que genere las pruebas unitarias con esa libreria de testing

### Probar arreglar código con errores (/fix)

Se pide introducir un error sobre alguna de las funciones anteriorres y utiliza el comando /fix sobre este código para corregir los errores.

### Experimentar con  el GitHub Copilot Chat
Interactúa con GitHub Copilot Chat para ver cómo responde a diferentes consultas o instrucciones.
Verificar que podemos modificarle el contexto con el modificador de contexto @ con:
* @workspace para consultas del proyecto actual
* @vscode para consultas sobre el funcionamienteo de Visual Studio Code
* @terminal para consultas sobre el uso de la terminal y respuestas de comandos

## Extra :  Probar el comando `@workspace /new`👽

   Utiliza el comando `@workspace /new` para crear un proyecto, por ejemplo, un proyecto de Node.js con Express.

## Conclusión 🎉

¡Has completado el laboratorio de GitHub Copilot! Experimenta más con las funcionalidades y explora cómo GitHub Copilot puede mejorar tu flujo de trabajo en el desarrollo de software.
