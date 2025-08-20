'''
    Utilizar System prompt #file:system_prompt.py
'''

from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

#Crear la base de datos con datos de prueba
conn = sqlite3.connect('todos.db')
cursor = conn.cursor()
cursor.execute('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, todo TEXT)')
cursor.execute('INSERT INTO todos (todo) VALUES ("Hacer la tarea")')
cursor.execute('INSERT INTO todos (todo) VALUES ("Hacer la compra")')
cursor.execute('INSERT INTO todos (todo) VALUES ("Hacer la comida")')
conn.commit()


'''@app.route('/todos/<int:id>', methods=['GET'])
def obtener_todos(id):
    conn = sqlite3.connect('todos.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM todos WHERE id = ?', (id,))
    todos = cursor.fetchall()
    conn.close()
    return todos'''

@app.route('/todos', methods=['GET'])
def obtener_todos():
    conn = sqlite3.connect('todos.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM todos')
    todos = cursor.fetchall()
    conn.close()
    return todos

@app.route('/todos', methods=['POST'])
def crear_todos(todo):
    conn = sqlite3.connect('todos.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO todos (todo) VALUES (?)', (todo,))
    conn.commit()
    conn.close()

@app.route('/todos/<int:id>', methods=['PUT'])
def actualizar_todos(id, todo):
    conn = sqlite3.connect('todos.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE todos SET todo = ? WHERE id = ?', (todo, id))
    conn.commit()
    conn.close()

@app.route('/todos/<int:id>', methods=['DELETE'])
def borrar_todos(id):
    conn = sqlite3.connect('todos.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM todos WHERE id = ?', (id,))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    app.run(debug=True)