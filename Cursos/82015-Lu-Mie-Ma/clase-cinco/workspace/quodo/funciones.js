
// Caso 1 : Generacion de codigo pasiva
//          Solo escribo el nombre de la funcion y el copilot completa lo que sigue

/**
 * Convierte una cadena de texto a formato Title Case (primera letra de cada palabra en mayúscula).
 * 
 * Esta función toma una cadena de texto y convierte cada palabra para que tenga su primera
 * letra en mayúscula y el resto en minúscula, separadas por espacios.
 * 
 * @param {string} str - La cadena de texto que se desea convertir a Title Case
 * @returns {string} La cadena convertida con cada palabra iniciando en mayúscula
 * 
 * @example
 * // Convertir texto en minúsculas
 * titleCase("hello world"); // Retorna: "Hello World"
 * 
 * @example
 * // Convertir texto en mayúsculas
 * titleCase("HELLO WORLD"); // Retorna: "Hello World"
 * 
 * @example
 * // Convertir texto mixto
 * titleCase("hELLo WoRLd"); // Retorna: "Hello World"
 * 
 * @example
 * // Manejar múltiples espacios
 * titleCase("hello    world"); // Retorna: "Hello    World"
 */
function titleCase(str){
  return str.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

// Caso 2 : Generacion de codigo a partir de comentarios
// Quiero una funcion que convierta una fecha de formato yyyy-MM-dd
// a formato dd-MM-yyyy
function convertDateFormat(dateString) {
    if (typeof dateString !== 'string') {
        throw new Error('La fecha debe ser una cadena de texto.');
    }
    const parts = dateString.split('-');
    if (parts.length !== 3) {
        throw new Error('El formato debe ser yyyy-MM-dd.');
    }
    const [year, month, day] = parts;
    if (
        year.length !== 4 ||
        month.length !== 2 ||
        day.length !== 2 ||
        isNaN(Number(year)) ||
        isNaN(Number(month)) ||
        isNaN(Number(day))
    ) {
        throw new Error('El formato debe ser yyyy-MM-dd con valores numéricos.');
    }
    return `${day}-${month}-${year}`;
}

//Caso 3 : Utilizacion del chat Inline (ctrl+I)
// Funcion que calcula el desvio estandar de un array de numeros
/**
 * Calcula el desvío estándar de un arreglo de números.
 *
 * @param {number[]} arr - Arreglo de números para calcular el desvío estándar.
 * @returns {number} El desvío estándar de los valores en el arreglo. Retorna 0 si el arreglo está vacío.
 */
function calcularDesvioEstandar(arr) {
    const n = arr.length;
    if (n === 0) return 0;
    const media = arr.reduce((a, b) => a + b, 0) / n;
    const sumaCuadrados = arr.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);
    return Math.sqrt(sumaCuadrados / n);
}


//Caso 4 : Utilizacion del github copilot chat (ctrl+shift+i)
// Función que convierte todas las claves de un objeto JSON a minúsculas
function convertirClavesAMinuscula(obj) {
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
        return obj;
    }
    
    const resultado = {};
    
    for (const clave in obj) {
        if (obj.hasOwnProperty(clave)) {
            const claveMinuscula = clave.toLowerCase();
            const valor = obj[clave];
            
            // Recursivamente convertir objetos anidados
            if (typeof valor === 'object' && valor !== null && !Array.isArray(valor)) {
                resultado[claveMinuscula] = convertirClavesAMinuscula(valor);
            } else if (Array.isArray(valor)) {
                // Si es un array, procesar cada elemento
                resultado[claveMinuscula] = valor.map(item => 
                    typeof item === 'object' && item !== null && !Array.isArray(item) 
                        ? convertirClavesAMinuscula(item) 
                        : item
                );
            } else {
                resultado[claveMinuscula] = valor;
            }
        }
    }
    
    return resultado;
}

// Ejemplo de uso:
/*
const objetoOriginal = {
    "NOMBRE": "Juan",
    "EDAD": 25,
    "DIRECCION": {
        "CALLE": "Av. Corrientes",
        "NUMERO": 123,
        "CIUDAD": "Buenos Aires"
    },
    "HOBBIES": [
        { "TIPO": "Deportes", "NOMBRE": "Fútbol" },
        { "TIPO": "Música", "NOMBRE": "Guitarra" }
    ]
};

const objetoConvertido = convertirClavesAMinuscula(objetoOriginal);
console.log(objetoConvertido);
*/

//Exporto titlecase
module.exports = {
    titleCase
};