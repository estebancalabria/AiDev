# 🧪 Laboratorio: Usar MCP en Claude Desktop

## 🎯 Enunciado

En este laboratorio aprenderás a configurar Claude Desktop para utilizar el protocolo **MCP (Model Context Protocol)**, permitiendo que el modelo interactúe con tu equipo local, por ejemplo, leyendo archivos mediante el servidor `filesystem`.

## 📋 Resumen ejecutivo de pasos

1. Descargar e instalar Claude Desktop.
2. Acceder a la configuración de Claude Desktop.
3. Editar el archivo `claude_desktop_config.json`.
4. Agregar la configuración para el servidor MCP.
5. Descargar el servidor `filesystem` desde el repositorio oficial.
6. Reiniciar Claude Desktop.
7. Verificar que el MCP esté habilitado.

---

# 🛠️ Desarrollo detallado paso a paso

## 1. Instalar Claude Desktop

- Descargá e instalá la aplicación oficial de Claude Desktop desde:
  ```
  https://claude.ai/download
  ```
- Está disponible para **macOS** y **Windows**.
- Esto permitirá tener una versión local de Claude capaz de conectarse a servidores MCP.

## 2. Abrir la configuración de Claude Desktop

- Abrí Claude Desktop.
- Accedé al menú `File > Settings` o presioná `Ctrl + ,`.
- Se abrirá el diálogo de configuración.

## 3. Editar la configuración (`Edit Config`)

- Dentro de `Settings`, andá a la sección `Developer`.
- Hacé clic en `Edit Config`.
- Esto abrirá una carpeta en tu sistema donde se encuentra el archivo de configuración `claude_desktop_config.json`.

## 4. Modificar `claude_desktop_config.json`

- Editá el archivo `claude_desktop_config.json` agregando la siguiente sección dentro del objeto `mcpServers`:

```json
{
    "mcpServers": {
        "filesystem": {
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-filesystem",
                "C:\\Temp"
            ]
        }
    }
}
```

🔵 Asegurate de ajustar la ruta (`C:\\Temp`) si querés que Claude acceda a otra carpeta local.

## 5. Revisar la documentacion oficial

- Visitá el sitio oficial de MCP:
  ```
  https://modelcontextprotocol.io/
  ```
- Y su repositorio oficial en GitHub:
  ```
  https://github.com/modelcontextprotocol/
  ```
- El servidor `filesystem` que vamos a usar está disponible en:
  ```
  https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem
  ```
- No hace falta instalarlo manualmente si usás `npx`, pero podés explorar el código si querés entender más.

## 6. Reiniciar Claude Desktop

- Cerrá Claude Desktop **matando el proceso** desde el **Task Manager** (Windows) o **Force Quit** (Mac).
- Volvé a abrir la aplicación.
- ⚡ La carga del MCP puede tardar unos segundos en aparecer.

## 7. Verificar que el MCP esté activo

- Al iniciar Claude Desktop, deberías ver una nueva barra o botones que indican que los MCP están activos.
- Claude ahora podrá interactuar con tu sistema a través del servidor `filesystem`.

---

# ✅ ¡Listo!

Ahora Claude puede leer archivos locales mediante el servidor MCP que configuraste.  
Podés seguir ampliando tus capacidades agregando más servidores MCP desde los ejemplos oficiales.

