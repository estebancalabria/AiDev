from flask import Flask, jsonify, request
import asyncio

app = Flask(__name__)

# Diccionario para almacenar los datos en memoria
_personas = {}

# Función para obtener todas las personas
@app.route('/personas', methods=['GET'])
async def obtener_personas():
    return jsonify(list(_personas.values()))

# Función para obtener una persona por ID
@app.route('/personas/<int:_id>', methods=['GET'])
async def obtener_persona(_id):
    _persona = _personas.get(_id)
    if _persona:
        return jsonify(_persona)
    return jsonify({'error': 'Persona no encontrada'}), 404

# Función para agregar una nueva persona
@app.route('/personas', methods=['POST'])
async def agregar_persona():
    _datos = request.json
    _id = len(_personas) + 1
    _persona = {
        'id': _id,
        'nombre': _datos['nombre'],
        'edad': _datos['edad']
    }
    _personas[_id] = _persona
    return jsonify(_persona), 201

# Función para actualizar una persona existente
@app.route('/personas/<int:_id>', methods=['PUT'])
async def actualizar_persona(_id):
    _datos = request.json
    _persona = _personas.get(_id)
    if _persona:
        _persona['nombre'] = _datos['nombre']
        _persona['edad'] = _datos['edad']
        return jsonify(_persona)
    return jsonify({'error': 'Persona no encontrada'}), 404

# Función para eliminar una persona
@app.route('/personas/<int:_id>', methods=['DELETE'])
async def eliminar_persona(_id):
    _persona = _personas.pop(_id, None)
    if _persona:
        return jsonify({'mensaje': 'Persona eliminada'})
    return jsonify({'error': 'Persona no encontrada'}), 404

if __name__ == '__main__':
    app.run(debug=True)