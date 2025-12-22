# Clase Tres - 22 de Diciembre 2025

# Repaso

* Herramienta
  * LLMs
    * Groq (Para el uso de API)
    * Claude y sus artefactos
    * Qwen
  * Vo
    * Herramienta de Vercel con IA
    * Ideal para prototipar componentes de UI
  * WebSim
    * Desarrollos Interactivos
    * Conocia librerias JS como ThresJS
* Codding Assistants
  * Github Copilot
    * Chat, Chat Inline, Comentarios
* Model Context Protocol (MCP)
    * https://modelcontextprotocol.io/
    * Herramientas para usarlo
      * Claude Desktop
      * Visual Studio Code / Github Copilot
      * Anything LLM
      * Cursor <<< **Lo vamos a ver la clase de hoy**
    * Ejemplos de MCP
      * fylesystem
      * pupeteer

# Herramienta

- ## Replit

* https://replit.com/
* Herramienta para scaffolding de proyectos com IA
* Tiene su propio entorno para ejecutar aplicaciones
* Permite un deployment directo en la nube
* Cada vez mayor integracion con servicios adicionales como Supabase
* Pasos a seguir
  * Crear la especificacion del MVP (Minimun Viable Product) con ChatGPT
      * Ejemplo : "Me pones el prompt para generar un MVP (minimum viable product) con Replit para un "un sistema de manejo de un inventario puede ser" que funcione web y sea responsive...."
  * Poner la especificacion en Replit
  * Seguir editando el proyecto generado (Hasta que me quede sin creditos)
      * Ejemplo : "Podes Agregar un login que se ingrese con admin/admin. Una pantalla de menu con la opciones donde hoy la unica opcion es la actual de agregar un proudcto en una barra izquierda lateral se mustran todas las opciones una vez que estamos logueados"
  * Bajar el proyecto y seguirlo editando localmeten

> Puntaje : 8 / 10 (Quitaron integraciones que tenian antes)

# Bases de Datos Vectoriales

* https://www.instagram.com/p/C-qz5rBxByW/?img_index=1
* RAG (Retrival Augmented Generation)
* Son bases de datos que almacenan Embedings.
* Los textos largos se guardan como vectores numericos (embedings) generados con IA
* Puedo hacer busqeudas semanticas (no por texto)
* Ejemplos de Bases de Datos de Embedings
   * TurboPuffer
   * ChromaDB
   * QDrant (.net)
   * PineCode
   * Postgres (Tiene buen soporte tambien para embedings)

# IDES Potenciados con IA

- ## Ides potenciados con IA

* Muchas veces las extensiones como Github Copilot se "quedan cortas" al trabajar con grades bases de codigo (codebase)
* Limitaciones Coddign Assistant : Trabajan con el archivo abierto y los archivos recientes
* Hay varias opciones:
   * Cursor (https://cursor.com/)
   * Windsurf (https://windsurf.com/)
   * Continue.dev (https://www.continue.dev/)
   * Antigravity (https://antigravity.google/) <<< La que todos hablan, ide que saco google
* En general tienen features parecidos a los codding assistants (tienen el codding assistant integrado)
* Tienen una mejor compresion de todo tu proyecto
* Permiten **Vibe Coding** : Desarrollo con Lenguaje natural. 
 
- ## Cursor

* Ver Funcionamiento : https://www.instagram.com/p/DPWOQ-HjoEr/?img_index=1
* Tiene Chat (Ctrl+L) y Chat Inline (Ctrl+K)
* Trabajan con proyectos con "Large Codebase"
   * Ejemplo : Probar abrir un proyecto grande y pedir que lo explique

### MCP En cursor

* Pasos
  * Crear carpeta .cursor
  * Crear el archivo mcp.json
  * Sacar el json del servidor que quiero instalar por ejemplo de :
    * https://modelcontextprotocol.io/examples
    * https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem
    * https://github.com/modelcontextprotocol/servers-archived/tree/main/src/puppeteer
  * Ejemplo
    
```json
{
    "mcpServers": {
      "filesystem": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-filesystem",
          "C:\\Cursos\\AiDev\\Cursos\\83937-EducacionIT-LuMie-Ma\\clase-tres\\workspace-cursor"
        ]
      }
    }
  }
```

* Cuando dice "New MCP server detected: filesystem" darle a "Enable"
* Use el siguietne prompt
  
```
Crearme el archivo paises.json con los paises de latam utilizando el mcp de filesystem en el directorio del proyecto
```

* Otro ejemplo con putpeteer. El mcp.json
```
{
    "mcpServers": {
      "filesystem": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-filesystem",
          "C:\\Cursos\\AiDev\\Cursos\\83937-EducacionIT-LuMie-Ma\\clase-tres\\workspace-cursor"
        ]
      },
      "puppeteer": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
      }
    }
  }
```

* Despues uso el prompt : "Usa el mcp de pupeteer para buscarme en amazon placas de video."
  

### Cursor Rules

* Reglas Personalizadas para definir como debe programar un equipo en un proyecto

# Patrone de Prompting

- ## High Level Goal

* Sirve tanto para Cursor como para un Codding Assistant como Github Copilot
* Consiste en poner al prinpcio del archivo un comentario del objetivo global del archivo
* Ejemplo. Al principio del archivo escribo:
```
/*
 Crear una api no nodejs y express que permita crear, leer, actualizar y eliminar usuarios
 La api debe ser capaz de manejar las siguientes rutas:
 - GET /users: Obtener todos los usuarios
 - GET /users/:id: Obtener un usuario específico
 - POST /users: Crear un nuevo usuario
 - PUT /users/:id: Actualizar un usuario específico
 - DELETE /users/:id: Eliminar un usuario específico
 La api debe ser capaz de manejar las siguientes operaciones:
 - Crear un nuevo usuario
 - Obtener un usuario específico
 - Actualizar un usuario específico
 - Eliminar un usuario específico
*/
```
* Despues el "ghost code" me va completando el resto del codigo que voy aceptando con [TAB]


