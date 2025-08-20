/*
  Ver #especificaciones.js para ver la estructura de la API
*/

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const app = express();

app.use(express.json());
app.use('/api', router);

const tasksPath = path.join(__dirname, 'tasks.json');

router.get('/tasks', async (req, res) => {
    const tasks = await getTasks();
    res.json(tasks);
    }
);

router.get('/tasks/:id', async (req, res) => {
    const tasks = await getTasks();
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
    }
);


