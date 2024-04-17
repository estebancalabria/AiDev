# Laboratorio: Utilizar prompt engineering para programar

## 1. Refactorizar código (Ejemplo 1)

### Enunciado
Tienes el siguiente código que calcula el área de un rectángulo y luego registra un mensaje en la consola dependiendo del tamaño del área. Refactoriza este código para mejorar su legibilidad y mantenibilidad.

### Fragmento de Código
```javascript
function calculateArea(length, width) {
  let area = length * width;
  if (area > 100) {
    console.log("El área es mayor a 100");
  } else {
    console.log("El área es menor o igual a 100");
  }
  return area;
}
```

### Prompt a Utilizar
```
Tengo el siguiente código y necesito que lo refactorices para mejorar su legibilidad y mantenibilidad:

[INSERT YOUR CODE HERE]
```

### Solución
```javascript
function calculateArea(length, width) {
  const area = length * width;
  logAreaStatus(area);
  return area;
}

function logAreaStatus(area) {
  if (area > 100) {
    console.log("El área es mayor a 100");
  } else {
    console.log("El área es menor o igual a 100");
  }
}
```
En este caso, se refactorizó la función `calculateArea` para separar la lógica de cálculo y la lógica de registro en dos funciones diferentes, siguiendo el principio de responsabilidad única.

## 2. Refactorizar código (Ejemplo 2) 

### Enunciado
Tienes el siguiente código que calcula el área de un círculo y luego registra un mensaje en la consola dependiendo del tamaño del área. Refactoriza este código para mejorar su legibilidad y mantenibilidad.

### Fragmento de Código
```javascript
function calculateCircleArea(radius) {
  let area = Math.PI * radius * radius;
  if (area > 100) {
    console.log("El área del círculo es mayor a 100");
  } else {
    console.log("El área del círculo es menor o igual a 100");
  }
  return area;
}
```

### Prompt a Utilizar
```
Tengo el siguiente código y necesito que lo refactorices para mejorar su legibilidad y mantenibilidad:

[INSERT YOUR CODE HERE]
```

### Solución
```javascript
function calculateCircleArea(radius) {
  const area = Math.PI * radius * radius;
  logCircleAreaStatus(area);
  return area;
}

function logCircleAreaStatus(area) {
  if (area > 100) {
    console.log("El área del círculo es mayor a 100");
  } else {
    console.log("El área del círculo es menor o igual a 100");
  }
}
```
Al igual que en el ejemplo anterior, se separó la lógica de cálculo y registro en funciones independientes para mejorar la legibilidad y mantenibilidad del código.

## 3. Generar código (Ejemplo 1)

### Enunciado
Necesitas una función en JavaScript que tome un objeto de usuario y devuelva un array de objetos de permisos basados en el rol del usuario. Por ejemplo, si el usuario tiene el rol "admin", debe tener permisos de lectura, escritura y eliminación. Si el usuario tiene el rol "manager", debe tener permisos de lectura y escritura.

### Prompt a Utilizar
```
Necesito una función en JavaScript que tome un objeto de usuario y devuelva un array de objetos de permisos basados en el rol del usuario. Por ejemplo, si el usuario tiene el rol "admin", debe tener permisos de lectura, escritura y eliminación. Si el usuario tiene el rol "manager", debe tener permisos de lectura y escritura.

Puedes generar el código para mí?
```

### Solución
```javascript
function getUserPermissions(user) {
  const permissions = [];
  switch (user.role) {
    case "admin":
      permissions.push({ action: "read", resource: "*" });
      permissions.push({ action: "write", resource: "*" });
      permissions.push({ action: "delete", resource: "*" });
      break;
    case "manager":
      permissions.push({ action: "read", resource: "*" });
      permissions.push({ action: "write", resource: "*" });
      break;
    case "employee":
      permissions.push({ action: "read", resource: "documents" });
      break;
    default:
      permissions.push({ action: "read", resource: "public" });
  }
  return permissions;
}

// Ejemplo de uso
const user1 = { id: 1, name: "John Doe", role: "admin" };
const user2 = { id: 2, name: "Jane Smith", role: "manager" };
const user3 = { id: 3, name: "Bob Johnson", role: "employee" };
const user4 = { id: 4, name: "Alice Williams", role: "visitor" };

console.log(getUserPermissions(user1)); // [{ action: 'read', resource: '*' }, { action: 'write', resource: '*' }, { action: 'delete', resource: '*' }]
console.log(getUserPermissions(user2)); // [{ action: 'read', resource: '*' }, { action: 'write', resource: '*' }]
console.log(getUserPermissions(user3)); // [{ action: 'read', resource: 'documents' }]
console.log(getUserPermissions(user4)); // [{ action: 'read', resource: 'public' }]
```

