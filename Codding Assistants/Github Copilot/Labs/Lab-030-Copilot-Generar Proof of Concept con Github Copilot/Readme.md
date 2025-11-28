# Laboratorio: ExpenseTracker 💼💰

En este laboratorio, vamos a crear un ExpenseTracker utilizando LiveServer y Node.js. ¡Prepárate para sumergirte en el mundo del desarrollo web!

## Requerimientos 📋

- [x] Instalar LiveServer
- [x] Instalar Node.js

## Pasos del Laboratorio 🛠️

1. **Generar la Estructura del Proyecto**
2. **Crear HTML con GitHub Copilot**
3. **Instalar Bootstrap con GitHub Copilot**
4. **Construir Navbar con Comentarios HTML y Bootstrap**
5. **Agregar Layout Grid con GitHub Copilot Chat**
6. **Agregar Columnas de Gastos para Cada Mes con Copilot**
7. **Agregar Tabs para Gastos y Gráfico con Copilot**
8. **Incluir Chart.js para el Gráfico y Agregarlo**
9. **(Opcional) Agregar un backend con github copilot**

## Detalle Pasos del Laboratorio 🛠️

### Secuencia de Pasos para Crear un Proyecto con GitHub Copilot y Live Server 🛠️
1.  **Crear una carpeta con  `index.html` y `index.js`**
   

2. **Verificar Archivos Creados:**
   - Escribe `dir` para asegurarte de que los archivos hayan sido creados.

3. **Abrir Carpeta del Proyecto:**
   - Abre la carpeta del proyecto "Tracker de Gastos".
   - Haz clic en "Open Folder" para seleccionarla.
   - Confirma si aparece alguna notificación y confía en los autores si es necesario.

4. **Trabajar en el Documento HTML:**
   - Abre el archivo `index.html`.
   - Utiliza comentarios guiados para que Copilot escriba código desde cero.
   - Escribe un comentario con la instrucción para generar un documento HTML básico.
     ```
     <!-- Generar un documento HTML básico -->
     ```
   - Espera a que Copilot genere el código y acepta las sugerencias con `Tab` y `Enter`.
   - Continúa agregando elementos según sea necesario para completar el documento HTML.
   - Verifica si el título se ha actualizado a "income expense tracker".

5. **Instalar Bootstrap CDN:**
   - Dentro de la etiqueta `<head>` del documento HTML, agrega un comentario para el CDN de Bootstrap.
     ```
     <!-- Última versión de Bootstrap CDN -->
     ```
   - Acepta la sugerencia de Copilot para obtener el enlace del CDN.

6. **Agregar JavaScript de Bootstrap:**
   - Agrega otro comentario para obtener las capacidades de JavaScript de Bootstrap.
     ```
     <!-- Último bundle de JavaScript de Bootstrap de JS Deliver -->
     ```
   - Acepta la sugerencia de Copilot para obtener el script de JavaScript de Bootstrap.

7. **Guardar y Verificar:**
   - Guarda los cambios en el archivo presionando `Ctrl + S`.
   - Verifica que el documento HTML se esté actualizando correctamente.

¡Listo para comenzar a construir tu proyecto! Recuerda confiar en Copilot para sugerencias y completar tareas.

###  Secuencia de Pasos para Construir un Navbar con GitHub Copilot 🚀

En esta tarea, vamos a construir un Navbar para nuestra aplicación utilizando comentarios guiados por Copilot. Tenemos dos objetivos para esta tarea:

1. **Generar un Navbar con Comentarios:**
   - Elimina el contenido genérico del cuerpo del documento.
   - Agrega un comentario para generar un Navbar utilizando Bootstrap.
     ```html
     <!-- Navbar de Bootstrap -->
     ```
   - Acepta la sugerencia de Copilot para generar el Navbar.
   - Verifica el resultado yendo al navegador utilizando Live Server.

2. **Modificar el Navbar utilizando Copilot Chat:**
   - Destaca el código del Navbar en el archivo HTML.
   - Haz clic en el ícono de chat en el panel izquierdo.
   - Escribe una solicitud para cambiar el color de fondo del Navbar.
     ```
     Cambiar el color de fondo del Navbar a azul primario.
     ```
   - Acepta la sugerencia de Copilot y verifica el resultado en el navegador.

### Secuencia de Pasos para Construir el Diseño Principal con GitHub Copilot 🛠️

Esta tarea vamos a ir un paso más allá y comenzaremos a diseñar el diseño principal. Lo haremos utilizando la función de autocompletado de GitHub Copilot.

