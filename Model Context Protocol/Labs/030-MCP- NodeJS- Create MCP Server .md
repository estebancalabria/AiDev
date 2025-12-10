# Laboratorio - Creando un Servidor MCP de Prueba en NodeJS

## Requerimientos

* NodeJS
* Visual Studio Code

## Pasos

* Crear una carpeta para el proyecto

```bash
md demo-server
```

* Ir a la carpet del proyecto

```bash
cd demo-server
```


* Inicializar el proyecto
```bash
npm init -y
```

* Instalar las dependencias

```bash
npm install @modelcontextprotocol/sdk
```

* Editar el proyecto

```bash
code .
```

* Generar el archivo server.js

```javascript
#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create the server
const server = new McpServer({
  name: "demo-mcp-server",
  version: "1.0.0",
});

// Tool: Greet in Spanish
server.tool(
  "hello",
  "Returns a greeting in Spanish",
  {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Person's name"
      }
    },
    required: ["name"]
  },
  async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: `¡Hola ${name}! Te saluda tu servidor MCP`
        }
      ]
    };
  }
);

const transport = new StdioServerTransport();
server.connect(transport);
```

* Modificar el package.json

```json
{
  "name": "demo-server",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node mcp-server.js",
    "inspector": "npx @modelcontextprotocol/inspector node ./mcp-server.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "latest"
  }
}

* Crear un proyecto nuevo y configurar el .vscode/mcp.json

```json

{
  "servers": {
    "mcp-ejemplo": {
      "command": "node",
      "args": ["C:\\Cursos\\AiDev\\Model Context Protocol\\Samples\\demo-server\\server.js"],
      "cwd": "C:\\Cursos\\AiDev\\Model Context Protocol\\Samples\\demo-server"
    }
  }
}

```
```
