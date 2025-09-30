/*
Quiero una api en nodejs y express que maneje una todo list 
Que tenga un enpoint para listar las tareas pendientes
Cada tarea tiene un id y un estado done
Quiero obtener la informacion de una tarea espefecifica
Quiero poder agregar tareas nuevas
Quiero poder eliminar tareas segun su id
Tambien quiero poder modificar tareas
Las tareas las tengo en memoria en un json en este archivo y tiene tareas de ejemplo
*/

const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

let tasks = [
    { id: 1, title: 'Comprar leche', done: false },
    { id: 2, title: 'Lavar el coche', done: true },
    { id: 3, title: 'Estudiar Node.js', done: false }
];

// Listar todas las tareas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Obtener una tarea específica por id
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
    }   
});

// Agregar una nueva tarea
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        done: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Eliminar una tarea por id
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
});

// Modificar una tarea por id
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.title = req.body.title !== undefined ? req.body.title : task.title;
        task.done = req.body.done !== undefined ? req.body.done : task.done;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

app.listen(port, () => {
    console.log(`API de tareas escuchando en http://localhost:${port}`);
});
