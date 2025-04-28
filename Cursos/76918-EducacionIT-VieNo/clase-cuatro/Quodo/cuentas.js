 function esPrimo(numero) {
     // Check if the input is a number
     if (typeof numero !== 'number' || !Number.isInteger(numero)) {
         throw new Error('Input must be an integer number.');
     }

     // Los números menores o iguales a 1 no son primos
     if (numero <= 1) return false;

     // Verificar si es divisible por algún número hasta su raíz cuadrada
     for (let i = 2; i <= Math.sqrt(numero); i++) {
         if (numero % i === 0) return false;
     }

     return true;
 }
