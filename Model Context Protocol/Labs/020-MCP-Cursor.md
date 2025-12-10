# Laboratorio - Usando MCP en Cursor

## Requerimientos
* Cursor
* NodeJS

## Pasos

* Crear una carpeta
* Abrir Cursor en la carpeta
* Crear la carpeta .cursor
* Crear el archivo mcp.json dentro de la carpeta .cursor

<code>
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Temp\\"
      ]
    }
  }
}
</code>

* Cambiar "C:\\Temp\\" por el directorio del workspace
* Salvar
* Abrir el panel de Chat
* Enviar:

<code>
Creame un archivo paises.json con una lista de paises usando el mcp server
</code>
