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

# Coddign Assistantas (Parte 1)


# Model Context Protocol
