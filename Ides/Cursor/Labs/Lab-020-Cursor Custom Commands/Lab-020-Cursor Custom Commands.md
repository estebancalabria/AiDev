# Laboratorio Cursor: Slash Commands para refactor de código

Objetivo: Crear un comando custom en Cursor usando la funcionalidad actual de slash commands (Markdown) para refactorizar código JavaScript.

---

## 1. Estructura del proyecto

Crea la carpeta `cursor-lab` y dentro la siguiente estructura:

```
cursor-lab/
  .cursor/
    commands/
      refactor-code.md   <- tu comando custom
  src/
    messy.js            <- archivo JS de ejemplo
</code>

```

## 2. Código de ejemplo (`src/messy.js`)

```javascript
// messy.js — código con estilo intencionalmente “feo” para refactor

export function doStuff(a, b) {
let x= a * 2;
let y = b*3;
let z = x + y
if(z>10){
console.log("Result is big");
} else { console.log("small"); }
return z;
}
```

Este archivo tiene formato poco legible, nombres pobres y lógica simple: ideal para pedir refactor.


## 3. Crear tu slash-command (`.cursor/commands/refactor-code.md`)

# Refactor Code

```
Refactor the selected JavaScript code according to clean code principles:

* Improve naming, formatting and readability
* Preserve functionality (do not change logic)
* Use best practices (clear indentation, semicolons if desired, consistent spacing)

**Input:** selected code block
**Output:** improved/refactored code block only (without explanations)
```

Este Markdown será el prompt que Cursor usará para refactorizar el código seleccionado.

---

## 4. Abrir la carpeta en Cursor y refrescar

1. Abrí la carpeta `cursor-lab/` en Cursor como workspace raíz.
2. Presioná `Ctrl + Shift + P` y ejecutá `Developer: Reload Window` para refrescar (esto asegura que Cursor detecte tu carpeta `.cursor/commands/`).

---

## 5. Cómo usar el comando

1. Abrí `src/messy.js`.
2. Seleccioná todo el código (o la parte que quieras refactorizar).
3. Abrí el chat de Cursor: atajo por defecto `Ctrl + K` y luego `C` para abrir la paleta de comandos / chat.
4. En el chat de Cursor → escribí `/` → debería aparecer **Refactor Code** → seleccionalo.
5. Cursor generará la versión refactorizada: revisala y aceptala si te convence.

---

## 6. Resultado esperado

Código más limpio, con nombres claros, buena indentación y estilo consistente. Por ejemplo:

```javascript
export function computeResult(a, b) {
  const first = a * 2;
  const second = b * 3;
  const sum = first + second;

if (sum > 10) {
console.log("Result is big");
} else {
console.log("small");
}

return sum;
} 
```

## 7. Consideraciones

* Esta funcionalidad depende de que tu versión de Cursor soporte **slash commands**.
* Revisá siempre el resultado de la IA antes de aplicar cambios.
* Podés crear varios comandos en `.cursor/commands/` para distintas tareas: refactor, tests, documentación, templates, etc.

---

Fin del laboratorio.
