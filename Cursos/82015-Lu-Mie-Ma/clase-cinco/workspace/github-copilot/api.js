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
