<?php
//generame una funcion que calcule si u n numero es primo
function esPrimo($numero) {
    // 1 no es primo por definición
    if ($numero <= 1) {
        return false;
    }
    
    // Verificamos desde 2 hasta la raíz cuadrada del número
    for ($i = 2; $i <= sqrt($numero); $i++) {
        if ($numero % $i == 0) {
            return false;
        }
    }
    
    return true;
}

function esPalindromo($texto) {
    // Convertimos a minúsculas y eliminamos espacios y caracteres especiales
    $texto = strtolower(preg_replace('/[^A-Za-z0-9]/', '', $texto));
    
    // Comparamos el string original con su reverso
    return $texto === strrev($texto);
}


?>