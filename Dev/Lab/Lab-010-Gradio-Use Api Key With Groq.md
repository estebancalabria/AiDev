# Laboratorio: Usar la API de Groq en Google Colab 

Este laboratorio te guía para usar la API de Groq desde Google Colab, ingresando tu clave API y el prompt directamente en tiempo de ejecución.

---

## Requisitos previos

- Tener una cuenta en [Groq Console](https://console.groq.com/)
- Tener una cuenta de Google para acceder a Colab

---

## Paso 1: Obtener tu API Key en Groq

1. Ve a [https://console.groq.com/](https://console.groq.com/)
2. Inicia sesión o crea una cuenta si no tienes una.
3. En el panel de la consola, busca la sección **API Keys**.
4. Haz clic en **Create API Key**.
5. Copia la clave generada (ej. `gsk_xxxx...`).

> ⚠️ **Advertencia**: Al ingresar la clave manualmente, **no la compartas ni la guardes en archivos públicos**.

---

## Paso 2: Abrir Google Colab

1. Ve a [Colab](https://colab.google/)
2. Haz clic en **Nuevo notebook**.

---

## Paso 3: Instalar la biblioteca `openai`

1. Crear una celda nueva con el boton "+"
2. Ejecuta esta celda:

'''python
!pip install openai
'''

---

## Paso 4: Crear y ejecutar la celda principal

Asegúrate de que tu notebook contenga **exactamente** lo siguiente en una sola celda de código:

```
from openai import OpenAI

# Pedir la API key y el prompt al usuario
api_key = input("Ingrese su API key: ")
prompt = input("Ingrese su prompt: ")

# Configurar el cliente
client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1"
)

# Llamar al modelo
response = client.chat.completions.create(
    messages=[{"role": "user", "content": prompt}],
    model="llama3-8b-8192"
)

# Mostrar la respuesta
print("\nRespuesta del modelo:")
print(response.choices[0].message.content)
```

---

## Paso 5: Ejecutar

1. Ejecuta la celda.
2. Cuando se te pida, pega tu API key y presiona **Enter**.
3. Luego, escribe tu prompt (por ejemplo: *"Explain the importance of fast language models"*) y presiona **Enter**.
4. Verás la respuesta del modelo en segundos.

---

## Paso 5: Iniciar una celda nueva

1. Haz clic en el botón **+ Código** en la barra de herramientas de Colab para crear una **nueva celda vacía**.
2. Pega el código final (del Paso 6) en esa celda.
3. Ejecuta la celda para usar la API de Groq con tus propios valores.

¡Listo! Ahora puedes experimentar con modelos ultrarrápidos de Groq directamente desde Colab.

