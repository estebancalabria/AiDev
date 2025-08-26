# Clase Tres - 26 de Agosto de 2025

## Herramientas de Generacion de Interfaces y/o Scaffolding de proyecto

* Vercell Chat  : https://v0.app/
    
Me permite
* Generar Prototipos de UI/UX en React / NextJS
* Generacion de interfaces a partir de imagenes
* Generar el prototipo uno despues va y le completa las funcionalidades que falta
* Sirve para Scafolding de proyectos y Generaciones de componentes aislados
* Tiene deploy directo con Vercel
* Permite ir refinando la solucion iterativamente
* Muy piola para el arranque

> TIP: Me da mejores resultados generar un prompt primpero con ChatGPT

Workflow de trabajo : Generas aca el prototipo inicial, los descargas y lo seguis trabajando en tu maquina con un codding assistant como claude code, cursor, github copilot y asi...
Puntaje de la multitud : 10 / 10

## MCP : Model Context Protocol

Es una forma de agregarle a un modelo de lenguaje la positiblidad de interacturar con herramientas externas. Fue generado por la gente de Claude (Anthropic). **Sirve para darle brazos y piernas a la inteligencia artificial**
* https://modelcontextprotocol.io/
     
Se pueden utilizar desde varios lugares
* Claude Desktop (https://claude.ai/download)
* Visual Studio Code

Vamos a utilizar a modo de prueba los siguiens MCP
* Pupeteer (https://github.com/modelcontextprotocol/servers-archived/tree/main/src/puppeteer)
* FileSystem (https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)

Para usarlo en Vscode
1.Requisito previo tener Node JS instalado : https://nodejs.org/en
2. Instalar el Github Copilot
3. A nivel de proyecto: crea un archivo .vscode/mcp.json con la configuración del servidor.
```json
{
    "servers": {
        "puppeteer": {
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-puppeteer"
            ]
        },
        "filesystem": {
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-filesystem",
                "C:\\Cursos\\AiDev\\Cursos\\80893-Mar-Jue-Ma\\clase-tres\\workspace\\fileSystem",
            ]
        }
    }
}
```
4. Cada MCP esta configurado por un JSON
5. Instalamos los mcp de la pagina de arriba
