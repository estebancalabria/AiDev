# Laboratorio: Aplicación de Patrones de Prompting con GitHub Copilot

¡Bienvenidos al emocionante mundo de la programación con GitHub Copilot! En este laboratorio, exploraremos cómo utilizar patrones de prompting para sacar el máximo provecho de esta herramienta increíble.

GitHub Copilot es una herramienta de inteligencia artificial que te ayuda a escribir código más rápido y con mayor precisión. Pero para aprovechar al máximo su potencial, necesitamos aprender a comunicarnos con ella de manera efectiva. 

## Requisitos

* Tener NodeJs instalado

## Resumen

En este laboratorio aplicaremos los siguientes patrones de prompting

* High Level Goal

## Tarea 1: Aplicar el patrón "High Level Goal"

El patrón "High Level Goal" consiste en proporcionar a Copilot una descripción general de lo que queremos lograr. De esta manera, podrá entender el contexto y generar código más acorde con nuestras necesidades.

Aplicaremos el patrón "High Level Goal" para generar una API de canciones en Node.js y Express.

1. Crea un nuevo archivo llamado `index.js`.
2. Agrega el siguiente comentario al principio del archivo:

```javascript
/* Comentario para Copilot (Patrón High Level Goals)
Quiero generar una API de canciones en Node.js y Express. Quiero las siguientes rutas:
- GET /api/cancion: Me devuelve una lista de canciones
- GET /api/cancion/:id: Me devuelve una canción específica
- POST /api/cancion: Me agrega una canción nueva

Esto va a funcionar en el puerto 3000, pero no quiero variables hardcodeadas, así que hay que usar constantes
*/
```

3. Despu\és del comentario, deja un espacio en blanco y GitHub Copilot debería sugerir automáticamente código relacionado con la configuración de una aplicación Express y las rutas solicitadas.

4. Sigue las sugerencias de Copilot y completa el código para implementar la API de canciones con las rutas especificadas.

5. Prueba tu aplicación localmente ejecutando


``` cmd
 npm init
```

6. Agrega las dependencias al package.json

```json
...
  "dependencies": {
    "express": "^4.17.1",
  },
```

7. Instala las dependencias y ejecuta la app

```cmd
  npm install

  node index.js 
```
6. Ve a la terminal. Luego, visita http://localhost:3000/api/cancion en tu navegador para ver la lista de canciones.