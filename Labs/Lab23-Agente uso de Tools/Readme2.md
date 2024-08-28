# Laboratorio: Implementación de un Asistente de Tareas con Groq

En este laboratorio, implementaremos un asistente personal para la gestión de tareas utilizando la API de Groq. Seguiremos un enfoque paso a paso, construyendo cada componente del sistema y finalmente integrándolos para crear un asistente funcional.

## Paso 1: Configuración del entorno

Primero, necesitamos configurar nuestro entorno de desarrollo e instalar las dependencias necesarias.

```bash
pip install groq
```

Luego, importamos las bibliotecas necesarias y configuramos la API de Groq:

```python
import json
from groq import Groq
from datetime import datetime, timedelta

# Configura tu API key de Groq
api_key = "tu_api_key_aquí"
client = Groq(api_key=api_key)

# Modelo a utilizar
MODEL = 'llama3-groq-70b-8192-tool-use-preview'

# Simulación de una base de datos de tareas
tareas = []
```

## Paso 2: Implementación de las funciones básicas de gestión de tareas

Ahora, implementaremos las funciones CRUD para nuestra lista de tareas:

```python
def agregar_tarea(descripcion, fecha_limite):
    tarea = {
        "id": len(tareas) + 1,
        "descripcion": descripcion,
        "fecha_limite": fecha_limite,
        "completada": False
    }
    tareas.append(tarea)
    return json.dumps({"mensaje": "Tarea agregada con éxito", "tarea": tarea})

def listar_tareas():
    return json.dumps({"tareas": tareas})

def actualizar_tarea(id, descripcion=None, fecha_limite=None, completada=None):
    for tarea in tareas:
        if tarea["id"] == id:
            if descripcion:
                tarea["descripcion"] = descripcion
            if fecha_limite:
                tarea["fecha_limite"] = fecha_limite
            if completada is not None:
                tarea["completada"] = completada
            return json.dumps({"mensaje": "Tarea actualizada con éxito", "tarea": tarea})
    return json.dumps({"error": "Tarea no encontrada"})

def eliminar_tarea(id):
    global tareas
    tareas_originales = len(tareas)
    tareas = [tarea for tarea in tareas if tarea["id"] != id]
    if len(tareas) < tareas_originales:
        return json.dumps({"mensaje": "Tarea eliminada con éxito"})
    return json.dumps({"error": "Tarea no encontrada"})
```

## Paso 3: Definición de las herramientas (tools) para Groq

Definimos las herramientas que nuestro asistente podrá utilizar:

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "agregar_tarea",
            "description": "Agrega una nueva tarea a la lista",
            "parameters": {
                "type": "object",
                "properties": {
                    "descripcion": {
                        "type": "string",
                        "description": "Descripción de la tarea",
                    },
                    "fecha_limite": {
                        "type": "string",
                        "description": "Fecha límite de la tarea (formato: YYYY-MM-DD)",
                    }
                },
                "required": ["descripcion", "fecha_limite"],
            },
        },
    },
    # Definir las demás herramientas (listar_tareas, actualizar_tarea, eliminar_tarea) de manera similar
]
```

## Paso 4: Implementación de la función de conversación principal

Implementamos la función principal que maneja la conversación con el usuario:

```python
def run_conversation(user_prompt):
    messages = [
        {
            "role": "system",
            "content": "Eres un asistente personal para la gestión de tareas. Utiliza las funciones proporcionadas para ayudar al usuario a gestionar sus tareas."
        },
        {
            "role": "user",
            "content": user_prompt,
        }
    ]

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        tools=tools,
        tool_choice="auto",
        max_tokens=4096
    )

    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls

    if tool_calls:
        available_functions = {
            "agregar_tarea": agregar_tarea,
            "listar_tareas": listar_tareas,
            "actualizar_tarea": actualizar_tarea,
            "eliminar_tarea": eliminar_tarea,
        }
        
        messages.append(response_message)
        
        for tool_call in tool_calls:
            function_name = tool_call.function.name
            function_to_call = available_functions[function_name]
            function_args = json.loads(tool_call.function.arguments)
            function_response = function_to_call(**function_args)
            
            messages.append(
                {
                    "tool_call_id": tool_call.id,
                    "role": "tool",
                    "name": function_name,
                    "content": function_response,
                }
            )
        
        second_response = client.chat.completions.create(
            model=MODEL,
            messages=messages
        )
        
        return second_response.choices[0].message.content
    
    return response_message.content

# Ejemplo de uso
user_prompt = "Necesito agregar una tarea para comprar leche mañana"
print(run_conversation(user_prompt))
```

## Paso 5: Prueba del asistente

Probamos nuestro asistente con diferentes tipos de solicitudes:

```python
# Agregar una tarea
print(run_conversation("Agrega una tarea para llamar a mamá el viernes"))

# Listar tareas
print(run_conversation("Muéstrame todas mis tareas"))

# Actualizar una tarea
print(run_conversation("Cambia la fecha de la tarea de llamar a mamá para el sábado"))

# Eliminar una tarea
print(run_conversation("Elimina la tarea de comprar leche"))
```

## Paso 6: Mejoras y extensiones

Algunas ideas para mejorar y extender el asistente:

1. Agregar manejo de prioridades para las tareas.
2. Implementar recordatorios basados en la fecha límite.
3. Añadir categorías o etiquetas a las tareas.
4. Implementar búsqueda y filtrado de tareas.
5. Integrar con un calendario o una aplicación de productividad.

```python
# Ejemplo de cómo podría ser una función para agregar prioridad a una tarea
def actualizar_prioridad_tarea(id, prioridad):
    for tarea in tareas:
        if tarea["id"] == id:
            tarea["prioridad"] = prioridad
            return json.dumps({"mensaje": "Prioridad actualizada con éxito", "tarea": tarea})
    return json.dumps({"error": "Tarea no encontrada"})

# Luego, añadirías esta función a las herramientas disponibles y la implementarías en run_conversation
```

Este laboratorio proporciona una base sólida para crear un asistente de gestión de tareas utilizando Groq. Puedes expandir y personalizar este ejemplo según tus necesidades específicas de enseñanza o aplicación.
