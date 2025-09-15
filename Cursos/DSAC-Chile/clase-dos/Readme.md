# Clase Dos - 15 de Septiembre del 2025

## Herramientas para la Generacion de Interfaces

### Vercel Chat (v0 chat)

* https://v0.app/
    
Caractersiticas
* Especializado en frontend React y NextJS
* Tiene deploy directamente en verel
* Ideal para generacion de componentes de React

Prompt
```
Construime un component que sea una calculadora cientifica
```

Putaje : 10/10

### OpenUIFly

Similar a la anterior pero es opensource, puedo modificar los fuentes y adptarla, funciona con la api key de groq y la puedo adaptar a mi proyecto puntual

* https://openui.fly.dev/     
* https://github.com/wandb/openui

---

# MCP : Model Context Procol

Es procolo para agregarle un "plugin" a un llm para que pueda interactuar con herramientas externas (ej: filesystem, base de datos, interactue con GIT). Este protocolo fue propuesto por la gente de Anthropic (los creadores de Claude) y rapidamente esta siendo adoptado como protocolo entandar por el resto de los proveedores/

* https://modelcontextprotocol.io/
     
Para usarlo lo puedo usar desde:
* Claude Dektop : https://claude.ai/download
* Visual Studo code

Requisitos:
* Tener Instalado nodejs : https://nodejs.org/en

Pasos a Seguir
1. Abrir el Visual Studio Code
2. Elegir una carpeta para las pruebas
3. Instalar la extension Github Copilot
4. Crear carpeta .vscode
5. Crear archivo mcp.json dentro de la carpeta .vscode (esto es para configurar mcp a nivel proyecto)
```json
{
    "servers": {
        "filesystem": {
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-filesystem",
                "C:\\path-proyecto-vscoe\"
            ]
        }
    }
}
```
(Esto sale de la web de github del mcp : https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)
6. En el archivo mcp.json arriba del mcp tiene que aparecer un botoncito para poner "start" y ahi iniciamos el servidor mcp
7. Pedirle que genere un archivo utilizando el servicor mcp
```
Podes generarme un json con los paises de latam y sus capitales ordenados alfabeticaente utilizando el mcp de filesystem?
```
8. Genera el arcivho paises-latam.json

9. Ahora vamos a usar el mcp de pupeteer : https://github.com/modelcontextprotocol/servers-archived/tree/main/src/puppeteer
    
10. El mcp.json ahora queda:

```json
    "servers": {
        ...
        "puppeteer": {
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-puppeteer"
            ]
        }
    }
```

11. 
    
