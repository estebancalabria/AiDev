/*
Quiero una api en nodejs y express que maneje eventos y venta de entradas
Quiero un endpoint para mostrar los eventos dispoibles con su nombre, fecha y precio
Quiero otro endoiunt para ver la disponibilidad de entradas de un evento en particular
Quiero un endpoint para reservar una entrada y actualiza la cantidad de disponiblesQuiero un json grande con los eventos al princpio que despues lo reemplazare por una base de datos
*/

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const eventos = require('./eventos.json');
const { calculateSum, calculateAverage, calculateStandardDeviation, calculateMedian } = require('./funciones');
const { findMostFrequentElement } = require('./funciones');

// Endpoint para mostrar los eventos disponibles
app.get('/eventos', (req, res) => {
    const eventosDisponibles = eventos.map(evento => ({
        nombre: evento.nombre,
        fecha: evento.fecha,
        precio: evento.precio
    }));
    res.json(eventosDisponibles);
});

// Endpoint para ver la disponibilidad de entradas de un evento en particular
app.get('/eventos/:id/disponibilidad', (req, res) => {
    const evento = eventos.find(e => e.id === parseInt(req.params.id));
    if (!evento) return res.status(404).send('Evento no encontrado');

    res.json({ disponibles: evento.disponibles });
});

// Endpoint para reservar una entrada
app.post('/eventos/:id/reservar', (req, res) => {
    const evento = eventos.find(e => e.id === parseInt(req.params.id));
    if (!evento) return res.status(404).send('Evento no encontrado');

    const { cantidad } = req.body;
    if (!cantidad || cantidad <= 0) return res.status(400).send('Cantidad inválida');

    if (evento.disponibles < cantidad) return res.status(400).send('No hay suficientes entradas disponibles');

    evento.disponibles -= cantidad;
    res.json({ mensaje: 'Entrada reservada con éxito', disponibles: evento.disponibles });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});