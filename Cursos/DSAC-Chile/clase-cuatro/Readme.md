# Clase Cuatro - 24 de Septiembre del 2025

## Repaso

* Replit
* Base44
* Websim
* System Design
    * DiagramGPT
    * Mermaid
    * Structurizr
* Documentar
    * CodeViz

## Sigamos con los pesos pesados del Scaffolding

Lovable
> https://lovable.dev/

Caracteristicas:
* Integracion con Supabase
* Integracion con Github

'''prompt
Crea un MVP (minimum viable product) de una app de preguntas y respuestas con las siguientes características: el usuario puede seleccionar una categoría y recibir un cuestionario de opción múltiple. La aplicación debe conectarse a un backend que actualmente sirve las preguntas desde un archivo JSON, con la arquitectura preparada para migrar a una base de datos en el futuro. El frontend debe ser interactivo y responsivo, mostrando los resultados al finalizar el cuestionario, y debe incluir navegación clara entre categorías y preguntas. El código generado debe ser limpio, modular y listo para escalar, utilizando buenas prácticas de desarrollo.
'''

Hicimmos este proyecto

* https://trivia-trail-start.lovable.app
* https://quiza-futbolero.lovable.app/

Puntaje 10/10


## Codding Assisntants

Hay Varios Codding Assistants
* Github Copilot
* Tabnine
* Cody
* https://www.instagram.com/p/C5q36wmRpMP/?img_index=1
* Continue : Lo podes conectar a un LLM local por ejemplo que corre en LMStudio (https://lmstudio.ai/)

### Github Copilot

Descargar en VScode desde :
> https://marketplace.visualstudio.com/items?itemName=GitHub.copilot

* Generacion de Codigo
   * Autocompletado inteligente inlinile (No tengo que hacer nada solo programar)
   * Autompletado basado en comentarios
   * Autocompletado utilizando el chat Inline (Ctrl+I)
* Modificacion de codigo existente
   * Mas facil es con el chat Inline seleccionando el codigo a modificar
* Documentar una funcion
   * Con el menu contextual o con el chat Inline
* Explicar codigo existente

- #### Patrones de uso de Github Copilot : High Level Goal

Consiste en poner un comentario al principio del archivo explicando cual es el objeto de alto nivel de ese archivo

```javascript
/*
Quiero una api en nodejs y express que maneje una todo list 
Que tenga un enpoint para listar las tareas pendientes
Cada tarea tiene un id y un estado done
Quiero obtener la informacion de una tarea espefecifica
Quiero poder agregar tareas nuevas
Quiero poder eliminar tareas segun su id
Tambien quiero poder modificar tareas
Las tareas las tengo en memoria en un json
*/
```

- #### Patrones de uso de Github Copilot : Generacion de archivo de reglas

* Generas un archivo rules.txt donde definis los estandares de codigicacion
* En la ide cursor ya viene preparada para que vos le pongas el archivo cursorrules.txt
      * https://github.com/PatrickJS/awesome-cursorrules/tree/main/rules/medusa-cursorrules

Mas info de uso de Github Copilot : https://learn.microsoft.com/es-es/training/modules/introduction-to-github-copilot/

### VER

Vamos Chile : https://codegpt.co/
Noticia : https://dflive.cl/codegpt-la-plataforma-para-programadores-que-creo-un-chileno/
