# Clase Cinco - 14 de Abril 2026

# Repaso

* Primera Fases del Proyecto
  * Analisis
      * Transcribir las reuniones (mails y demas) para que sea parte de la documentacion de Requerimientos
          * Taqtic
      * Agente de los requerimientos
          * RAG (Retrival Augmented Generation)
          * Grounding
          * NotebookLM como herramienta RELVATE
  * System DesignUn 
      * Un lenguaje para generar diagramas con un LLM
          * Mermaid
      * Para generar diagramamas
          * DiagramGPT

# Novedades

* Importancia de la especificacion a la hora de hablar de desarrollo con IA
    * https://github.com/github/spec-kit

# Agentes de Codificacion vs Asistentes de Codificacion

* Agentes de Codificacion
    * Ej : Claude Code
    * Generalmente se ejecutan desde el CLI.
    * Contemplan la planificacion antes de hacer cambios
    * Para hacer cambios masivos en bases de codigo
    * Casos de uso
        * Actualizar proyecto de java 5 a java 8
        * Migrar un proyecto de php a java con springboot
        * Verificar vulnerabilidades de seguridad en todo mi codigo fuente
    * Se vuelve CRITICO la revision humana y trabajar con Github
    * Requieren especial atencion en su CONFIGURACION para educarlos como trabajar (skills)

* Asistentes de Codificacion
    * Ej: Github Copilot, Cursor
    * Se integran en la IDE
    * Pair programming
    * Programa conmigo y me ayuda a hacer la tarea
    * Para tareas acotadas mientras uso el codigo
    * Agiliza la codigicacion manual bastabte (Ej: 5x)

## Asistentes de Codificacion

* Existen dos tipos de Asistentes de Codificacion
    * Extensiones de la IDE : Github Copilot
    * IDES Especializadas : Cursor, Windsurf, Antigravity

* Para esta practica Abrir el VSCode y tener instalada la extension del Github Copilot
  * https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat

### Buenas Practicas en Asistentes de Codigicacion

* Se vuelve relevante reveer practicas como las de CLEAN CODE para que la IA trabaje mejor
* Utilizar comentarios para guiar la IA

#### High Level Goal

* Patrones como High Level Goal me permiten controlar el comportamiento de la IA a nivel archivo

```
/*
API.js - Backend API for the application
* Esta API es un CRUD de USUARIOS.
* Utiliza CORS para permitir solicitudes desde el frontend.
* Los Endpoints disponibles son:
    * GET /api/users - Obtener todos los usuarios
    * POST /api/users - Crear un nuevo usuario
    * GET /api/users/:id - Obtener un usuario por ID
    * PUT /api/users/:id - Actualizar un usuario por ID
    * DELETE /api/users/:id - Eliminar un usuario por ID
* Utiliziza nodejs y express.
* Cada endpoint devuelve JSON y esta documentado con comentarios.
* Tiene una lista de usuarios en memoria para pruebas
* De casa usuario se quiere (id, nombre, apellido)
* Los datos de entrada deben ser validados para asegurar que se proporcionen los campos necesarios.
*/
```

* A partir del High Level Goal Me hizo

