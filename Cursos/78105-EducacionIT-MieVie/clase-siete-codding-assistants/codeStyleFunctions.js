//Respetar estilo de codificación definido en archivo #file:codeStyle.txt
//Los nombres de las funciones usan notacion PascalCase (Primera letra en mayuscula)
//Los nombres de las variables usan notacion PascalCase (Primera letra en mayuscula)

//Calcular el promedio de valores de un array
//Los nombres de las variables usan notacion PascalCase (Primera letra en mayuscula)
function CalcularPromedio(Numeros) {
    // Validación: debe ser un array
    if (!Array.isArray(Numeros)) {
        throw new TypeError("El argumento debe ser un arreglo de números.");
    }
    // Validación: no debe estar vacío
    if (Numeros.length === 0) {
        throw new Error("El arreglo no puede estar vacío.");
    }
    // Validación: todos deben ser números finitos
    for (let I = 0; I < Numeros.length; I++) {
        if (typeof Numeros[I] !== "number" || !Number.isFinite(Numeros[I])) {
            throw new TypeError(`El elemento en la posición ${I} no es un número válido.`);
        }
    }

    let Suma = 0;
    for (let I = 0; I < Numeros.length; I++) {
        Suma += Numeros[I];
    }
    return Suma / Numeros.length;
}

