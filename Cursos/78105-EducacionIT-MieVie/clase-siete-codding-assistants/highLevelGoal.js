//
// Generar un servidor express que sea una api para libros que guarde y lea libros de memoria
// Que soporte agregar libros, modificar, leer todos, leer por id y eliminar
// Que soporte cors y que haga valiciones de los datos
//
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3000;

// Lista inicial de libros
const libros = [
    { id: uuidv4(), titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967 },
    { id: uuidv4(), titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', anio: 1943 }
];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Libros');
});

app.get('/libros', (req, res) => {
    res.json(libros);
});

app.get('/libros/:id', (req, res) => {
    const libro = libros.find(libro => libro.id === req.params.id);
    if (!libro) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(libro);
});

// Validación de datos
function validarLibro({ titulo, autor, anio }) {
    if (
        typeof titulo !== 'string' || titulo.trim() === '' ||
        typeof autor !== 'string' || autor.trim() === '' ||
        typeof anio !== 'number' || !Number.isInteger(anio) || anio < 0
    ) {
        return false;
    }
    return true;
}

app.post('/libros', (req, res) => {
    const { titulo, autor, anio } = req.body;
    if (!validarLibro({ titulo, autor, anio })) {
        return res.status(400).json({ error: 'Datos inválidos. Se requiere: titulo (string), autor (string), anio (entero positivo)' });
    }
    const libro = { id: uuidv4(), titulo: titulo.trim(), autor: autor.trim(), anio };
    libros.push(libro);
    res.status(201).json(libro);
});

app.put('/libros/:id', (req, res) => {
    const libro = libros.find(libro => libro.id === req.params.id);
    if (!libro) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    const { titulo, autor, anio } = req.body;
    if (!validarLibro({ titulo, autor, anio })) {
        return res.status(400).json({ error: 'Datos inválidos. Se requiere: titulo (string), autor (string), anio (entero positivo)' });
    }
    libro.titulo = titulo.trim();
    libro.autor = autor.trim();
    libro.anio = anio;
    res.json(libro);
});

app.delete('/libros/:id', (req, res) => {
    const libroIndex = libros.findIndex(libro => libro.id === req.params.id);
    if (libroIndex === -1) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    libros.splice(libroIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
