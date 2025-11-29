Claro. Aquí tienes un **artefacto listo para copiar y pegar**: un laboratorio en texto plano (Markdown sin formato visual adicional), incluyendo el uso del **Cursor CLI** en **WSL (Ubuntu)**, considerando los pasos reales que ya ejecutaste.

---

# Laboratorio: Usar Cursor CLI en WSL2 (Ubuntu)

> **Objetivo**: Instalar y configurar `cursor-agent` en WSL2 (Ubuntu) y ejecutar tareas de desarrollo desde la terminal.

---

## Requisitos

- Windows 10/11 con WSL2 habilitado
- Ubuntu 24.04 instalado vía `wsl --install`
- Acceso a internet
- Cuenta en [cursor.com](https://cursor.com) (Free o Pro)

---

## Paso 1: Actualizar el sistema

```bash
sudo apt update && sudo apt upgrade -y
```

---

## Paso 2: Instalar Cursor CLI

```bash
curl https://cursor.com/install -fsS | bash
```

> ✅ La instalación coloca el binario en `~/.local/bin/cursor-agent`.

---

## Paso 3: Añadir al PATH (¡imprescindible en WSL!)

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Verifica:

```bash
which cursor-agent
# Debe devolver: /home/<tu-usuario>/.local/bin/cursor-agent
```

---

## Paso 4: Autenticar con tu cuenta de Cursor

```bash
cursor-agent "hello"
```

- Se abrirá un enlace en tu navegador de Windows.
- Inicia sesión con tu cuenta de Cursor.
- Vuelve a la terminal: ya estás autenticado.

> ⚠️ La sesión se almacena en `~/.cursor/`. No necesitas loguearte de nuevo a menos que la elimines.

---

## Paso 5: Probar modo interactivo

Crea un archivo de ejemplo:

```bash
cat > greet.js <<EOF
function greet(name) {
  return "Hi " + name;
}
console.log(greet("world"));
EOF
```

Ejecuta una mejora con el agente:

```bash
cursor-agent "Refactor this to use ES6 template literals and add JSDoc"
```

El agente:
- Muestra los cambios propuestos,
- Te pregunta si los aplicas,
- Si aceptas, los escribe en el archivo.

---

## Paso 6: Probar modo no interactivo (para automatización)

Genera un patch sin intervención:

```bash
cursor-agent -p "Add error handling for null input" --output-format patch > error-handling.patch
```

Aplica el cambio:

```bash
git apply error-handling.patch
```

> Útil para CI/CD, pre-commit hooks o scripts de refactorización.

---

## Paso 7: Listar y reanudar sesiones

Lista tus conversaciones recientes:

```bash
cursor-agent ls
```

Reanuda la última:

```bash
cursor-agent resume
```

---

## Notas clave

- **Funciona en WSL2** si se agrega `~/.local/bin` al `PATH`.
- **No requiere Cursor Pro** para probar, pero Pro elimina límites de uso.
- **No usa GitHub Copilot**: solo modelos de OpenAI, Anthropic, Gemini, etc.
- **No disponible en Windows nativo**: solo en entornos Linux/macOS (incluyendo WSL2 con Ubuntu).

---

## Solución de problemas comunes

| Problema | Solución |
|--------|--------|
| `cursor-agent: command not found` | Ejecuta: `echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc` |
| Error de autenticación | Borra `~/.cursor` y vuelve a ejecutar `cursor-agent "test"` |
| Límite de uso alcanzado | Espera 24h o actualiza a Cursor Pro |

---

> ✅ **Listo**: ahora tienes un entorno funcional de Cursor CLI en WSL2 para automatizar tareas de código sin abrir el editor.