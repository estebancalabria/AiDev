# High Level Goal
#Quiero que generes una API RESTful profesional utilizando Python y Flask para un sistema de administración de tareas.
#La API debe permitir:
#Crear, leer, actualizar y eliminar tareas (CRUD completo).
#Cada tarea debe tener: id, título, descripción, fecha de vencimiento, estado (pendiente, en progreso, completada), y prioridad (baja, media, alta).
#Validaciones de entrada (por ejemplo, campos obligatorios, formatos de fecha, valores válidos para estado y prioridad).
#Estructura del proyecto organizada en módulos (por ejemplo, routes, models, schemas, app.py).
#Documentación de endpoints con Swagger o una solución similar.
#Se guarda en memoria
#Incluir CORS habilitado.
#Incluir manejo de errores con respuestas claras en formato JSON.
#Que se pueda correr fácilmente con un entorno virtual (requirements.txt).






from flask import Flask
from flask_cors import CORS
from flask_restful import Api


