# Laboratorio: Usando Gradio con Google Colab 🚀

## Introducción 📝

En este laboratorio, aprenderemos a usar [Gradio](https://gradio.app) para crear interfaces de usuario interactivas para tus modelos de machine learning directamente en Google Colab. Gradio es una herramienta poderosa y fácil de usar que permite a los usuarios interactuar con tus modelos a través de una interfaz web amigable.

## Requisitos 📋

- Cuenta de Google para acceder a Google Colab
- Conocimientos básicos de Python

## Paso 1: Configurar el Entorno 🔧

Primero, asegúrate de tener Google Colab abierto. Puedes acceder a Google Colab [aquí](https://colab.research.google.com).

Luego, instala Gradio ejecutando el siguiente comando en una celda de código:

```python
!pip install gradio
```
## Paso 2 : Importar Bibliotecas 📚

Importa las bibliotecas necesarias para este laboratorio. Vamos a usar Gradio y algunas bibliotecas básicas de Python.

```python
import gradio as gr
```

## Paso 3: Definir una Función Simple 💡
Vamos a crear una función simple que tomará una entrada de texto y devolverá el texto en mayúsculas.

```python
def texto_a_mayusculas(texto):
    return texto.upper()
```

## Paso 4: Crear la Interfaz con Gradio 🌟

Usa Gradio para crear una interfaz para la función texto_a_mayusculas.

```python
interfaz = gr.Interface(fn=texto_a_mayusculas, 
                        inputs="text", 
                        outputs="text", 
                        title="Convertidor de Texto a Mayúsculas",
                        description="Introduce un texto y se convertirá a mayúsculas.")
```

## Paso 5: Lanzar la Interfaz 🚀

Finalmente, lanza la interfaz en Google Colab.

```python
interfaz.launch()
```

## Código Completo 🧩

Aquí tienes el código completo para que lo copies y pegues en Google Colab:

```python
# Instalar Gradio
!pip install gradio

# Importar Gradio
import gradio as gr

# Definir una función simple
def texto_a_mayusculas(texto):
    return texto.upper()

# Crear la interfaz con Gradio
interfaz = gr.Interface(fn=texto_a_mayusculas, 
                        inputs="text", 
                        outputs="text", 
                        title="Convertidor de Texto a Mayúsculas",
                        description="Introduce un texto y se convertirá a mayúsculas.")

# Lanzar la interfaz
interfaz.launch()
```

## Conclusión 🎉

¡Felicidades! Has aprendido a usar Gradio con Google Colab para crear una interfaz de usuario interactiva. Puedes experimentar con diferentes funciones y tipos de entrada/salida que ofrece Gradio.

¡Sigue explorando y divirtiéndote con tus proyectos de machine learning! 🚀
