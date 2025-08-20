'''
Quiero hacer una api rest que me permita manejar tareas.:
    GET /tasks
    POST /tasks
    GET /tasks/<id>
    PUT /tasks/<id>
    DELETE /tasks/<id>
Ver #file:system_prompt.py para más detalles
'''

from flask import Flask, request, jsonify
import asyncio

app = Flask(__name__)

_tasks = {}

@app.route('/tasks', methods=['GET'])
async def get_tasks():
    tasks = []
    for task in _tasks.values():
        tasks.append(task)
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
async def post_tasks():
    data = request.json
    _tasks[data['id']] = data
    return jsonify(data)

@app.route('/tasks/<id>', methods=['GET'])
async def get_task(id):
    return jsonify(_tasks[id])

@app.route('/tasks/<id>', methods=['PUT'])
async def put_task(id):
    data = request.json
    _tasks[id] = data
    return jsonify(data)

@app.route('/tasks/<id>', methods=['DELETE'])
async def delete_task(id):
    del _tasks[id]
    return jsonify({'message': 'Task deleted'})

if __name__ == '__main__':
    app.run(debug=True)
