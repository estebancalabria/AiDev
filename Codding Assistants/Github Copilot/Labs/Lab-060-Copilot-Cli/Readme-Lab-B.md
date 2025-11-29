# Laboratorio: GitHub Copilot CLI (Bonus)

Objetivo: aprender a usar GitHub Copilot CLI para potenciar la terminal con IA: buscar, generar scripts y explicar comandos.

---

## 1. Instalación del Copilot CLI

1. Requerimientos: Node.js 18+, GitHub Copilot activo en tu cuenta.
2. Instalar desde npm:

<code>npm install -g @githubnext/github-copilot-cli</code>

3. Loguearse con tu cuenta GitHub:

<code>gh copilot login</code>

---

## 2. Buscar archivos usando IA (tipo `ripgrep`)

Supongamos que queremos encontrar archivos donde se use la función `validateEmail`:

<code>gh copilot find "validateEmail" --files</code>

- `gh copilot find` → busca de forma inteligente dentro del repo  
- `--files` → muestra archivos donde se encuentra el término  
- Es como un `grep` pero **potenciado con contexto de IA**: puede entender patrones, alias, imports, comentarios.

---

## 3. Generar scripts en segundos

Supongamos que necesitamos un **script bash** que recorra todos los archivos `.js` y haga backup:

<code>gh copilot generate "bash script to backup all .js files in the project to a zip called backup.zip"</code>

- El CLI generará automáticamente el script completo listo para copiar y ejecutar.  
- Podemos refinar el prompt: “agregá logging y manejo de errores”.

---

## 4. Explicar comandos shell

Si encontramos un comando que no entendemos:

<code>gh copilot explain "find src/ -name '*.js' -exec grep 'validateEmail' {} \;"</code>

- La IA nos devuelve una **explicación paso a paso** del comando:  
  - Qué hace `find`  
  - Qué hace `-exec`  
  - Qué busca `grep`  
- Ideal para aprendizaje rápido o revisión de scripts de otros.

---

## 5. Flujo recomendado para Pair Programming en CLI

1. Pedí al CLI un plan o script inicial (`gh copilot generate`)  
2. Revisá el código / script sugerido  
3. Pedí QA o optimización (`gh copilot explain` o refiná el prompt)  
4. Copiá, ejecutá y ajustá según sea necesario  
5. Guardá con commit y mensaje generado por IA si querés

---

## 6. Beneficios

- Ahorrás tiempo en búsquedas complejas (`grep` / `ripgrep`)  
- Generás scripts reutilizables en segundos  
- Entendés comandos de shell que no conocés  
- Se puede usar **integrado con Copilot en VS Code** o directamente desde terminal

---

Fin del laboratorio.
