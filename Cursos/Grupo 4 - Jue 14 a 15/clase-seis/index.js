/*
Patron High Level Goal
Este codigo correponde a una api en nodejs y express que permite recuperar y actualizar libros
Los libros estan en memoria en un variable
En mi codigo no quiero valores de puerto hardcoded
Quiero los siguientes endpoints:
    GET /api/libros me devuleve una lista de libros
    GET /api/libros/:id me devuelve un libro por id
    POST /api/libros me permite agregar un libro
*/

// Path: index.js
const express = require('express');

const app = express();
app.use(express.json());

const libros = [
    {id: 1, nombre: 'El principito'},
    {id: 2, nombre: 'El tunel'},
    {id: 3, nombre: 'El aleph'}
];

app.get('/api/libros', (req, res) => {
    res.send(libros);
});

app.get('/api/libros/:id', (req, res) => {
    const libro = libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) return res.status(404).send('El libro con el id no fue encontrado');
    res.send(libro);
});

app.post('/api/libros', (req, res) => {
    const libro = {
        id: libros.length + 1,
        nombre: req.body.nombre
    };
    libros.push(libro);
    res.send(libro);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));


