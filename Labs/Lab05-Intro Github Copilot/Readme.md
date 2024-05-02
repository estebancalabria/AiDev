# Laboratorio de GitHub Copilot 🔬

En este laboratorio, exploraremos las funcionalidades de GitHub Copilot en Visual Studio Code.

## Pasos 🚀

### Preparacion del entorno

1. **Instalar GitHub Copilot**: Sigue las instrucciones de instalación en [GitHub Copilot](https://copilot.github.com/).

2. **Generar un proyecto de VSCode**: Abre Visual Studio Code y crea un nuevo proyecto. Vamos a trabajar sobre un archivo CopilotDemo.js

### Probar la generacion de codigo:

   Vamos a utilizar la capacidad de generacion de codigo para generar unas funciones. Vamos a generar una funcion para el mergeSort, una funcion para convertir las claves de un json a minuscula. En general pueden probar generar la funcion que deseen. 
   Se pide probar
   * Utilizar generacion de codigo medante el autocompletado a medida que voy escribiendo
   * Utilizar comentarios para generacion de codigo (Comment Assisted Code Generation)
   * Utilizar el comando ctrl+i para generacion de codigo
     > Esta opcion es la mas adecuada para generar varias funciones de una o para generar una funcion con subfunciones
   * Utilizar el Github Copilot Chat para generar codigo
      
### Documentar con IA (/doc)

Vamos a seleccionar la IA para documentar las funciones generada automaticamente. Esto se puede hacer seleccionando el nombre de la funcion y ya sea con el Ctrl+I o el menu emergente de copilot con el boton derecho del mouse

Utiliza el comando `/doc` sobre una función para realizar esta tarea.

### Explicar codigo con IA (/explan)

Utiliza el comando `/explain` sobre una función para solicitar una explicación detallada de su funcionamiento.

Utilizar tanto el Ctr+i junto con el comando /explain para entender como funciona alguna de las funciones generadas. Probar lo mismo seleccionando el codigo de la funcion y utilizando el Github Copilot chat para ver como toma el contexto a partir del codigo seleccionado

### Probar generar pruebas unitarias (/test)

Es importante desconfiar del codigo generado con la IA. 
Con la IA se redefine la forma de utilizar las pruebas unitarias como herramienta
Utiliza el comando `/test` sobre una función para generar pruebas unitarias automáticamente.
* Probar el comando /test solo que probablemente genere tests por consola
* Probar el comando /test jest que genere las pruebas unitarias con esa libreria de testing

### Probar arreglar código con errores (/fix)

Se pide introducir un error sobre alguna de las funciones anteriorres y utiliza el comando /fix sobre este código para corregir los errores.

### Experimentar con  el GitHub Copilot Chat
Interactúa con GitHub Copilot Chat para ver cómo responde a diferentes consultas o instrucciones.
Verificar que podemos modificarle el contexto con el modificador de contexto @ con:
* @workspace para consultas del proyecto actual
* @vscode para consultas sobre el funcionamienteo de Visual Studio Code
* @terminal para consultas sobre el uso de la terminal y respuestas de comandos

## Extra :  Probar el comando `@workspace /new`**:
   Utiliza el comando `@workspace /new` para crear un proyecto, por ejemplo, un proyecto de Node.js con Express.

## Conclusión 🎉

¡Has completado el laboratorio de GitHub Copilot! Experimenta más con las funcionalidades y explora cómo GitHub Copilot puede mejorar tu flujo de trabajo en el desarrollo de software.
