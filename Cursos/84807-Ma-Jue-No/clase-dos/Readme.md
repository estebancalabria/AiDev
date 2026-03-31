# Clase Dos - 31 de Marzo del 2026

# Repaso

* Roadmap del Curso
* Progrmacion con LLM
  * Ejemplo a Claude
    * Hicimos el pongo
    * Es muy bueno para programar
    * Tiene artefactos
* Comparacion y evaluacion de LLM
  * LMArena

# Requerimiento

* Seguir al profe IG Profesional
  * https://www.instagram.com/mct.esteban.calabria/

# Novedades

* Latam-GPT
  * https://www.latamgpt.org/

# Uso Programatico de LLM

* LLM
  * Propietarios
  * Open Source
      * Descargar localmente
          * Para ejecutar un modelo localmente
              * Ollama   : https://ollama.com/  (Desde el CLI)
              * LMStudio : https://lmstudio.ai/  (App de escritorio)
      * Modificarlos
      * Ejemplo
        * Americano
           * Familia LLama (Hecho por Meta)
        * Chinos
           * DeepSeek : https://chat.deepseek.com/
           * Qwen : https://chat.qwen.ai/

## Donde estan los modelos open source subidos?

* Se suben a : https://huggingface.co/
    * CTA : Se animan a crear una cuenta
* Es un recurso super importante porque es como el Github de los modelos Open Source

## Interaccion con los LLM

* Interaccion con los LLM
  * Mediante su interfaz Web
      * Ej ChatGPT : https://chatgpt.com/
  * Mediante API Key desde un lenguaje de programacion <<<< Esto es lo que vamos a hacer hoy
      * Ej ChatGPT : https://platform.openai.com/
      * Los modelos propietarios todos cobran el uso del LLM por API Key aunque sea barato

  * Lo que vamos a utilizar un modelo Open Source mediante API Key de forma gratuita
  * 

## Motores de Inferencia 

* https://groq.com/
* Ejecuta modelos Open Source con una arqutiectura que los hacer ser los mas rapidos hoy del mercado
* Muy usado en la industria DEV
* Acceso
  * Portal Web : https://chat.groq.com/
      * Abajo a la derecha tiene Sign In to Groq
      * Para probar la velocidad use el siguiente prompt "Programame un codigo que dado un string y una clave me lo devuelve encriptado en python"
  * Portal Dev : https://console.groq.com/home

## Utilizar un modelo de lenguaje mediante API Key

* Vamos a utilizar para programar Google Colab
  * colab.google
    * Colab es una implementacion online de un entorno llamado jupyter Notebook (https://jupyter.org) que te permite programar en Celdas
    * Son muy usados en IA y Data Science
    * Otros ejemplos (gracias juan) : https://deepnote.com/
* Crear un notebook Nuevo
* Sacar una API key en Groq y ver el codigo para llamar a un llm
    * API Key se saca en : https://console.groq.com/keys
    * El codigo para hacer la llamada al LLM esta en : https://console.groq.com/docs/overview

* NOTA IMPORTANTE.
  * Hay dos maneras de usar la API key
    * Responses    <<<<<<<<< Esta es la que estmaos usando
        * Prompt => REspuesta (No hay Conversacion)
        * Mas sencilla ideal para casos mas sencillos
    * ChatCopletion
        * Mantiene el historial de la conversacion que se la paso completa al llm
        * La que usa la interfaz web de chatGPT
     
* Nuestro codigo en pythom modificado queda

```python

from openai import OpenAI
import os
client = OpenAI(
    api_key=os.environ.get("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)

response = client.responses.create(
    input="Explain the importance of fast language models",
    model="openai/gpt-oss-20b",
)
print(response.output_text)

```

### Otro ejemplo mas Black Mirror.

* La IA que se programa a si misma

```python
from openai import OpenAI
import os

api_key = input("Ingrese su Api Key")
prompt = """
Generarme un codigo en python para ejecutar directamente que muestre los numeros del 1 al 10. 
Devolver solamente el codigo en python sin markdowns ni citas con ```
El codigo se debe poder ejecutar
"""

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

response = client.responses.create(
    input=prompt,
    model="openai/gpt-oss-20b",
)

codigo_python = response.output_text;

exec(codigo_python)
```

## NOTA

> Estos dos ultimos ejemplos son la base de como estan construidas las herramientas de IA que vamos a ver en el curso

# Probemos entonces nuestra primer herramienta

## WebSim

* Herramienta de IA para hacer Interfaces Interactivas
  * https://websim.com/
* Pueden entrar y explorar los proyectos que hay
* Prompt de ejemplo : "Una ruleta que gire y tire diferentes premios"
  * Ejemplos de proyectos : https://websim.com/@naughtyurn7858483/ruleta

> Puntaje : 8 / 10

