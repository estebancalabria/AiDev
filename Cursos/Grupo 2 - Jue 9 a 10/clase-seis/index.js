/*
   Patron High Level Goal
   Una api en nodejs y express que me devuelve la informacion del clima y la temperatura de una ciudad
   Esta api tiene guarda la informacion del clima en memoria
   No usamos variables hardcodeadas y escuchamos en el puerto 3000
   Tiene los siguientes Engpoints
   GET /api/clima que devuelve un json que tiene fecha, temperatura y ciudad
   POST /api/clima que agrega un registro nuevo con la temperatura para una fecha una ciudad 
*/

// Path: index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const clima = [
    {
        fecha: '2020-10-10',
        temperatura: 25,
        ciudad: 'Cordoba'
    },
    {
        fecha: '2020-10-10',
        temperatura: 30,
        ciudad: 'Buenos Aires'
    }
];

app.get('/api/clima', (req, res) => {
    res.json(clima);
});

app.post('/api/clima', (req, res) => {
    const nuevoClima = req.body;
    clima.push(nuevoClima);
    res.json(nuevoClima);
}
);

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});


