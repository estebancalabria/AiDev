# Quiero hacer una api de productos. 
# Cada producto tiene un nombre, un precio y una cantidad en stock y id.
# Los productos estan en memoria
# Quiero poder agregar productos, eliminar productos, modificar productos 
#   POST /api/producto para agregar producto
#   DELETE /api/producto/<id> para eliminar producto
#   PUT /api/producto/<id> para modificar producto
# Obtener una lista de todos los productos. 
#   GET /api/producto
# Obtener un prodcto en concreto
#    GET /api/product/<id
# Cada producto debe tener un id único. 

from flask import Flask, request, jsonify
cd 
app = Flask(__name__)

productos = [
    {'id': 1, 'nombre': 'Producto 1', 'precio': 100, 'stock': 100},
    {'id': 2, 'nombre': 'Producto 2', 'precio': 200, 'stock': 50},
    {'id': 3, 'nombre': 'Producto 3', 'precio': 300, 'stock': 20}
]

@app.route('/api/producto', methods=['POST'])
def agregar_producto():
    producto = request.json
    producto['id'] = len(productos) + 1
    productos.append(producto)
    return jsonify(producto)

@app.route('/api/producto/<int:id>', methods=['DELETE'])
def eliminar_producto(id):
    global productos
    productos = [p for p in productos if p['id'] != id]
    return jsonify({'message': 'Producto eliminado'})

@app.route('/api/producto/<int:id>', methods=['PUT'])
def modificar_producto(id):
    global productos
    producto_actualizado = request.json
    for i, p in enumerate(productos):
        if p['id'] == id:
            productos[i] = producto_actualizado
            return jsonify(producto_actualizado)
    return jsonify({'message': 'Producto no encontrado'})

@app.route('/api/producto', methods=['GET'])
def obtener_productos():
    return jsonify(productos)

@app.route('/api/producto/<int:id>', methods=['GET'])
def obtener_producto(id):
    for p in productos:
        if p['id'] == id:
            return jsonify(p)
    return jsonify({'message': 'Producto no encontrado'})

if __name__ == '__main__':
    app.run(debug=True)
