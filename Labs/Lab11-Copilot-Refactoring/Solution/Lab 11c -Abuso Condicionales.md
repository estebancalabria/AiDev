# Laboratorio de Refactoring con GitHub Copilot: Condicionales Excesivos o Anidados 🌳🛠️

En este laboratorio, aprenderemos a identificar y refactorizar condicionales excesivos o anidados utilizando GitHub Copilot. El objetivo principal es mejorar la legibilidad y mantenibilidad del código.

## Paso 1: Código Inicial con Condicionales Excesivos 📄

A continuación, se muestra un ejemplo de código con condicionales excesivos:

```javascript
function calcularPrecio(edad, esEstudiante, esSocio, esDomingo) {
  let precioBase = 10;

  if (edad < 18) {
    precioBase = 5;
  } else if (edad >= 60) {
    precioBase = 7;
  }

  if (esEstudiante) {
    precioBase -= 2;
  }

  if (esSocio) {
    precioBase -= 3;
  }

  if (esDomingo) {
    if (esEstudiante || esSocio) {
      precioBase -= 1;
    } else {
      precioBase += 2;
    }
  }

  return precioBase;
}
```

Este código calcula el precio de entrada según la edad, si es estudiante, socio y si es domingo. Sin embargo, tiene varios condicionales anidados y repetidos, lo que dificulta la lectura y el mantenimiento.

## Paso 2: Refactorizar Condicionales Excesivos 🛠️

Prompt Utilizado: 
> "Refactoriza esta función para eliminar los condicionales excesivos y mejorar la legibilidad del código."

```javascript
function calcularPrecio(edad, esEstudiante, esSocio, esDomingo) {
  let precioBase = 10;
  const descuentos = [];

  if (edad < 18) {
    precioBase = 5;
  } else if (edad >= 60) {
    descuentos.push(3);
  }

  if (esEstudiante) {
    descuentos.push(2);
  }

  if (esSocio) {
    descuentos.push(3);
  }

  if (esDomingo) {
    if (esEstudiante || esSocio) {
      descuentos.push(1);
    } else {
      precioBase += 2;
    }
  }

  const totalDescuentos = descuentos.reduce((acc, descuento) => acc + descuento, 0);
  const precioFinal = precioBase - totalDescuentos;

  return precioFinal;
}
```

En esta refactorización, hemos:

- Eliminado los condicionales anidados dentro del condicional `esDomingo`.
- Utilizado un array `descuentos` para almacenar los descuentos aplicables.
- Usado el método `reduce` para sumar los descuentos y calcular el precio final.

## Paso 3: Mejorar la Refactorización 💡

Prompt Utilizado: "Mejora aún más esta refactorización para simplificar los condicionales y hacer el código más legible."

```javascript
function calcularPrecio(edad, esEstudiante, esSocio, esDomingo) {
  const precioBase = edad < 18 ? 5 : edad >= 60 ? 7 : 10;
  const descuentos = [];

  if (esEstudiante) descuentos.push(2);
  if (esSocio) descuentos.push(3);

  const descuentoDomingo = (esEstudiante || esSocio) ? 1 : -2;
  const totalDescuentos = descuentos.reduce((acc, descuento) => acc + descuento, 0) + (esDomingo ? descuentoDomingo : 0);

  return precioBase - totalDescuentos;
}
```

En esta mejora, hemos:

- Utilizado el operador ternario para simplificar el cálculo del `precioBase`.
- Simplificado los condicionales para agregar descuentos al array `descuentos`.
- Calculado el `descuentoDomingo` utilizando un operador ternario y un valor negativo para representar un recargo.
- Simplificado el cálculo del `totalDescuentos` utilizando el operador ternario para agregar el `descuentoDomingo` si es domingo.

## Paso 4: Conclusión 🎉

¡Felicitaciones! Has completado este laboratorio de refactorización de condicionales excesivos o anidados con GitHub Copilot. Has aprendido a identificar y refactorizar este código smell, mejorando la legibilidad y mantenibilidad del código.

Recuerda que GitHub Copilot es una herramienta de asistencia y no reemplaza completamente el trabajo del desarrollador. Siempre debes revisar y validar las sugerencias de Copilot antes de aceptarlas. Además, es importante seguir las mejores prácticas y los estándares de codificación de tu equipo o proyecto.

¡Sigue practicando y explorando las capacidades de GitHub Copilot! 🚀