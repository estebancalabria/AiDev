# Laboratorio: Cursor Rules (Cursor IDE) — versión corregida

## Resumen
En este laboratorio vas a:
- Crear reglas de proyecto para Cursor usando el formato MDC (.mdc).
- Probar el comportamiento “ANTES” y “DESPUÉS” de una generación de código.
- Ver cómo se crean, habilitan y verifican las reglas desde Cursor (New Cursor Rule / Agent Settings).
- Confirmar que los archivos de reglas están en `.cursor/rules/` y que emplean la extensión `.mdc`.
- Entender la restricción de nombres (minúsculas y guiones, sin puntos).

---

## 1. Crear el proyecto / abrir en Cursor
1. Crear una carpeta nueva o clonar un repo vacío.  
2. Abrir la carpeta en Cursor (el editor).

---

## 2. Prueba “ANTES” (sin reglas)
1. Crear un archivo `test.js` en la raíz del proyecto.  
2. Colocar el cursor en un lugar vacío dentro del archivo.  
3. Presionar **Ctrl+K** (o el comando equivalente “Edit / Generate” en Cursor).  
4. En la caja que aparece pedir exactamente:
   Generá una función que ordene un array de números  
5. Guardar el resultado como **ANTES**.  
   - Observá: normalmente será una implementación básica (p. ej. usar `arr.sort()`), sin validaciones, sin prefijos en el nombre, y posiblemente mutando el array original.

---

## 3. Crear reglas de Cursor (MDC)
> Nota: las reglas pueden crearse desde el comando **New Cursor Rule** o desde **Cursor Settings > Rules / Project Rules**; esto genera automáticamente un archivo en `.cursor/rules/`.  
> Los archivos de regla usan la extensión `.mdc` y los nombres deben estar en minúsculas y con guiones (sin puntos en el nombre).  

1. Crear la carpeta (si no existe):

```
.cursor/rules
```

2. Crear un nuevo rule file con un nombre válido (minúsculas y guiones — por ejemplo `functions.rule.mdc` NO usar puntos adicionales en el nombre; preferir `functions-rule.mdc`):

```
.cursor/rules/functions-rule.mdc
```

3. Pegar el siguiente contenido (MDC con frontmatter mínimo):


```
---
alwaysApply: true
---
# Reglas para funciones en este repositorio

Cursor debe generar siempre funciones con las siguientes características:

- bien nombradas, comienzan con el prefijo `fn`
- con validaciones de entrada
- sin modificar arrays originales
- con explicación en comentarios arriba de la función
```

4. Guardar el archivo. (Alternativa: usar el comando **New Cursor Rule** en la paleta de comandos para crear el archivo automáticamente).

---

## 4) Habilitar / verificar la regla en la UI de Cursor
1. Abrir **Cursor Settings** → **Rules** (o abrir el Chat/Agent settings donde aparece la sección de Rules / Project Rules).  
2. Verificar que la nueva regla `functions-rule.mdc` aparece en la lista de reglas del proyecto.  
3. Confirmar que la regla esté **Enabled**.  
4. Si usaste el comando New Cursor Rule, Cursor debería haber creado el archivo en `.cursor/rules/` automáticamente.

---

## 5) Prueba “DESPUÉS” (con reglas activas)
1. Volver a `test.js`.  
2. Eliminar la generación anterior (o dejarla para comparar).  
3. Presionar **Ctrl+K** de nuevo.  
4. En la caja de generación pedir exactamente el mismo prompt:
   Generá una función que ordene un array de números  
5. Guardar el resultado como **DESPUÉS**.

**Qué debe cambiar en DESPUÉS**:
- El nombre de la función debe comenzar con el prefijo `fn` (p. ej. `fnOrdenarNumeros` o `fn_ordenarNumeros` según convención local).  
- Debe incluir validación de entrada (ej.: comprobar que es un array).  
- No debe mutar el array original (usar copia: spread `[...]` u otro método).  
- Debe incluir un comentario explicativo encima de la función.

---

## 6) Verificar aplicación de la regla (logs / UI)
1. Abrir el Chat/Agent panel donde ejecutaste la generación (o la sección de Rules).  
2. Revisar la actividad / request log para confirmar que la regla fue incluida en el contexto del agente (Cursor suele mostrar qué reglas incluyó para cada request).  
3. Si la UI indica que la regla se aplicó, y el código generado respeta las restricciones, la regla funcionó correctamente.

---

## Troubleshooting / notas importantes
- **Extensión de archivo**: las reglas deben usar `.mdc` (MDC = Multi-Document Context / formato de reglas). Evitar `.md` si querés que Cursor las trate específicamente como reglas.  
- **Nombres de archivo**: usar sólo minúsculas y guiones en el nombre; no incluir puntos extra ni mayúsculas. Ejemplo correcto: `functions-rule.mdc`. Ejemplo incorrecto: `functions.rule.mdc` (evitar puntos dentro del nombre).  
- **Crear desde la UI**: la forma más segura es usar **New Cursor Rule** (Ctrl+Shift+P → New Cursor Rule) o **Cursor Settings > Rules**; eso genera el archivo con el formato correcto.  
- **Globs / scope**: en el frontmatter podés definir `globs` para que la regla sólo se incluya en ciertos archivos o carpetas (p. ej. `**/*.py` o `src/backend/**`).  
- **Tamaño y claridad**: mantener las reglas concisas; reglas muy largas o contradictorias pueden producir comportamientos inesperados.  
- **Método de invocación**: para asegurar que las reglas se apliquen, usar comandos generativos de Cursor (Ctrl+K / Edit & Generate, o la caja de chat del agente). El autocompletado pasivo puede no incluir reglas automáticamente en todos los escenarios.  
- **Ver fuentes / docs**: la documentación oficial de Cursor sobre Rules y el formato MDC confirma estos pasos y restricciones.

---

## Aclaración final
Cursor Rules están diseñadas para ser persistentes y aplicarse automáticamente al agente. Si algo no funciona:
- revisá que el archivo `.mdc` existe en `.cursor/rules/`,  
- revisá que su nombre sigue las reglas de nombrado (minúsculas y guiones),  
- abrí Cursor Settings → Rules para confirmar que la regla está Enabled,  
- y usá los comandos de generación (Ctrl+K) o el chat del agente para ver la regla en acción.

Fin del laboratorio.
