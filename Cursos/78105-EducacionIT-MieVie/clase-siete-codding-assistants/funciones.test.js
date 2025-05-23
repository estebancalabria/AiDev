const { calcularMaximoMinimo } = require('./funciones');

// Importar la función a testear

// Test suite para
describe('calcularMaximoMinimo', () => {
    test('devuelve el máximo y mínimo de un arreglo de números positivos', () => {
        const resultado = calcularMaximoMinimo([1, 2, 3, 4, 5]);
        expect(resultado).toEqual({ maximo: 5, minimo: 1 });
    });

    test('devuelve el máximo y mínimo de un arreglo con números negativos', () => {
        const resultado = calcularMaximoMinimo([-10, -5, -3, -20]);
        expect(resultado).toEqual({ maximo: -3, minimo: -20 });
    });

    test('devuelve el máximo y mínimo cuando todos los elementos son iguales', () => {
        const resultado = calcularMaximoMinimo([7, 7, 7, 7]);
        expect(resultado).toEqual({ maximo: 7, minimo: 7 });
    });

    test('devuelve el máximo y mínimo de un arreglo con un solo elemento', () => {
        const resultado = calcularMaximoMinimo([42]);
        expect(resultado).toEqual({ maximo: 42, minimo: 42 });
    });

    test('lanza error si el argumento no es un arreglo', () => {
        expect(() => calcularMaximoMinimo('no es un arreglo')).toThrow(TypeError);
    });

    test('lanza error si el arreglo está vacío', () => {
        expect(() => calcularMaximoMinimo([])).toThrow('El arreglo no puede estar vacío.');
    });

    test('lanza error si algún elemento no es un número', () => {
        expect(() => calcularMaximoMinimo([1, 2, 'tres', 4])).toThrow(TypeError);
    });

    test('lanza error si algún elemento no es un número finito', () => {
        expect(() => calcularMaximoMinimo([1, 2, Infinity, 4])).toThrow(TypeError);
    });
});
