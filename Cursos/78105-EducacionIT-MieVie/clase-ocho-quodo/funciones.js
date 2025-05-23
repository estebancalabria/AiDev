
function calcularDescuento(precio, porcentaje) {
    if (precio === undefined || porcentaje === undefined) {
        throw new Error("Los argumentos son obligatorios.");
    }

    if (precio < 0) {
        throw new Error("El precio no puede ser negativo.");
    }

    if (porcentaje > 100) {
        throw new Error("El porcentaje no puede ser mayor a 100.");
    }

    const descuento = (precio * porcentaje) / 100;
    return precio - descuento;
}

module.exports = calcularDescuento;ffffdsdfdxcxxdcfvc c 