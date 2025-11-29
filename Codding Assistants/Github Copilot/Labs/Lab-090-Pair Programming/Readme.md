# Laboratorio: Pair Programming Real con Copilot/Cursor

Objetivo: Aprender a colaborar con un LLM como si fuera un compañero de equipo real: planificar, ejecutar, revisar, hacer QA y generar commits.

---

## 1. Describir la tarea

Supongamos que queremos **agregar una funcionalidad de validación de emails** en un proyecto de Node.js:

- Crear función `validateEmail(email: string): boolean`  
- Debe retornar `true` si el email tiene formato correcto, `false` si no  
- Incluir comentarios explicativos y ejemplos de uso

> Paso inicial: escribí en el chat de Cursor/Copilot:  
> “Quiero implementar una función `validateEmail` en Node.js. Generá un plan paso a paso para implementarla correctamente.”

---

## 2. Pedir plan

- El LLM genera un **plan de acción** tipo checklist:  
  1. Crear archivo `utils/validation.js`  
  2. Escribir la función `validateEmail` con regex  
  3. Agregar ejemplos de uso dentro de la misma función como comentarios  
  4. Escribir tests unitarios  
  5. Revisar el código y refactorizar si hace falta

> Esto enseña la diferencia entre **responder un prompt** (solo generar código) y **colaborar** (planificar pasos concretos).

---

## 3. Revisar el plan

- Revisá la propuesta del LLM:  
  - ¿El regex propuesto cubre casos reales?  
  - ¿Se respetan convenciones de estilo del proyecto?  
  - ¿Hay pasos redundantes o faltantes?

- Podés editar el plan directamente en el chat y pedir al LLM que lo ajuste.

---

## 4. Ejecutar step-by-step

Para cada paso del plan:

1. Implementá la acción sugerida por el LLM  
2. Revisá el resultado  
3. Pedí al modelo que **explique lo que hizo y por qué**  
4. Ajustá según sea necesario antes de pasar al siguiente paso

> Ejemplo:  
> - Paso 1: crear archivo `utils/validation.js` → LLM puede sugerir la estructura básica  
> - Paso 2: escribir la función `validateEmail` → revisá que el regex sea correcto

---

## 5. Hacer QA con LLM

- Pedí al LLM que **detecte errores o edge cases**:  
  - “Revisá `validateEmail` y decime si falla para emails con subdominios, números, o símbolos especiales”  
- Esto simula revisión de código real entre pares.

---

## 6. Escribir tests automáticos

- Generá tests unitarios con el LLM, por ejemplo usando **Jest**:

<code>
// utils/validation.test.js
import { validateEmail } from './validation';

test('valid emails', () => {
  expect(validateEmail('test@example.com')).toBe(true);
  expect(validateEmail('user.name+tag@domain.co')).toBe(true);
});

test('invalid emails', () => {
  expect(validateEmail('invalid-email')).toBe(false);
  expect(validateEmail('user@.com')).toBe(false);
});
</code>

- El LLM puede incluso sugerir **tests adicionales** para edge cases.

---

## 7. Commit message generado por el modelo

- Una vez terminado el desarrollo y QA:  
- Pedí al LLM que genere un **commit message profesional y descriptivo**:

> “Add validateEmail function with unit tests and edge case handling”

- Esto enseña buenas prácticas de documentación y colaboración profesional.

---

## 8. Beneficios de este flujo

- Los alumnos ven que trabajar con IA **no es solo “pedir código”**  
- Aprenden a colaborar **como con un compañero humano**  
- Mejora planificación, QA, tests y mensajes de commit  
- Reduce errores y aumenta la productividad real

---

Fin del laboratorio.
