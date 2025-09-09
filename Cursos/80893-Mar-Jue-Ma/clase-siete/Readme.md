# Clase Siete - 9 de Septiembre de 2025

## Herramientas Scaffolding - Bolt.new

> https://bolt.new/

* Permite una buena integracion co figma
* Integracion con Supabase, Netlify y Figma
* Tiene un sandbox donde se ejecuta el proyecto y una terminal para ver los resultados
* Por defecto utiliza React con TypeScript
* Permite publicar el proyecto en one-click en un hosting propio o en Netlify


## Herramientas para documentar proyectos

* Extesion VSCode CodeWiz : https://marketplace.visualstudio.com/items?itemName=CodeViz.codeviz
      * Funciona con proyectos locales en tu propia pc
* DeepWiki
      * Genera toda la documentacion de un repositorio de github
      * Funciona con proyectos que estan en github
      * Cambio https://github.com/estebancalabria/turnos-flexi por https://deepwiki.com/estebancalabria/turnos-flexi

##  Coddign Assistants

En este caso estamos viendo el uso de codding assistant como si hicera "pair programming" para cosas concretas y chicas donde trabajamos en unidades acotadas de codigo (funciones, archivos) (Luego vamos a ver el concepto de Vibe Coding cuando queremos trabajar con todo el Code Base (la base de nuestro codigo) al mismo tiempo

* Instalar extension Github Copilot
    * https://marketplace.visualstudio.com/items?itemName=GitHub.copilot
 
**Generacion de Codigo : Generacion de Funciones**
* Autocompletado Inteligente inline : Vas escribiendo condigo y lo autocompleta 
* Completado por comentarios
* Utilizando el chat Inline (Ctrl+I)
* Utilizando el chat copilot

**Otros usos** 
* Modificacion de Codigo existente : Seleccionar una funcion con Ctrl+i y pedirle a la IA
* Documentar codigo : Ya se desde el menu contextual o con el copilto chat
que la mejore o la corrija
  * Vimos como por ejemplo podemos generar en markdown la documentacion de un archivo

- ### PAtrones de Prompting para Codding Assistants : High Level Goal

Impllica comenzar el archivo con un comentario de alto nivel con todo lo que queremos que incluya el archivo y despues dejar que el codding assistant vaya completando el codigo ejemplo

```prompt
/*
Quiero una api en nodejs y express que maneje eventos y venta de entradas
Quiero un endpoint para mostrar los eventos dispoibles con su nombre, fecha y precio
Quiero otro endoiunt para ver la disponibilidad de entradas de un evento en particular
Quiero un endpoint para reservar una entrada y actualiza la cantidad de disponiblesQuiero un json grande con los eventos al princpio que despues lo reemplazare por una base de datos
*/
...
```

y despues veo como copilot hace su magia
 
