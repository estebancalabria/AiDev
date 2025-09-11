# Clase Uno - 10 de Septiembre del 2025
 
## Roadmap del Curso

* Ver Presentacion de : https://www.instagram.com/p/DJrpLZWgqJr/?img_index=1     
* MCP : https://www.instagram.com/p/DI0LLJAuUno/?img_index=1    
* Vibe Coding : https://www.instagram.com/p/DJ-cav5ObK3/?img_index=14    

---

## Generacion de Codigo con LLM

* Claude : https://claude.ai
* Claude Code : https://www.anthropic.com/claude-code
* ChatGPT : https://chatgpt.com/
* Mistral : https://mistral.ai/
* Groq : https://groq.com/
* Los chinos (open Source)
    * DeepSeek : https://chat.deepseek.com/
    * Qwen : https://chat.qwen.ai/

- ### Primer Artefacto generado con Claude

Prompt Utilizado para generar una web en claude
```prompt
Desarrollar un ARTEFACTO que sea un sitio web ecommerce. Que se vea moderlo y elegante. Que responsive. Que este todo en un mismo archivo. 
```
Con eso generamos el siguiente artefacto
> https://claude.ai/public/artifacts/c5b50270-52bb-46e8-96ad-8bfc1e4176b3

A mis estudiantes les genero:
* https://claude.ai/public/artifacts/09ff85d8-4b0d-4096-837d-360883b09f38
* https://claude.ai/public/artifacts/1bec6a2f-502e-4538-81bf-0ca11ed46875
* https://claude.ai/public/artifacts/2c0152e1-490e-4a33-a38b-f9da5af64fb4

- ### Otro Ejemplo

```prompt
Me podes generar un artefacto en html y javascript que sea una version del Flappy Birds pero con Emojis que tenga un menu para iniciar el juego y se haga saltar el monigote con la barra espaciadora. Que se vea moderno, elegante con efectos de fisica y animaciones.
```
Con eso generamos
> https://claude.ai/public/artifacts/dd9b3e22-1821-4073-9954-1cfb339ffc8c

Otro 
* https://claude.ai/public/artifacts/77ef57ca-6281-4486-8d2f-3dcd058499e2

- ### Canvas de ChatGPT

```prompt
Generame un canvas que sea una pagina web personal de un desarrollador que sea moderna, profesional y elegante. Te subo un CV para tenerlo de referencia
```
Con eso creamos
> https://chatgpt.com/canvas/shared/68c207e59d288191b7313644b67b390f

## Elegir el mejor LLM

> https://lmarena.ai/

'''prompt
Generame un codigo original para encriptar un texto con clave publica y privada en python minimizando el uso de librerias externas
'''

Luego con las votaciones se arma un ranking en: 

> https://lmarena.ai/leaderboard

## Herramienta para generar Interfaces Graficas

> https://llamacoder.together.ai/

Promocionado por 

> https://www.together.ai/

```
Una app que muestre un calendario y permita crear eventos en el calendario
```
Hice:
> https://llamacoder.together.ai/share/v2/b2DuFIuSaUPsoVSY

o sino un login
> https://llamacoder.together.ai/share/v2/JEB_tRC4eFdgjjSw

Mis estudiantes hicieron:
* https://llamacoder.together.ai/share/v2/aDkBWPHUdJFmhXpn

---

## Programar utilizando la API Key

Vamos en programar en python utilizando google Colab
> https://colab.google/

* Los LLM tienen dos Web una para el usuario final y otra para el desarrollador
    * Por ejemplo ChatGPT (Es pago)
        * Para usuario Final : https://chatgpt.com/
        * Para el Desarrollador : https://platform.openai.com/docs/overview
    * Por ejemplo con Groq (Es Gratis)
        * Para el usuario Final : https://groq.com/
        * Para el Desarrollador : https://console.groq.com/home

1. Primero sacamos una API key de : https://console.groq.com/keys
> Guardar la api key en un lugar seguro una vez generada no se vuelve  a mostrar

2. Creamos un google colam nuevo en :  https://colab.google/
     
3. Copiamos el codigo para hacer una llama a groq de : https://console.groq.com/docs/overview
    
4. Instalamos en el google colab a la libreria groq
     
```python
!pip install groq
```
   
5. Ejecutamos la parte de llamar al LLM desde python
```python
from groq import Groq

api_key = input("Ingrese su Api Key de Groq")
prompt = input("Ingrese su prompt")

client = Groq(api_key=api_key)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="openai/gpt-oss-20b",
    stream=False,
)

print(chat_completion.choices[0].message.content)
```

## Aplicacion que usan Api key

> https://theresanaiforthat.com/

La gran mayoria de las aplicaciones de IA que fueron creciedo exponencialmente con el tiepo se dieron gracias a poder utilizar la API de algun servicio de IA como chatgpt que resuelve la complejidad de no tener que entrenar un modelo de IA desde cero. Incluso van a ver que muchas paginas utilizan modelos open source de lo que vamos a hablar en un instante...

## Ejemplo Black Mirror de uso de API Key : La pc que se programa a si misma

```python
from groq import Groq

prompt = "Programar en python un codigo que te muestre los numeros primos del 1 a un millon. Devolver directamente el codigo en python sin acotar nada mas en texto sin markdown"

client = Groq(api_key=api_key)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="openai/gpt-oss-20b",
    stream=False,
)

codigo_python = chat_completion.choices[0].message.content

##Borrar del la variable los caracteres ```python y ``` para poder ejecutar el codigo
codigo_python = codigo_python.replace("```python", "")
codigo_python = codigo_python.replace("```", "")


exec(codigo_python)

```

## Modelos Open Source

Los modelos Open source se suben a (es como el github pero de modelos open source):
> https://huggingface.co/     
Lo interesante de aca es ver los spaces:     
> https://huggingface.co/spaces