## 4. Generar código (Ejemplo 2)

### Enunciado
Necesitas una función en JavaScript que tome un array de números y devuelva un objeto con la media, la mediana y la moda de los números.

### Prompt a Utilizar
```
Necesito una función en JavaScript que tome un array de números y devuelva un objeto con la media, la mediana y la moda de los números.

Puedes generar el código para mí?
```

### Solución
```javascript
function calculateStatistics(numbers) {
  // Calcular la media
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const mean = sum / numbers.length;

  // Calcular la mediana
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0
    ? (sorted[middleIndex - 1] + sorted[middleIndex]) / 2
    : sorted[middleIndex];

  // Calcular la moda
  const frequencyMap = numbers.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  const mode = Object.keys(frequencyMap).reduce((acc, num) =>
    frequencyMap[num] > frequencyMap[acc] ? num : acc
  , numbers[0]);

  return { mean, median, mode };
}

// Ejemplo de uso
const numbers = [5, 2, 8, 1, 9, 3, 7, 4, 6, 5];
const statistics = calculateStatistics(numbers);
console.log(statistics); // { mean: 5, median: 5, mode: 5 }
```

## 5. Explicar código (Ejemplo 1)

### Enunciado
Tienes el siguiente código que implementa una función para validar si una cadena de texto es un correo electrónico válido. Explica cómo funciona este código de manera que una persona no técnica pueda entenderlo.

### Fragmento de Código
```javascript
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### Prompt a Utilizar
```
No entiendo cómo funciona este código. Explícamelo de manera que una persona no técnica pueda entenderlo:

[INSERT YOUR CODE HERE]
```

### Solución
```markdown
## Validador de correo electrónico

La función `validateEmail` se encarga de verificar si un correo electrónico es válido o no.

**¿Cómo funciona?**
1. Primero, se define una expresión regular (`emailRegex`) que se utiliza para comprobar si un correo electrónico tiene el formato correcto.
2. La expresión regular busca que el correo electrónico tenga:
   - Al menos un carácter que no sea un espacio en blanco (`[^\s@]+`) antes del símbolo `@`.
   - Al menos un carácter que no sea un espacio en blanco (`[^\s@]+`) después del símbolo `@`.
   - Al menos un carácter que no sea un espacio en blanco (`[^\s@]+`) después del punto (`.`).
3. Luego, la función `validateEmail` toma un correo electrónico como entrada y verifica si coincide con la expresión regular utilizando el método `test()`. Si coincide, la función devuelve `true`, indicando que el correo electrónico es válido. Si no coincide, devuelve `false`, indicando que el correo electrónico no es válido.

**Ejemplo de uso:**
```javascript
const email1 = "example@example.com";
const email2 = "example@example";

console.log(validateEmail(email1)); // true
console.log(validateEmail(email2)); // false
```
```

## 6. Explicar código (Ejemplo 2)

### Enunciado
Tienes el siguiente código que implementa una función para calcular la diferencia de tiempo entre dos fechas. Explica cómo funciona este código de manera que una persona no técnica pueda entenderlo.

### Fragmento de Código
```javascript
function calculateTimeDifference(date1, date2) {
  const timeDiff = Math.abs(date2 - date1);
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return {
    days: daysDiff,
    hours: hoursDiff,
    minutes: minutesDiff,
    seconds: secondsDiff
  };
}
```

### Prompt a Utilizar
```
No entiendo cómo funciona este código. Explícamelo de manera que una persona no técnica pueda entenderlo:

