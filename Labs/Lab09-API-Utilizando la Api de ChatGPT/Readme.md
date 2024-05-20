# Laboratorio con OpenAI 🚀🔥

¡Bienvenidos a este emocionante laboratorio donde exploraremos las capacidades de las API de OpenAI! 🌌✨ Prepárense para una experiencia interactiva y emocionante.

## Usar Google Colab ⚙️

Para este laboratorio, utilizaremos Google Colab, un entorno de notebooks de código gratuito basado en la nube. Sigue estos pasos para acceder:

1. Ve a https://colab.research.google.com/ 💻
2. Inicia sesión con tu cuenta de Google
3. Crea un nuevo notebook haciendo clic en "Nuevo cuaderno" ➕
4. ¡Listo! Ahora puedes escribir y ejecutar código en las celdas del notebook

## Paso 1: Obtener una clave API 🔑

Para utilizar las API de OpenAI, necesitarás una clave API secreta. Sigue estos pasos: 

1. Ve a https://openai.com/ e inicia sesión en tu cuenta 👤
2. Dirígete a la página "View API Keys" 🔍
3. Haz clic en "Create new secret key" para generar una nueva clave API 💫
4. ¡Anota y guarda tu clave API secreta! No la compartas con nadie 🔒

## Paso 2: Utilizar la API de ChatGPT 💬

En este paso, aprenderemos a interactuar con la poderosa API de ChatGPT para obtener respuestas a nuestras preguntas. 🔮

1. Instala la librería de OpenAI:

```python
    pip install openai
```

2. Configura tu clave API:

```python
clave_api = "tu_clave_api_secreta"
from openai import OpenAI
client = OpenAI(api_key=clave_api)
```

3. Realiza una solicitud a ChatGPT:

```python
chat_completion = client.chat.completions.create(
   messages=[
       {"role": "user", "content": "Cual es la capital de Argentina?"},
   ],
   model="gpt-3.5-turbo",
)
print(chat_completion.choices[0].message.content)
```

## Paso 3: Generar una imagen con la API de DALL-E 🖼️

¡Prepárense para explorar el poder creativo de DALL-E! 🎨 En este paso, generaremos una imagen impresionante utilizando la API.

```python
response = client.images.generate(
   model="dall-e-2",
   prompt="Una imagen de una galaxia realista con la cara de Messi",
   size="1024x1024",
   n=1,
)
image_url = response.data[0].url
print(image_url)
```

## Paso 4: Crear un Asistente en el portal de OpenAI 🤖

1. Inicia sesión en tu cuenta de OpenAI (https://openai.com/) 👨‍💻
2. Ve a la sección "Playground" en el menú lateral izquierdo
3. Haz clic en "Create new" y selecciona "Create chatbot" 🆕
4. Elige un nombre y una descripción para tu asistente personalizado
5. Configura los parámetros del asistente según tus preferencias (ej. modelo base, instrucciones, etc.)
6. Haz clic en "Create chatbot" para finalizar la creación 🎉

¡Experimentemos con los asistentes de OpenAI! 🧠 Estos modelos pre-entrenados están optimizados para un diálogo natural y tareas de pregunta-respuesta.

## Paso 5: Usar tu Asistente personalizado 💬

Para interactuar con el asistente que creaste, puedes utilizar el siguiente código en Google Colab:

```python
import openai

# Configura tu clave API
openai.api_key = "tu_clave_api_secreta"

# ID de tu asistente personalizado (lo encuentras en el portal)
asistente_id = "asistente-abc123"

# Función para conversar con el asistente
def conversar_con_asistente(mensaje):
    respuesta = openai.ChatCompletion.create(
        model=asistente_id,
        messages=[
            {"role": "user", "content": mensaje}
        ]
    )
    return respuesta.choices[0].message.content

# Ejemplo de uso

pregunta = "¿Cuál es la capital de Argentina?"
respuesta = conversar_con_asistente(pregunta)
print(respuesta)
```

Recuerda reemplazar `"tu_clave_api_secreta"` por tu propia clave API y `"asistente-abc123"` por el ID de tu asistente personalizado que encuentras en el portal de OpenAI.

Con este código, podrás interactuar y hacer preguntas a tu asistente personalizado creado en el portal de OpenAI.

¡Diviértete explorando las capacidades de tu asistente! 🎉

## Alternativa: LMStudio 🤖

Si por alguna razón económica no puedes obtener una clave API, no te preocupes. 💰 El profesor te proporcionará una clave de prueba en clase. Como alternativa puedes para que puedas realizar el laboratorio utilizando LMStudio. 🔑

¡Estamos emocionados de ver lo que crearás en este laboratorio! 🎉 ¡Diviértete explorando las capacidades de OpenAI! 🌟