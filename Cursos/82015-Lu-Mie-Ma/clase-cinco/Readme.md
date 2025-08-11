# Clase 5 - 11 - Ago - 2025

## Disenio de Interfaces Graficas

Nueva herramienta de IA de google para desarrollo de Interfaces Graficas con IA:

> https://stitch.withgoogle.com/

Hicimos un disenio de restaurnte de delivery

## Scafolding de Proyectos

En la linea de Replit...    
Lovable
> [https://lovable.dev/](https://lovable.dev/invite/9cffd1d2-14cc-4730-90e6-f2dda96c629f)

Features:
* Genera proyectos en REACT
* Permite especificaar las librerias y el estilo de progrmacion a utilizar en el proyecto
* Sincronizacion con Gihub (te crea un repo para cada proyecto)
  

## Codding Assistants

Codding Assistants para elegir:
* Github Copilot : Ahora es gratuito. Es la que mejor funcionan los MCP
* Tabnine
* Cody
* Continue : Permite vincular el codding assistant con un LLM Local

### Github Copilot : Generacion de Codigo

Casos de Generacion de Codigo
* Generacion de Codigo Pasiva
```javascript

// Caso 1 : Generacion de codigo pasiva
//          Solo escribo el nombre de la funcion y el copilot completa lo que sigue
function titleCase(str){
  return str.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}
```
* Generacion de Codigo Basada en Comentario
```javascript
// Caso 2 : Generacion de codigo a partir de comentarios
// Quiero una funcion que convierta una fecha de formato yyyy-MM-dd
// a formato dd-MM-yyyy
function convertDateFormat(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
}
```
* Generacion de codigo con el chat Inine (ctrl+I)
```javascript

//Caso 3 : Utilizacion del chat Inline (ctrl+I)
// Funcion que calcula el desvio estandar de un array de numeros
function calcularDesvioEstandar(arr) {
    const n = arr.length;
    if (n === 0) return 0;
    const media = arr.reduce((a, b) => a + b, 0) / n;
    const sumaCuadrados = arr.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);
    return Math.sqrt(sumaCuadrados / n);
}
```
* Generacion de codigo en el chat de Copilot (ctrl+shift+I)
```javascript


//Caso 4 : Utilizacion del github copilot chat (ctrl+shift+i)
// Función que convierte todas las claves de un objeto JSON a minúsculas
function convertirClavesAMinuscula(obj) {
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
        return obj;
    }
    
    const resultado = {};
    
    for (const clave in obj) {
        if (obj.hasOwnProperty(clave)) {
            const claveMinuscula = clave.toLowerCase();
            const valor = obj[clave];
            
            // Recursivamente convertir objetos anidados
            if (typeof valor === 'object' && valor !== null && !Array.isArray(valor)) {
                resultado[claveMinuscula] = convertirClavesAMinuscula(valor);
            } else if (Array.isArray(valor)) {
                // Si es un array, procesar cada elemento
                resultado[claveMinuscula] = valor.map(item => 
                    typeof item === 'object' && item !== null && !Array.isArray(item) 
                        ? convertirClavesAMinuscula(item) 
                        : item
                );
            } else {
                resultado[claveMinuscula] = valor;
            }
        }
    }
    
    return resultado;
}

// Ejemplo de uso:
/*
const objetoOriginal = {
    "NOMBRE": "Juan",
    "EDAD": 25,
    "DIRECCION": {
        "CALLE": "Av. Corrientes",
        "NUMERO": 123,
        "CIUDAD": "Buenos Aires"
    },
    "HOBBIES": [
        { "TIPO": "Deportes", "NOMBRE": "Fútbol" },
        { "TIPO": "Música", "NOMBRE": "Guitarra" }
    ]
};

const objetoConvertido = convertirClavesAMinuscula(objetoOriginal);
console.log(objetoConvertido);
*/
```
    
* Generacion de todo un archivo : **High Level Goal**
Primero en un archivo poner las intrucciones de alto nivel como un comentario al principio del archivo
```javascript
/*
High Level Goal
Generar una api con nodejs y express que pemita manejar una todo list
Los endpoints que manejamos son:
    - GET /todos: Obtener la lista de todos
    - POST /todos: Crear un nuevo todo
    - PUT /todos/:id: Actualizar un todo existente
    - DELETE /todos/:id: Eliminar un todo
Debe soportar cors y debe guardar los datos en memoria y tener datos de ejemplo
*/
```
Luego la IA se va a basar en ese comentario para generar el codigo
```javascript

const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
    { id: 1, task: "Estudiar Node.js", completed: false },
    { id: 2, task: "Hacer la compra", completed: true },
    { id: 3, task: "Limpiar la casa", completed: false }
];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo no encontrado');

    todo.task = req.body.task;
    todo.completed = req.body.completed;
    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo no encontrado');

    todos.splice(todoIndex, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

```
* Generar un proyecto nuevo (pueden ser varios archivos) con el comanto @workspace new desde el github copilot chat
```chat
@workspace new agregar una api en nodejs y express que devuelva el clima
```

### Github Copilot : Otros features

* **Corregir o hacer mas robusta una funcion** (comando /fix) : Se puede habilitar seleccionando la funcion que quiero mejorar o corregir. Por defecto me hace sugerencias y yo le puedo pedir mejoras especificas al chat inline
* **Documentar codigo existente** (comando /doc) : Se puede documentar tanto en el chat inline como en el chat convencional
* **Explicar codigo existente** (comando /explain)

## Editores con IA

Editores:
* VScode : El clasico que le podemos incorporar IA por medio de extensiones
* Cursor (https://cursor.com/) : Ya tae incoporada la IA en forma nativa y permite tener una base de conocimiento mayor sobre el proyecto
* Windsurf (https://windsurf.com/download) : Alternativa popular a Cursor
