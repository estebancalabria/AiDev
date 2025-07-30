# 2025-07-30 - Clase 2

## Programando IA con la API 

Vamos a ver como interactuar con un LLM mediante un lenguaje de programacion.
LLM + Programacion + Buen Prompt Engineering + Interfaz Web Personalizada = Programa estilo LLamaCoder
Vamos a utilizar la IA desde Python con..
> https://colab.google/

La pagina con toda la documentacion oficial de como interactuar con un llm es
> https://platform.openai.com/

Alternativas Gratuitas para utilzar una API
* Groq (El motor de inferencia que se jacta de ser el mas rapido https://groq.com/)
* Gemini

Para comparar modelos de lenguaje y ver en un momento dado cual es el mejor
> https://lmarena.ai/

La parte de desarrollador de Groq es
> https://console.groq.com/  (seria como el https://platform.openai.com/ pero para modelos Open Source con capa gratuita)

### Laboratorio : Utilizar la API key de Groq

Pasos a seguir
* Loguearse en la cosola de Groq (https://console.groq.com/)
* Crear un nuevo notebook en google colab ([colab.google.com](https://colab.google/)
* Generar una Api key en la consola de Groq (https://console.groq.com/keys) y guardarla en un lugar seguro
* Y a la seccion docs y copiar el copido de ejemplo de python en una celda de google colab
* Ejecutar una celda de codigo anterior para instalar la libreria de groq
```python
!pip install groq
```
* Poner el la siguiente celda de codigo el siguiente codigo modificado del de la parte de docs de consola de groq
```python

from groq import Groq

api_key = input("Ingrese su Api Key")
prompt = input("Ingrese su prompt")

client = Groq(api_key=api_key)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],
    model="moonshotai/kimi-k2-instruct",
    stream=False,
)

print(chat_completion.choices[0].message.content)
```
* En la documentacion de la consola de groq podemos ver que modelos tenemos disponibles
* Ejecutar elc codigo

### Laboratorio : La IA que se programa a si misma (Onda Black Mirror)

La computadora que se programa a si misma con IA entrando en la era Black Mirror
```python
from groq import Groq

api_key = input("Ingrese su Api Key")

client = Groq(api_key=api_key)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role":"system"
            "content":"Eres un programador senior experto en python"  
        },
        {
            "role": "user",
            "content": "Generar un codigo en pyton que muestra los numeros del 1 al 10. Devuelve solamente el codigo sin acotar nada mas. No devolver markdown. Solo texto"
        }
    ],
    model="moonshotai/kimi-k2-instruct",
    stream=False,
)

codigo_python = chat_completion.choices[0].message.content
print(codigo_python)
exec(codigo_python)
```

> Le agregamos un system prompt que dice como se tiene que comportar la IA.
> Con este codigo nos podemos imaginar como se desarrollan herrramientas del estilo LlamaCoder que vimos la clase pasada

## Laboratorio : Darle una intefaz con Gradio

Primero instalamos Gradio
```python
!pip install gradio
```
Le vamos a pedir a chatgpt que me genere el codigo con la interfaz Gradio
Me va a generar algo asi:
```python
import gradio as gr
from groq import Groq

# Variable global para almacenar la API key del usuario
client = None

def set_api_key(api_key):
    global client
    try:
        client = Groq(api_key=api_key)
        return "✅ API Key configurada correctamente"
    except Exception as e:
        return f"❌ Error al configurar la API Key: {e}"

def chatbot_interface(message, history):
    if not client:
        return "⚠️ Primero debes ingresar tu API Key arriba.", history

    try:
        # Construye el historial en el formato requerido por la API
        messages = [{"role": "user" if i % 2 == 0 else "assistant", "content": m} for i, (m, _) in enumerate(history)]
        messages.append({"role": "user", "content": message})

        response = client.chat.completions.create(
            messages=messages,
            model="moonshotai/kimi-k2-instruct",
            stream=False,
        )
        reply = response.choices[0].message.content
        history.append((message, reply))
        return "", history
    except Exception as e:
        return f"❌ Error al conectar con Groq: {e}", history


# UI de Gradio
with gr.Blocks(title="Groq Chatbot") as demo:
    gr.Markdown("## 🤖 Chatbot con Groq API (Modelo Kimi K2)")
    
    with gr.Row():
        api_input = gr.Textbox(label="🔑 Ingresá tu API Key", type="password")
        set_key_btn = gr.Button("Guardar API Key")
        status_output = gr.Textbox(label="Estado", interactive=False)

    set_key_btn.click(fn=set_api_key, inputs=api_input, outputs=status_output)

    chatbot = gr.Chatbot(label="Chat estilo ChatGPT")
    msg = gr.Textbox(label="Escribí tu mensaje")
    send_btn = gr.Button("Enviar")

    send_btn.click(fn=chatbot_interface, inputs=[msg, chatbot], outputs=[msg, chatbot])

demo.launch()
```

## Open Source en IA

El repositorio de los modelos Open Source de IA es :
> https://huggingface.co/
* Su objetivo es de mocratizar el acceso a la IA (que no sea todos modelos propietarios)
* Es como un github pero de modelos de Ia open source
* Crear una cuenta

Para utilizar los modelos de lenguaje que se subieron a Hugging face localmente tenemos las siguientes opciones   
(siempre y cuando tenga una computadora lo suficientemente potente)
* LMStudio (apllicacion de escritorio) : https://lmstudio.ai/
* Ollama (aplicacion de consola) : https://ollama.com/

Pero tambien hay modelos que puedo probar online dentro del Hugging Faces en la parte de Spaces
> https://huggingface.co/spaces    
Por ejemplo podemos probar el modelo flux
> https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev


