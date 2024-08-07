/*
Quiero generar una api para una todo list.
Enndpoints:
    GET /todos -> devuelve un array con todas las tareas
    GET /todos/:id -> devuelve la tarea con el id especificado 
    POST /todos -> recibe un objeto con una tarea y la agrega al array
    DELETE /todos/:id -> elimina la tarea con el id especificado
    PUT /todos/:id -> edita la tarea con el id especificado
Grabar la lista de tareas en un archivo llamado todos.json
Ver convenciones archivo #file:system_prompt.js
*/

const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());



app.get('/todos', async (req, res) => {
    try {
        const todos = await getTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).send();
    }
}
);

app.get('/todos/:id', async (req, res) => {
    try {
        const todos = await getTodos();
        const todo = todos.find(todo => todo.id === parseInt(req.params.id));
        if (!todo) {
            return res.status(404).send();
        }
        res.json(todo);
    } catch (error) {
        res.status(500).send();
    }
});


