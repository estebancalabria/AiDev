# 🖥️ Laboratorio: Creando tu Asistente de Gestión de Tickets de Programación con Groq

## 📋 Resumen de Pasos

Sigue estos pasos para crear tu propio asistente de gestión de tickets de programación:

1. 🛠️ **Preparar el Entorno**: Configura tu entorno de desarrollo
   - Instala las herramientas necesarias
   - Importa las bibliotecas requeridas

2. 🎫 **Construir el Sistema de Tickets**: Implementa las funciones básicas de gestión de tickets
   - Crea funciones para crear, listar, actualizar y cerrar tickets
   - Simula una base de datos simple de tickets y programadores

3. 🔧 **Equipar al Asistente**: Define las herramientas (tools) para Groq
   - Crea descripciones de funciones que el modelo pueda utilizar

4. 🧠 **Activar el Asistente**: Implementa la función de conversación principal
   - Conecta el modelo de lenguaje con las funciones de gestión de tickets

5. 🧪 **Poner a Prueba**: Prueba tu asistente
   - Realiza diversas solicitudes para verificar su funcionamiento

6. 🚀 **Ampliar Capacidades**: Mejora y extiende las funcionalidades del asistente
   - Agrega nuevas características como priorización o estimación de tiempo

Ahora, ¡manos a la obra! Sigue cada paso detallado a continuación para crear tu asistente de gestión de tickets de programación. 🎉

## Paso 1: 🛠️ Configuración del entorno

Primero, configuremos nuestro entorno de desarrollo:

```bash
pip install groq
```

Ahora, importamos las bibliotecas necesarias y configuramos la API de Groq:

```python
import json
from groq import Groq
from datetime import datetime, timedelta

# Configura tu API key de Groq
api_key = "tu_api_key_aquí"
client = Groq(api_key=api_key)

# Modelo a utilizar
MODEL = 'llama3-groq-70b-8192-tool-use-preview'

# Simulación de una base de datos de tickets y programadores
tickets = []
programadores = ["Ana", "Bob", "Carlos", "Diana"]
```

## Paso 2: 🎫 Implementación de las funciones básicas de gestión de tickets

Implementemos las funciones CRUD para nuestro sistema de tickets:

```python
def crear_ticket(titulo, descripcion, asignado_a):
    ticket = {
        "id": len(tickets) + 1,
        "titulo": titulo,
        "descripcion": descripcion,
        "asignado_a": asignado_a,
        "estado": "Abierto",
        "fecha_creacion": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    tickets.append(ticket)
    return json.dumps({"mensaje": "Ticket creado con éxito", "ticket": ticket})

def listar_tickets(programador=None):
    if programador:
        tickets_filtrados = [t for t in tickets if t["asignado_a"] == programador]
    else:
        tickets_filtrados = tickets
    return json.dumps({"tickets": tickets_filtrados})

def actualizar_ticket(id, titulo=None, descripcion=None, asignado_a=None, estado=None):
    for ticket in tickets:
        if ticket["id"] == id:
            if titulo:
                ticket["titulo"] = titulo
            if descripcion:
                ticket["descripcion"] = descripcion
            if asignado_a:
                ticket["asignado_a"] = asignado_a
            if estado:
                ticket["estado"] = estado
            return json.dumps({"mensaje": "Ticket actualizado con éxito", "ticket": ticket})
    return json.dumps({"error": "Ticket no encontrado"})

def cerrar_ticket(id):
    for ticket in tickets:
        if ticket["id"] == id:
            ticket["estado"] = "Cerrado"
            return json.dumps({"mensaje": "Ticket cerrado con éxito", "ticket": ticket})
    return json.dumps({"error": "Ticket no encontrado"})
```

## Paso 3: 🔧 Definición de las herramientas (tools) para Groq

