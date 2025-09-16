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
* https://code.visualstudio.com/mcp
* https://nearform.com/digital-community/supercharging-playwright-testing/ (Gracias Robinson!)
     
Para usarlo lo puedo usar desde:
* Claude Dektop : https://claude.ai/download
* Visual Studo code

Requisitos:
* Tener Instalado nodejs : https://nodejs.org/en

## MCP en VSCode

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

11. En el chat utilice el siguiente prompt

```
Podes buscarme en Amazon monitores con el mcp de pupeteer y luego creame un archivo don el mcp de filesystem monitores.json con el nombre y el precio de tres monitores
```

---
    
## IA para requerimientos de Softwar

### Herramientas para transcribir Reuniones Online y Grabaciones

Cuando uno tiene una entrevista con un cliente donde se hablan de los requerimentos ya sea online o presencial grabada. Esta bueno usar la IA para convertir esa reunion en un documento con los requerimientos funcionale de la application

* Herrarmientas para Reuniones Online : https://www.instagram.com/p/DBzb-kHxqae/?img_index=1
* Tactic : https://tactiq.io/es

### Recopilacion de Informacion

* Transcripciones de las reuniones
* Documentacion Funcional
* Documentos de analisis y disenio

## Noteboolm

> https://notebooklm.google.com/?pli=1

Con la informacion del recopilado genero un notebool que sera como un Gemini pero con el contexto precargad de toda la documentacion. Libera un poco al analista funiconal de tener que andar respondiendo todas las dudas y se puede usar como chartbot

Features:
* Carga documentos, videos (que pueden estar en youtube)
* Generar un podcast entretenido donde dos personas explican todos los doscumentos
* Genera un Video con una explicacion
* Generar mapas de mente
* LA respuesta del llm la podes guardar como nota que a su vez podes luego convertir en fuente.

Puntaje : 10 / 10 
