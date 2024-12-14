const { readDB, writeDB } = require('../config/database');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const data = await readDB();
        res.status(200).json({
            success: true,
            data: data.products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error del servidor'
        });
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const data = await readDB();
        const newProduct = {
            id: Date.now().toString(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        
        data.products.push(newProduct);
        await writeDB(data);

        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}; 