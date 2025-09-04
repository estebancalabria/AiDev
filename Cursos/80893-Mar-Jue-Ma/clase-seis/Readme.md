# Clases Seis - 4 de Septiembre del 2025

> Clase que viene ver Bolt.new

## Herramientas para Aplicaciones Interactivas con HTML y Javascript

> https://websim.com/

* Genera aplicaciones interactivas (tipo juevos)
* Genera en HTML y Javascript
* Especializado para cosas con Graficos y animaciones
* Los que hicieron esta herramienta le cargaaron a la ia instrucciones con librerias de animacion y graficos javascript como Three.js
      * https://threejs.org/
* Es para hacer aplicaciones mas "divertidas" no tanto empresariales

Prompt mejorado con ChatGPT:
```
Un juego arcade de naves espaciales estilo retro, inspirado en el clásico 1942, pero con un giro divertido:

La nave del jugador y las naves enemigas son emojis.

El jugador controla su nave con las flechas del teclado (arriba, abajo, izquierda, derecha).

Se dispara con la barra espaciadora.

Debe haber una pantalla inicial con el título del juego y un botón de “Nuevo Juego” para comenzar.

Al iniciar, el jugador aparece en la parte inferior de la pantalla y los enemigos descienden desde arriba.

Cada disparo que acierta destruye al enemigo (explosión o efecto visual con emojis).

Objetivo: sobrevivir y acumular puntos destruyendo enemigos.
```

Generamos con el modelo KimiK2 (Open Source) (Con gemini y Gpt-5 no andubo)

> https://websim.com/@silentmist45126041/emoji-space-shooter-1942-retro-style

## IA y Open Source

### Para usar modelos Open Source Localmente

* LMStudio (https://lmstudio.ai/) : Aplicacion de Escritorio
* Ollama (https://ollama.com/) : Aplcacion de Consola

> Es importante saber como ejecutar un llm local para conectar un codding assistant con mi llm local si las politicas de segurdad de la empresa no permiten utilizar un codding asistant con un servidor externo por un tema de privacidad para no sacar los fuentes de la empresa a Internet

## Repo para modelos Open Source

Hugging Face
* https://huggingface.co/
* Es como un github de modelos Open Source
* Crearse una cuenta. Vale la pena

Tiene 3 secciones
* Repositorio de Modelos
* Repositorio de Datos para entrenar modelos
* Spaces donde puedo probar modelos : https://huggingface.co/spaces

Elegir un Space y probarlo

Si vemos https://theresanaiforthat.com/ hay muchsa herramientas que toman un space y lo llevan a otro entorno con una interfaz grafica con un lavado de cara y lo venden. Hay como una veta comercial que vi en aprovechar los modelos Open Source

## Herramientas para base de datos

>  https://database.build/

Esta herramienta me permtie
* Generar Esquemas de Bases de datos a partir de lenguaje natural
* Visualizar los esquemas de la base de datos
* Crear una base de datos de prueba como soporte a toda la operatoria
     * Crea una base de datos postgres por detras
     * No es como chatgpt que crea las consultas nomas sino que te permite jugar con la base de datos
     * Le podes poner datos de prueba para probar
* Generar consultas SQL a partir de lenguaje natural
* Probar las consultas con la herramienta sobre la base de datos real
* Optimizar consulta
* Si tenes una base de datos ya creada poder cargarle los scrips de creacion
* Permite hacer deploy de tu base de datos a Supabase
* Te permite contectarte con un cliente de Postgres a la base con la que estas trabajando

Pasos para probar herramienta: 
1. Crear el esquema
```prompt
Crear el esquema para una base de datos de una libreria
```
2. Modificar todo el esquema
```prompt
Agregale a todas la tablas un campo timestamp para la ultima modificacion
```
3. Pedirle que le cargue datos de ejemplo a toda la base de datos para probar
```prompt
Generame datos de prueba para todas las tablas
```
4. Podemos probar ejecutando un SQL : select * from books
5. Probar Generar SQL con lenguaje natural
   * Dame los libros que no hayan sido prestados
   * Dame un ranking donde se vea autor, libros_publicados donde se vea el top 5 de autores
