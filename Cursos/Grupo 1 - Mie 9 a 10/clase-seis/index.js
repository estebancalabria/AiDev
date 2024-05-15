/*
 Info para Copilot:
 Crear una api con nodejs y express que tenga 3 rutas:
 GET /api/peliculas me devuelve una lista de peliculas que tengo cargada en memoria
 GET /api/peliculas/{id} me devuelve una pelicula en particular
 POST /api/peliculas me permite agregar una pelicula a la lista
 Quiero utilizar ECMAScript 6 y que la api devuelva json
 Quiero utilizar los metodos map, filter, reduce siempre que sea posible
 Quiero utilizar async await siempre que sea posible
*/

const peliculas = [
    { id: 1, nombre: 'Pelicula 1', genero: 'Accion' },
    { id: 2, nombre: 'Pelicula 2', genero: 'Accion' },
    { id: 3, nombre: 'Pelicula 3', genero: 'Accion' },
    { id: 4, nombre: 'Pelicula 4', genero: 'Accion' },
    { id: 5, nombre: 'Pelicula 5', genero: 'Accion' },
    { id: 6, nombre: 'Pelicula 6', genero: 'Accion' },
    { id: 7, nombre: 'Pelicula 7', genero: 'Accion' },
    { id: 8, nombre: 'Pelicula 8', genero: 'Accion' },
    { id: 9, nombre: 'Pelicula 9', genero: 'Accion' },
    { id: 10, nombre: 'Pelicula 10', genero: 'Accion' }
];

const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/peliculas', async (req, res) => {
    res.json(peliculas);
});

app.get('/api/peliculas/:id', async (req, res) => {
    const pelicula = peliculas.find(pelicula => pelicula.id === parseInt(req.params.id));
    if (!pelicula) return res.status(404).send('La pelicula con el id especificado no fue encontrada');
    res.json(pelicula);
});

app.post('/api/peliculas', async (req, res) => {
    const pelicula = {
        id: peliculas.length + 1,
        nombre: req.body.nombre,
        genero: req.body.genero
    };
    peliculas.push(pelicula);
    res.json(pelicula);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));


