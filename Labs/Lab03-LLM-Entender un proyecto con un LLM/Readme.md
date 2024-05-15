## Laboratorio: Uso de Inteligencia Artificial para entender un proyecto con un LLM

### Introducción:

En este laboratorio, exploraremos cómo utilizar la inteligencia artificial (IA) para abordar tareas comunes en el desarrollo de software. Específicamente, nos centraremos en la automatización de la tarea de concatenar archivos de un proyecto en uno solo, agregando información contextual sobre la procedencia de cada fragmento de código.

### Paso 1: Generar un script con IA para concatenar los archivos del proyecto en uno solo

En este paso, utilizaremos inteligencia artificial para crear un script que nos ayude a concatenar todos los archivos de un proyecto en uno solo, con la capacidad de agregar una línea antes de cada fragmento que identifique el archivo del que proviene.

**Ejemplo de prompt utilizado para generar el script:**

"Quiero hacer un script que, estando ubicado en una carpeta, tome todos los archivos .java y .xml de esa carpeta y sus subcarpetas, y genere un único archivo con el contenido de todos los archivos. El archivo de salida se llamará 'proyecto.txt'. Antes de poner el contenido de cada archivo, quiero que agregue una línea de la forma '//[nombre del archivo]' que indique a qué archivo corresponde el contenido que sigue a continuación."

### Paso 2: Interacción con el modelo de lenguaje

En este paso, utilizaremos una plataforma de inteligencia artificial, como Claude (o ChatGPT), para generar el script utilizando el prompt proporcionado anteriormente. Luego, proporcionaremos el archivo resultante al modelo para hacerle preguntas y explorar su funcionamiento.

### Paso 3: Preguntas para hacer al modelo de lenguaje sobre el proyecto

Para comprender mejor el proyecto y evaluar la capacidad del modelo de lenguaje, podríamos hacer las siguientes preguntas:

1. **¿Puedes explicar el propósito general del proyecto?**
   - Esta pregunta ayuda a verificar si el modelo comprende el objetivo principal del proyecto y su contexto.

2. **¿Qué tecnologías se utilizan en el proyecto y cómo se aplican?**
   - Aquí buscamos obtener información sobre las tecnologías específicas empleadas en el proyecto y cómo se utilizan, como el manejo de archivos .java y .xml en el ejemplo proporcionado.

3. **¿Qué otras preguntas le harías al modelo de lenguaje sobre el proyecto?**
   - Esta pregunta busca conocer las áreas adicionales que podrían explorarse para comprender mejor el proyecto y evaluar la capacidad del modelo para proporcionar respuestas detalladas y relevantes.

Estas preguntas ayudarán al desarrollador a obtener información detallada sobre el proyecto y evaluar la comprensión y capacidad del modelo de lenguaje para proporcionar respuestas relevantes y precisas.