```javascript
/*
API.js - Backend API for the application
* Esta API es un CRUD de USUARIOS.
* Utiliza CORS para permitir solicitudes desde el frontend.
* Los Endpoints disponibles son:
    * GET /api/users - Obtener todos los usuarios
    * POST /api/users - Crear un nuevo usuario
    * GET /api/users/:id - Obtener un usuario por ID
    * PUT /api/users/:id - Actualizar un usuario por ID
    * DELETE /api/users/:id - Eliminar un usuario por ID
* Utiliziza nodejs y express.
* Cada endpoint devuelve JSON y esta documentado con comentarios.
* Tiene una lista de usuarios en memoria para pruebas
* De casa usuario se quiere (id, nombre, apellido)
* Los datos de entrada deben ser validados para asegurar que se proporcionen los campos necesarios.
*/

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Lista de usuarios en memoria
let users = [];
let nextId = 1; // Variable para asignar IDs únicos

// Endpoint para obtener todos los usuarios
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Endpoint para crear un nuevo usuario
app.post('/api/users', (req, res) => {
    const { nombre, apellido } = req.body;
    // Validar que se proporcionen los campos necesarios
    if (!nombre || !apellido) {
        return res.status(400).json({ error: 'Nombre y apellido son requeridos' });
    }
    const newUser = { id: nextId++, nombre, apellido };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Endpoint para obtener un usuario por ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
});

// Endpoint para actualizar un usuario por ID
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { nombre, apellido } = req.body;
    // Validar que se proporcionen los campos necesarios
    if (!nombre || !apellido) {
        return res.status(400).json({ error: 'Nombre y apellido son requeridos' });
    }
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    users[userIndex] = { id: userId, nombre, apellido };
    res.json(users[userIndex]);
});

// Endpoint para eliminar un usuario por ID
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});


```

#### Educar al Aistente para que programe como a mi me guste

* Con ctrl+i le digo que me genere una clase usuario en la carpeta backend

```
class Usuario {
    constructor(id, nombre, apellido) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }
}

module.exports = Usuario;
```

```
---
applyTo: 'backend/models/**/*.js'
description: "Usar cuando se pida crear una clase de modelo (ej: Usuario, entidad, modelo) o cuando el usuario mencione getters, setters, encapsulamiento o POO."
---

# Instrucciones para generar código

* El código generado debe cumplir con las buenas prácticas de la POO
  * Los atributos de una clase deben ser privados
  * Los atributos deben tener getters y setters
  * Es obligatorio que tengan getters y setters para cada atributo, incluso si no se usan actualmente
  * Los setters y el constructor deben asegurar la consistencia del objeto y validar los datos
  * El código debe ser modular y reutilizable
  * Se pretende tener un constructor vacío adicional para compatibilidad con ORMs

```

> [!NOTE]
> Le puedo pedir a Copilot que me genere el archivo de instrucciones

```
class Usuario {
    #id;
    #nombre;
    #apellido;

    constructor(id = null, nombre = '', apellido = '') {
        this.#id = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        if (typeof value !== 'number' && value !== null) {
            throw new Error('El id debe ser un número');
        }
        this.#id = value;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('El nombre es requerido y debe ser texto');
        }
        this.#nombre = value.trim();
    }

    get apellido() {
        return this.#apellido;
    }

    set apellido(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('El apellido es requerido y debe ser texto');
        }
        this.#apellido = value.trim();
    }
}

module.exports = Usuario;
```

> [!NOTE]
> Cual es la diferencia entre un LLM y un agente?

* Agente Codificacion = (Uso LLM) + (Codigo fuente de Contexto) + (Uso de Herramientas /TOOLS)

* Herramientas
  * Capacida de leer archivos del proyecto
  * Ejecutar comandos en el CLI
  * Hacer busqeudas en internet

### Model Context Protocol

* Es protocolo publicado por anthropic que permite registar tools dinameicamente en un Agente como el Github Copilot que normalmente no trae
   * https://modelcontextprotocol.io/

* Para usar un MCP (tool) solo en el proyecto (no instalarlo para todo vscode)
* Crear la carpeta .vscode
* Crear adentro el archivo mcp.json

```json
{
  "servers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Cursos\\AiDev\\Cursos\\84807-Ma-Jue-No\\clase-cinco\\vscode\\backend\\models"
      ]
    }
  }
}
```

* Ahora le pongo este prompt al agente

```
Utiliza el mcp de filesystem para crear un archivo en models que sea usuario.json que tenga usuarios de ejempo para prueba con id, nombre, apllido
```

 * Cuando use ahora mi asistente puedo pedir que utilize mi tool
