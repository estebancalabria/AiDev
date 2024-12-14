const express = require('express');  //Forma de importar de ES5                    
//import express from 'express'; //Forma de importar de ES6

const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 