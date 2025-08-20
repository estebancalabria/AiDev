/*
 Comentario para copilot (Patron High Level Goals)
 Quiero generar una api de canciones en nodejs y express. Quiero las siguientes rutas
 Las canciones estan hardodeadas en memoria
  GET /api/cancion y me devuelve una lista de canciones
  GET /api/cancion/:id y me devuelve una cancion especifica
  POST /api/cancion y me agrega una cancion 
Esto va a funcionar en el puerto 3000 pero no quiero variables hardcodeadas asi que hay que usar constantes
*/


// Path: index.js
const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;
const canciones = [
    { id: 1, nombre: 'La Bamba', autor: 'Ritchie Val' },
    { id: 2, nombre: 'La Cucaracha', autor: 'Anonimo' },
    { id: 3, nombre: 'El Mariachi', autor: 'Anonimo' },
    { id: 4, nombre: 'El Rey', autor: 'Jose Alfredo Jimenez' },
    { id: 5, nombre: 'La Llorona', autor: 'Anonimo' }
];

app.get('/api/cancion', (req, res) => {
    res.json(canciones);
});

app.get('/api/cancion/:id', (req, res) => {
    const cancion = canciones.find(c => c.id === parseInt(req.params.id));
    if (!cancion) return res.status(404).send('La cancion no fue encontrada');
    res.json(cancion);
}
);

app.post('/api/cancion', (req, res) => {
    const cancion = {
        id: canciones.length + 1,
        nombre: req.body.nombre,
        autor: req.body.autor
    };
    canciones.push(cancion);
    res.json(cancion);
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
}
);


