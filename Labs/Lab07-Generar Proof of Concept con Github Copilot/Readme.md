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

### **Construir Navbar con Comentarios HTML y Bootstrap**
   - Crear una barra de navegación con comentarios HTML y Bootstrap.

### **Agregar Layout Grid con GitHub Copilot Chat**
   - Implementar un sistema de grid utilizando GitHub Copilot Chat.

### **Agregar Columnas de Gastos para Cada Mes con Copilot**
   - Añadir columnas para los gastos de cada mes utilizando GitHub Copilot.

### **Agregar Tabs para Gastos y Gráfico con Copilot**
   - Incluir pestañas para visualizar los gastos y un gráfico generados con GitHub Copilot.

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
