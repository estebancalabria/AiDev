# Clase Uno - 15 de Diciembre 2025

# Roadmap del Curso

> https://www.instagram.com/p/DJrpLZWgqJr/?img_index=1

* Prompuesta : Aplicar la IA en cada etapa del proceso
  * Analisis
    * Disenio / System Design
      * Desarrollo
        * Pruebas
          * Implentacion

> No se olviden de seguir!

# Coddificar con LLM

- ## Claude

> https://claude.ai/

* Fue siempre considerado como uno de los mejores LLM para desarrollar
* Tiene features como los artefactos pensados especialmente para desarroladores
    * Previsualizacion de codigo
    * Trabaja con html
    * Trabaja con componentes JSX como los de react
    * Prevsisualizacion tambien de diagrmas

```
Crear un solo artefacto que sea el juego pong en html/ javascript. Que el jugador de la derecha se mueva con las teclas de cursor. Que el jugador de la izquierda se mueva con la a y la z. Agregarle efectos visuales y de particulas para h acerlo mas atractivo y moderno. Llevar la cuenta de puntos. Con la barra espaciadora se pausa el juego y se puede reiniciar.
```

> https://claude.ai/public/artifacts/e03d9638-a5d1-4cfc-8fe7-c00e5cf51a33

---
* Un componente jsx

```
Generarme un artfacto que sea componente jsx tipo react que muestre un input para elegir fecha que sea un calendario que puedas elegir  facilmente el anio, y el mes
```

```
Pero quiero que sea un input  con un boton (...) al lado y cuando apreto el boton se despliegue lo que se ve ahora
```

> https://claude.ai/public/artifacts/12d32704-4121-4600-aa3f-04b09a966474

```
Me lo podes hacer como web component sin react
```

- ## Comparando LLM

* Yo hoy les digo que claude esta catalogado como uno de los mejores modelos para programar. Pero como se en un momento dado si esta afirmacion sigue siendo valida? :

> https://lmarena.ai/es

- ## Qwen

* El ChatGPT chino Open Source
* Nunca le encontre el limite de uso

> https://chat.qwen.ai/

```
Me podes generar un html/javascript unico que sea el flappy birds
```

* Puntaje : 

# Herramientas

- ## Ya que estamos con los juegos : WebSim

> websim.ai

* Ideal para hacer cosas web interactivas
* Ejemplo
  * https://websim.com/@datboodiebreadham/count-runner
    
 
* Vamos a probar con 

```
Quiero hacer un simulador de base datos que use el almacemiento local de Javascript y tenga una interfaz similar al managgemet Studio
```

* Con eso Generamos

> https://websim.com/@silentmist45126041/db-studio/1

* Puntaje : 10 / 10

# Programando con API Key

- ## Entorno para desarrollar en Python

* Entorno para desarrollar en python sin tener que instalar nada
> https://colab.google/

- ## Acceso como programador

* Todos los modelos de lenguaje tienen 2 portales:
  * El portal web para el usuario final : https://chatgpt.com/
  * El portal para el desarrollador :  https://platform.openai.com/docs/overview
  * Lamentablemente el uso de la api de ChatGPT (sin es economico) es pago

* **Como Chatgpt es pago vamos a utilizar una alternativa Open Source**

* Qroq
   * Motor de Inferencia para ejecutar modelos de lenguaje Open Source
      * Portal web para el usuario final : https://chat.groq.com/
      * El portal para el desarrollador es : https://console.groq.com/

- ## Usp de API key con Groq

* Ir a la pagina de desarrollador de Groq :  https://console.groq.com/
* Sacar una api Key
* Crear un google colab nuevo :  https://colab.google/
* Copiar el codigo de la invocacion modificado en una celda de codigo nueva

```python

from openai import OpenAI
import os

api_key = input("Ingrese su api key")
prompt = input("Ingrese su prompt")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

response = client.responses.create(
    input=prompt,
    model="openai/gpt-oss-20b",
)
print(response.output_text)
```

> NOTA: Si estoy en un entorno local y no en Google Colab Debo instalar la libreria de OpenAI

```bash
pip install OpenAI
```

- ## Ejemplo Black Mirror : La computadora que se programa a si misma

```python
from openai import OpenAI
import os

api_key = input("Ingrese su api key")
prompt = "Dame un codigo en python que muestre los primeros 10 numeros pares. Devolver el codigo para ejecutar directamente sin acotar nada mas. Sin markdown ni triple backtick"

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

response = client.responses.create(
    input=prompt,
    model="openai/gpt-oss-20b",
)

codigo = response.output_text

exec(codigo)
```

- ## Interfaz Interactiva con Gradio

```python
import gradio as gr
from openai import OpenAI
import os

# --- Lógica de la API ---
def generar_respuesta(api_key: str, prompt: str) -> str:
    """
    Función que interactúa con la API de OpenAI (vía Groq en este caso)
    y devuelve la respuesta del modelo.
    """
    if not api_key:
        return "Error: Por favor, ingrese su API Key."
    if not prompt:
        return "Error: Por favor, ingrese un prompt."

    try:
        # Inicialización del cliente con la API Key y la URL base de Groq
        client = OpenAI(
            api_key=api_key,
            base_url="https://api.groq.com/openai/v1",
        )

        # Realizar la llamada a la API
        # NOTA: En la biblioteca 'openai' el método para completions es 'completions.create'
        # y el parámetro del prompt es 'prompt', pero en tu código original usaste 'responses.create'
        # y 'input'. Para compatibilidad con la estructura más común de OpenAI/Groq,
        # usaré 'completions.create' con el formato 'messages' para mejor rendimiento.
        
        # Si quieres usar el modelo Groq para un completion más simple:
        # response = client.completions.create(
        #     model="mixtral-8x7b-32768",  # Usando un modelo real de Groq, ya que "openai/gpt-oss-20b"
        #                                  # no es un modelo estándar de Groq y probablemente cause un error.
        #     prompt=prompt,
        #     max_tokens=1024
        # )
        # return response.choices[0].text
        
        # O el formato de chat más común:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",  # Modelo de Groq altamente recomendado
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=2048,
        )
        return response.choices[0].message.content

    except Exception as e:
        # Captura cualquier error de la API (clave inválida, problema de conexión, etc.)
        return f"Ocurrió un error: {e}"

# --- Interfaz de Gradio ---

# 1. Definir los componentes de entrada
api_key_input = gr.Textbox(
    label="🔒 API Key (Clave secreta)",
    type="password",  # Oculta la entrada para mayor seguridad
    placeholder="Ingrese su clave de Groq/OpenAI aquí",
)

prompt_input = gr.Textbox(
    label="💬 Prompt",
    lines=5,
    placeholder="Escriba su consulta o la instrucción para el modelo...",
)

# 2. Definir el componente de salida
output_text = gr.Textbox(
    label="🤖 Respuesta del Modelo",
    lines=10,
    interactive=False,
)

# 3. Crear la interfaz
iface = gr.Interface(
    fn=generar_respuesta,  # La función de Python a ejecutar
    inputs=[api_key_input, prompt_input],  # Los componentes de entrada
    outputs=output_text,  # El componente de salida
    title="Interfaz Interactiva con Groq (vía OpenAI SDK)",
    description="Ingrese su API Key (de Groq) y un Prompt para obtener una respuesta del modelo Mixtral-8x7B. Su clave no se guardará."
)

# 4. Iniciar la aplicación
iface.launch()
```

---

# Bonus Track : Hugging Face

> https://huggingface.co/

* Es como el github pero de modelo de Inteligencia Artificial Open Source
* Ver la parte de Spaces
* Muy bueno
* Puntake : 10/10

