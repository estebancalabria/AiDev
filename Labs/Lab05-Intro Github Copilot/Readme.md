# Laboratorio de GitHub Copilot 🔬

En este laboratorio, exploraremos las funcionalidades de GitHub Copilot en Visual Studio Code.

## Pasos 🚀

1. **Instalar GitHub Copilot**: Sigue las instrucciones de instalación en [GitHub Copilot](https://copilot.github.com/).

2. **Generar un proyecto de VSCode**: Abre Visual Studio Code y crea un nuevo proyecto o abre uno existente.

3. **Generar funciones en demo.js**:
   1. Utiliza `ctrl+i` para abrir el comando interactivo y genera las siguientes funciones en un archivo `demo.js`:
      ```javascript
      // Función mergeSort
      function mergeSort(array) {
          // Implementación
      }

      // Función fibonacci
      function fibonacci(n) {
          // Implementación
      }

      // Función quickSort
      function quickSort(array) {
          // Implementación
      }
      // Agrega tres funciones conocidas más...
      ```

   2. Añade un comentario de código para cada función.

   3. Utiliza el autocompletado dinámico para mejorar las funciones.

4. **Probar la función de documentación de código**: Utiliza el comando `/doc` sobre una función para generar documentación automáticamente.

5. **Probar generar pruebas unitarias**: Utiliza el comando `/test` sobre una función para generar pruebas unitarias automáticamente.

* Probar el comando /test solo que probablemente genere tests por consola
* Probar el comando /test jest que genere las pruebas unitarias con esa libreria de testing

6. **Probar arreglar código con errores**:
   ```javascript
   // Código con errores
   function sum(a, b) {
       return a + b
   }

Utiliza el comando /fix sobre este código para corregir los errores.

7. **Seleccionar un método y pedir explicación**:
   Utiliza el comando `/explain` sobre una función para solicitar una explicación detallada de su funcionamiento.

8. **Probar el GitHub Copilot Chat**: Interactúa con GitHub Copilot Chat para ver cómo responde a diferentes consultas o instrucciones.

9. **Probar el comando `@workspace /new`**:
   Utiliza el comando `@workspace /new` para crear un proyecto, por ejemplo, un proyecto de Node.js con Express.

## Conclusión 🎉

¡Has completado el laboratorio de GitHub Copilot! Experimenta más con las funcionalidades y explora cómo GitHub Copilot puede mejorar tu flujo de trabajo en el desarrollo de software.