[INSERT YOUR CODE HERE]
```

### Solución
```markdown
## Calculadora de diferencia de tiempo

La función `calculateTimeDifference` se encarga de calcular la diferencia de tiempo entre dos fechas y devolver los resultados en días, horas, minutos y segundos.

**¿Cómo funciona?**
1. Primero, se calcula la diferencia de tiempo entre las dos fechas en milisegundos utilizando la operación `date2 - date1`. El resultado se almacena en la variable `timeDiff`.
2. Luego, se calcula cuántos días hay en la diferencia de tiempo. Para ello, se divide `timeDiff` por el número de milisegundos en un día (1000 milisegundos x 60 segundos x 60 minutos x 24 horas) y se redondea hacia abajo utilizando `Math.floor()`. Este resultado se almacena en la variable `daysDiff`.
3. A continuación, se calcula cuántas horas hay en la diferencia de tiempo restante (es decir, la diferencia de tiempo que no se contabilizó como días). Para ello, se divide el resto de la división anterior por el número de milisegundos en una hora (1000 milisegundos x 60 segundos x 60 minutos) y se redondea hacia abajo utilizando `Math.floor()`. Este resultado se almacena en la variable `hoursDiff`.
4. De manera similar, se calculan los minutos y segundos restantes dividiendo el resto de las divisiones anteriores por el número de milisegundos en un minuto (1000 milisegundos x 60 segundos) y un segundo (1000 milisegundos), respectivamente, y redondeando hacia abajo utilizando `Math.floor()`. Estos resultados se almacenan en las variables `minutesDiff` y `secondsDiff`.
5. Finalmente, la función devuelve un objeto con las diferencias de tiempo calculadas en días, horas, minutos y segundos.

**Ejemplo de uso:**
```javascript
const date1 = new Date("2023-04-01");
const date2 = new Date("2023-04-15");
const timeDifference = calculateTimeDifference(date1, date2);
console.log(timeDifference); // { days: 14, hours: 0, minutes: 0, seconds: 0 }
```
```

## 7. Documentar código

### Enunciado
Tienes el siguiente código que implementa una función para validar si una dirección de correo electrónico es válida. Documenta este código de manera que una persona no técnica pueda entender cómo funciona.

### Fragmento de Código
```javascript
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### Prompt a Utilizar
```
No entiendo cómo funciona este código. Explícamelo de manera que una persona no técnica pueda entenderlo:

[INSERT YOUR CODE HERE]
```

### Solución
```markdown
## Validador de correo electrónico

La función `validateEmail` se encarga de verificar si un correo electrónico es válido o no.

**¿Cómo funciona?**
1. Primero, se define una expresión regular (`emailRegex`) que se utiliza para comprobar si un correo electrónico tiene el formato correcto.
2. La expresión regular busca que el correo electrónico tenga:
   - Al menos un carácter que no sea un espacio en blanco (`[^\s@]+`) antes del símbolo `@`.
   - Al menos un carácter que no sea un espacio en blanco (`[^\s@]+`) después del símbolo `@`.
   - Al menos un carácter que no sea un espacio en blanco (`[^\s@]+`) después del punto (`.`).
3. Luego, la función `validateEmail` toma un correo electrónico como entrada y verifica si coincide con la expresión regular utilizando el método `test()`. Si coincide, la función devuelve `true`, indicando que el correo electrónico es válido. Si no coincide, devuelve `false`, indicando que el correo electrónico no es válido.

**Ejemplo de uso:**
```javascript
const email1 = "example@example.com";
const email2 = "example@example";

console.log(validateEmail(email1)); // true
console.log(validateEmail(email2)); // false
```
```

## 8. Generar código (Ejemplo 3)

### Enunciado
Necesitas una función en JavaScript que tome un array de objetos que representan empleados y devuelva un objeto que resuma la información de los empleados por departamento.

### Prompt a Utilizar
```
Necesito una función en JavaScript que tome un array de objetos que representan empleados y devuelva un objeto que resuma la información de los empleados por departamento.

Cada objeto de empleado tiene las siguientes propiedades:
- id
- nombre
- departamento
- salario

Puedes generar el código para mí?
```

### Solución
```javascript
function summarizeEmploy