# Clase Dos - 17 de Diciembre del 2025

# Repaso

* Large Language Models
    * Claude
        * Tiene Artefactos con Previsualizacion
        * Tradicionalmente los modelos de Claude siempre fueron los mejores para programar
        * Hicimos un pongo buenisimo
    * Qwen
        * Similar a ChatGPT
        * No te quedas facil sin tokens, podes pegar fragmentos de coigo largos
    * Groq
        * Lo usamos para las API key
        * Motor de Inferencia SUPER RAPIDO que hostea modelos Open source
* Utiliar Un llm mediante una API Key
    * Usamos el google colab
    * Programar un Agente
    * Ejemplo con una imteraz gradio
* Herramientas
    * WebSim
        * Para generar cosas interactivas
        * Es sus prompts internos usa librerias para graficos en en 3d como threejs
                    * https://threejs.org/  
* Hugging Face 

# Large Language Models

- ## Saber que modelo de lenguaje es bueno para programar

> https://lmarena.ai/

# Herramienta

- ## Para el desarrollo de Interfaces : V0.chat

> [https://v0.app/](https://v0.app/ref/KKXJL4)

* Soportado por la gente de Vercell : https://www.instagram.com/p/DOKQgB3jpFQ/?img_index=2
* Genera componentes tipo TXS (typescript) tipo React
* Tiene algunos templates de ejemplo : https://v0.app/templates
* Tiene disenios por defecto para incluir en el prompt : https://v0.app/chat/design-systems
* El codigo generado
    * Se puede descargar como ZIP
    * Se puede subir a Github
    * Se puede desplegar en Vercel

* Prompt Utilizado (mejorado con ChatGPT)
```
Generá un componente de Login con un diseño moderno, limpio y profesional, siguiendo buenas prácticas de UX/UI.
Debe cumplir con los siguientes requisitos:

Contenedor centrado vertical y horizontalmente en la pantalla.

Diseño responsive, adaptándose correctamente a desktop, tablet y mobile.

Formulario de login estándar con:

Campo de email/usuario

Campo de contraseña

Botón principal de “Iniciar sesión”

Sección clara de login social con botones diferenciados para:

Google

Facebook

Microsoft
(cada botón con su identidad visual reconocible)

Un link visible y accesible a la página de registro (por ejemplo: “¿No tenés cuenta? Registrate”).

Jerarquía visual clara, buen espaciado, tipografía legible y estados visuales para hover/focus.

Apariencia lista para producción, sin estilos experimentales ni elementos decorativos innecesarios.
```

* Tips para mejorar prompts
  * Escribir el prompt y mejorarlo con CharGPT ( o cualquier LLM)
  * TIP. Incluir en el mejorador de prompts la idea de "Hacer preguntas DE A UNA para completar lo que puede estar faltando"
  * Prompt original para mejorar

```
Voy a generar un componente con la herramienta v0. Tengo este prompt : "Generame un componente de login en el estiloque incluya botones para login con google, facebook y microsoft. Que tenga un link a la pagina de registro. Quesea estandar. Responsive. Que este centrado tanto vertical como horizontalmente." te pido que me lo mejores para que sea mas preciso. Devolveme el prompt mejorado sin acotar nada mas. No hace falta definir tecnologias.
```

* Puntaje : 9.5 / 10

# Novedades

> https://pyscript.com/

* Hubo una idea de reemplazar javascript por python en el navegador

# Coddign Assistantas (Parte 1)

* Hay varios codding asssitants para elegir
   * Lista :  https://www.instagram.com/p/C5q36wmRpMP/?img_index=1
   * Se instalan como extensiones de VScode (u otras IDE)
   * Esta medio estandarizado hoy el uso del Github Copilot porque MS lo hizo gratuito

- ## Github Copilot

* Instalar extension desde el Market Place
* Las 4 maneras para utilizar la extension son
   * Autocompletado mientras voy escribiendo
   * Completar comentario
         * Pongo un comentario, me va sugiriendo el codigo (ghost code) y lo voy aceptando con el tab
         * Ejemplo : "# Funcion que calcula el promedio de valores de un array"
   * Chat Iniline (ctrl+i)
         * Selecciono el codigo y pongo " Agregarme type hint al codigo anteior y checkea que sean todos numeros"
  * Ventana de Chat tipo ChatGPT (Ctrl+shift+i)
     * Modo preguntar
     * Modo Editar
     * Modo Planificar
     * Modo Agente para trabajar con toda tu base de codigo  << Generalmente se usa
        * Ejemplo : "Generame una api que reciba en un endpoint una lista de numeros separados por coma por GET y devuelva un json con el promedio usando la funcion calcular_promedio que existe."
    
* Primero generamos esta funcion con el comentario y el chat Inline
```python
from typing import Union

# Funcion que calcula el promedio de valores de un array
def calcular_promedio(valores: list[Union[int, float]]) -> float:
    if not valores:
        return 0
    
    # Verificar que todos los elementos sean números
    if not all(isinstance(x, (int, float)) and not isinstance(x, bool) for x in valores):
        raise TypeError("Todos los elementos deben ser números (int o float)")
    
    return sum(valores) / len(valores)
```

* Luego con el chat en modo agente pusimos "Generame una api que reciba en un endpoint una lista de numeros separados por coma por GET y devuelva un json con el promedio usando la funcion calcular_promedio que existe." y me devolvio

```python
from typing import Union
from flask import Flask, request, jsonify

app = Flask(__name__)

# Funcion que calcula el promedio de valores de un array
def calcular_promedio(valores: list[Union[int, float]]) -> float:
    if not valores:
        return 0
    
    # Verificar que todos los elementos sean números
    if not all(isinstance(x, (int, float)) and not isinstance(x, bool) for x in valores):
        raise TypeError("Todos los elementos deben ser números (int o float)")
    
    return sum(valores) / len(valores)

@app.route('/promedio', methods=['GET'])
def obtener_promedio():
    """
    Endpoint que recibe una lista de números separados por coma
    y devuelve el promedio en formato JSON.
    Ejemplo: /promedio?numeros=1,2,3,4,5
    """
    try:
        # Obtener el parámetro 'numeros' de la query string
        numeros_str = request.args.get('numeros', '')
        
        if not numeros_str:
            return jsonify({
                'error': 'Debe proporcionar el parámetro "numeros"'
            }), 400
        
        # Convertir el string de números separados por coma a lista de floats
        numeros = [float(num.strip()) for num in numeros_str.split(',')]
        
        # Calcular el promedio usando la función existente
        promedio = calcular_promedio(numeros)
        
        # Retornar el resultado en formato JSON
        return jsonify({
            'numeros': numeros,
            'promedio': promedio
        }), 200
        
    except ValueError:
        return jsonify({
            'error': 'Todos los valores deben ser números válidos'
        }), 400
    except TypeError as e:
        return jsonify({
            'error': str(e)
        }), 400
    except Exception as e:
        return jsonify({
            'error': f'Error inesperado: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

* Lo ejecute con :

```
python server.py
```

* Accedi en el navegador a:

```
http://127.0.0.1:5000/promedio?numeros=1,2,3,4,5
```

* Me devolvio

```json
{
  "numeros": [
    1.0,
    2.0,
    3.0,
    4.0,
    5.0
  ],
  "promedio": 3.0
}
```

# Model Context Protocol
