# Model Context Protocol

Es un protocolo que permite a los LLM interactuar con el mundo exterior extendiendo su capacidad solamente de generar texto. Web Oficial es : 
> https://modelcontextprotocol.io/overview
---     
Ejemplos de MCP:
* FileSystem : https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem
* Pupeteer : https://github.com/modelcontextprotocol/servers-archived/tree/main/src/puppeteer
* Mas servidores en : https://modelcontextprotocol.io/examples
---
Se puede usar en:
* Claude Desktop: https://claude.ai/download
* Visual Studio Code 
* Entre otros..
---
Para configurar MCP en Claude Dektop
* Instalo Claude Desktop
* Me Logueo 
* Voy a...(Menu Buger)..File..Settings...Developper
* Apreto el boton Edit Config
* Edito el json claude_desktop_config.json
* Le agrego el json del MCP que deseo sacado de su pagina de Github
* Reinicio Claude Desktop
* Abajo del Chat (Al lado del + ) en la parte de herramientas Tiene que decir si cargo bien el MCP
---
Para configurar MCP en VSCode
* Instalar extensiones (Github copilot Chat o ChatGPT code Companion)
* View...Chat... Abre el github Copilot Chat
* En la barra de arriba de busqueda 
   * Show and run Commands (Ctrl + Shift + P)
   * MCP : Open Workspace and folder configuration
   * Crear archivo mcp.json (para el proyecto local)
   * (Alternativamente puedo crear la carpeta .vscode y el archivo mcp.json adentro)

```mcp
{
    "servers": {
        "filesystem": {
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-filesystem",
                "C:\\Cursos\\AiDev\\Cursos\\82015-Lu-Mie-Ma\\clase-tres\\mcp"
            ]
        },
        "puppeteer": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
          }   
    }
}
```
   * Cambiar la ubicacion a la ubicacion del proyecto