Definamos las herramientas que nuestro asistente podrá utilizar:

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "crear_ticket",
            "description": "Crea un nuevo ticket de programación",
            "parameters": {
                "type": "object",
                "properties": {
                    "titulo": {
                        "type": "string",
                        "description": "Título del ticket",
                    },
                    "descripcion": {
                        "type": "string",
                        "description": "Descripción detallada del ticket",
                    },
                    "asignado_a": {
                        "type": "string",
                        "description": "Nombre del programador asignado",
                    }
                },
                "required": ["titulo", "descripcion", "asignado_a"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "listar_tickets",
            "description": "Lista todos los tickets o los tickets de un programador específico",
            "parameters": {
                "type": "object",
                "properties": {
                    "programador": {
                        "type": "string",
                        "description": "Nombre del programador (opcional)",
                    }
                },
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "actualizar_ticket",
            "description": "Actualiza un ticket existente",
            "parameters": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "description": "ID del ticket a actualizar",
                    },
                    "titulo": {
                        "type": "string",
                        "description": "Nuevo título del ticket (opcional)",
                    },
                    "descripcion": {
                        "type": "string",
                        "description": "Nueva descripción del ticket (opcional)",
                    },
                    "asignado_a": {
                        "type": "string",
                        "description": "Nuevo programador asignado (opcional)",
                    },
                    "estado": {
                        "type": "string",
                        "description": "Nuevo estado del ticket (opcional)",
                    }
                },
                "required": ["id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "cerrar_ticket",
            "description": "Cierra un ticket existente",
            "parameters": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "description": "ID del ticket a cerrar",
                    }
                },
                "required": ["id"],
            },
        },
    }
]
```

## Paso 4: 🧠 Implementación de la función de conversación principal

Implementemos la función principal que maneja la conversación con el usuario:

```python
def run_conversation(user_prompt):
    messages = [
        {
            "role": "system",
            "content": "Eres un asistente de gestión de tickets de programación. Utiliza las funciones proporcionadas para ayudar al usuario a gestionar los tickets."
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
            "crear_ticket": crear_ticket,
            "listar_tickets": listar_tickets,
            "actualizar_ticket": actualizar_ticket,
            "cerrar_ticket": cerrar_ticket,
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
user_prompt = "Necesito crear un ticket para arreglar un bug en la función de login"
print(run_conversation(user_prompt))
```

## Paso 5: 🧪 Prueba del asistente

Probemos nuestro asistente con diferentes tipos de solicitudes:

```python
# Crear un ticket
print(run_conversation("Crea un ticket para optimizar la base de datos y asígnalo a Ana"))

# Listar tickets
print(run_conversation("Muéstrame todos los tickets asignados a Bob"))

# Actualizar un ticket
print(run_conversation("Cambia el estado del ticket #1 a 'En progreso'"))

# Cerrar un ticket
print(run_conversation("Cierra el ticket #2, ya se ha resuelto"))
```

## Paso 6: 🚀 Mejoras y extensiones

Algunas ideas para mejorar y extender el asistente:

1. Agregar sistema de prioridades para los tickets (Alta, Media, Baja).
2. Implementar estimación de tiempo para cada ticket.
3. Añadir etiquetas o categorías a los tickets (por ejemplo, "bug", "feature", "optimization").
4. Implementar un sistema de comentarios en los tickets.
5. Crear informes de productividad por programador o por proyecto.

```python
# Ejemplo de cómo podría ser una función para agregar un comentario a un ticket
def agregar_comentario_ticket(id, comentario, autor):
    for ticket in tickets:
        if ticket["id"] == id:
            if "comentarios" not in ticket:
                ticket["comentarios"] = []
            ticket["comentarios"].append({
                "autor": autor,
                "comentario": comentario,
                "fecha": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            return json.dumps({"mensaje": "Comentario agregado con éxito", "ticket": ticket})
    return json.dumps({"error": "Ticket no encontrado"})

# Luego, añadirías esta función a las herramientas disponibles y la implementarías en run_conversation
```

Este laboratorio proporciona una base sólida para crear un asistente de gestión de tickets de programación utilizando Groq. Puedes expandir y personalizar este ejemplo según las necesidades específicas de tu equipo de desarrollo. ¡Disfruta optimizando tu flujo de trabajo con tu nuevo asistente! 🚀👨‍💻👩‍💻
