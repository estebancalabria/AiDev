# Laboratorio - Usando MCP con Github Copilo

## Requerimientos
* Vs Code
* Github Copilot Extension
* NodeJS

## Pasos

* Crear una  carpeta
* Abrir el VS Code en la carpeta
* Abrir paleta de comandos de VSCode (Ctrl+Shift+P)
* Crear la carpeta .vscode
* Crear el archivo mcp.json dentro de la carpeta vscode
```json
{
  "servers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Temp\"
      ]
    }
  }
}
```
* Cambiar "C:\\Temp\ por el directorio del workspace
* Salvar
* Arriba de filesystem poner start
* En el chat en modo agente poner
```
Creame un achivo paises.json con una lista de paises con el mcp server
```
