const fs = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, '../data/products.json');

const readDB = async () => {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Si el archivo no existe, créalo con un array vacío
            await fs.writeFile(dbPath, JSON.stringify({ products: [] }));
            return { products: [] };
        }
        throw error;
    }
};

const writeDB = async (data) => {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readDB, writeDB }; 