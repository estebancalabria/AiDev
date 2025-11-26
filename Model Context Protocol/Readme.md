# Model Context Protocol (MCP)

Model Context Protocol (MCP) es un estándar abierto diseñado para conectar herramientas, datos y servicios con modelos de inteligencia artificial de manera segura, consistente y extensible. MCP permite que los LLM interactúen con tu entorno (archivos, APIs, bases de datos, sistemas internos) mediante servidores llamados **MCP Servers**.

Su objetivo principal es proporcionar un protocolo unificado para que los modelos puedan acceder a contexto relevante en tiempo real sin depender de integraciones propietarias.

## 🚀 ¿Por qué usar MCP?

* **Integración estandarizada**: Conecta herramientas y servicios de forma consistente.
* **Mayor productividad**: Permite que el modelo acceda directamente al contexto necesario para ayudarte.
* **Extensible**: Podés crear tus propios MCP servers o usar los existentes (filesystem, PostgreSQL, web browsing, etc.).
* **Seguro**: Sin exponer más permisos de los necesarios.

## 🧩 ¿Qué es un MCP Server?

Un **MCP Server** es una herramienta que expone capacidades (read, write, list, query, etc.) a través del protocolo.
Los entornos compatibles (como GitHub Copilot Chat o Cursor) pueden conectarse automáticamente a los MCP Servers habilitados en tu espacio de trabajo.

Ejemplos populares:

* **Filesystem MCP Server** → permite al modelo navegar y manipular archivos.
* **Git MCP Server**
* **OpenAPI MCP Server**
* **PostgreSQL MCP Server**

## 🛠 Cómo usar MCP en GitHub Copilot Chat (VS Code)

GitHub Copilot Chat ya tiene soporte completo para MCP servers.
Podés instalarlos mediante la configuración `dev` o agregando un archivo `.copilot/mcp.json` o `devcontainer.json`.

Guía oficial:
[GitHub Copilot MCP Servers](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

## 🛠 Cómo usar MCP en Cursor

Cursor también soporta MCP de forma nativa.
Podés agregar MCP Servers desde el archivo `cursor.json`.

Documentación oficial de Cursor (ES):
[Cursor MCP](https://cursor.com/es/docs/context/mcp)

## 📚 Documentación oficial de MCP

Para profundizar en el protocolo, ejemplos, diseño, APIs y cómo crear tus propios servidores, consultá la web oficial:
[Model Context Protocol](https://modelcontextprotocol.io/)

## 📦 Ejemplo de configuración rápida en VS Code (GitHub Copilot)

Archivo `.copilot/mcp.json`:

{
"mcpServers": {
"filesystem": {
"command": "npx",
"args": ["@modelcontextprotocol/server-filesystem"],
"permissions": {
"allow": ["read", "write", "list"]
}
}
}
}

## 📦 Ejemplo de configuración rápida en Cursor

Archivo `.cursor/mcp.json`:

{
"mcpServers": {
"filesystem": {
"command": "npx",
"args": ["@modelcontextprotocol/server-filesystem"]
}
}
}

## 🎯 Conclusión

MCP es el nuevo estándar que permite que las IA puedan trabajar de forma real con tu entorno. Tanto GitHub Copilot como Cursor ya lo soportan, y podés comenzar a usar servidores existentes o crear los tuyos propios de manera muy simple.