1. **Generar el Diseño Principal con Autocompletado de Copilot:**
   - Ubícate debajo del Navbar en el archivo HTML.
   - Agrega un comentario largo con una descripción detallada de lo que queremos construir, incluyendo una cuadrícula Bootstrap.
     ```html
     <!-- Crear una cuadrícula Bootstrap para el diseño principal -->
     ```
   - Acepta la sugerencia de Copilot para generar la cuadrícula.
   - Revisa el código generado y realiza los ajustes necesarios según las necesidades del proyecto.

2. **Realizar Ajustes y Personalizaciones:**
   - Si es necesario, ajusta el número de filas y columnas según las necesidades del diseño.
   - Verifica que cada celda de la cuadrícula contenga una etiqueta para el nombre del mes, seguido de dos campos de entrada para ingresos y gastos.
   - Asegúrate de que los campos de entrada estén etiquetados correctamente y se ajusten al diseño deseado.

### Secuencia de Pasos para  Tabs para Gastos y Gráfico con Copilot 🔄

 En esta tarea, vamos a habilitar el cambio de pestañas entre nuestro formulario y nuestro gráfico que vendrá a continuación. Vamos a aprovechar las capacidades de Copilot para introducir una función de cambio de pestañas. También crearemos un gráfico de muestra utilizando Copilot en index.js. Luego moveremos los datos del formulario a la pestaña del formulario que crearemos. ¡Comencemos!

1. **Crear Pestañas Bootstrap:**
   - Ubícate debajo de la barra de navegación en el archivo HTML.
   - Agrega un comentario corto y simple para indicar la creación de dos pestañas Bootstrap, una para datos y otra para gráficos.
     ```html
     <!-- Agregar dos pestañas Bootstrap, una para datos y otra para gráficos -->
     ```

### **Secuencia de Pasos para Integrar un Gráfico en el ExpenseTracker 📊**
   - Integrar Chart.js para crear el gráfico y mostrarlo en la pestaña correspondiente.

En esta tarea, vamos a crear un gráfico utilizando datos reales y, por lo tanto, vamos a utilizar Copilot para integrar un gráfico en nuestro sitio web utilizando datos reales. Vamos a enlazar los puntos de datos con las etiquetas respectivas en el gráfico, y luego vamos a refactorizar las funciones principales de nuestro JavaScript con Copilot Chat. ¡Comencemos!

* **Obtener los valores de ingreso para cada mes:**
   ```javascript
   // Obtener el valor de entrada para el ID de ingresos de enero
   const eneroIngresos = document.getElementById('IngresosEnero').value;
   ```

* **Obtener los valores de gastos para cada mes:**
   ```javascript
   // Obtener el valor de entrada para el ID de gastos de enero
   const eneroGastos = document.getElementById('GastosEnero').value;
   ```

* **Refactorizar los valores de ingresos y gastos a funciones:**
   ```javascript
   // refactorizar a una función llamada obtenerValoresIngresos que devuelva los valores de ingresos como un array
   function obtenerValoresIngresos() {
     return [
       eneroIngresos,
       febreroIngresos,
       marzoIngresos,
       abrilIngresos
     ];
   }

   // refactorizar a una función llamada obtenerValoresGastos que devuelva los valores de gastos como un array
   function obtenerValoresGastos() {
     return [
       eneroGastos,
       febreroGastos,
       marzoGastos,
       abrilGastos
     ];
   }
   ```

* **Actualizar los valores del gráfico con los datos de ingresos y gastos:**
   ```javascript
   // crear un controlador de clic para el botón de gráfico
   document.getElementById('pestañaGráfico').addEventListener('clic', () => {
     // actualizar los datos del gráfico con los valores de ingresos y gastos
     miGráfico.datos.conjuntosDatos[0].datos = obtenerValoresIngresos();
     miGráfico.datos.conjuntosDatos[1].datos = obtenerValoresGastos();
     // actualizar el gráfico
     miGráfico.actualizar();
   });
   ```

¡Ahora estás listo para integrar un gráfico en tu ExpenseTracker utilizando datos reales! Recuerda ajustar los IDs y las variables según corresponda en tu proyecto.


## ¡A Programar! 💻

¡Es hora de poner manos a la obra y comenzar a desarrollar nuestro ExpenseTracker! Recuerda que cualquier duda o pregunta que tengas, ¡aquí estoy para ayudarte!
