# Clase Ocho - 23 de abril del 2026

# Repaso

* Herrmientas
  * Scaffolding
    * Base44
    * Bolt.new
  * UX Design
    * Google Stich
* Open Source y Programacion
  * Usar Modelos de Hugging Face <<< Se explora en programacion de agentes con IA

# Codding Agents

* Son Agentes pago que generalmente funcionan desde el CLI
* Claude Code es el mas popular de los pagos
    * ---> En general a nivel empresarial es el mas utilizado por ser considerado mejor para cambios grandes
    * Muchos reconocen que claude code tiene la capacidad de trabajar mejor en forma autonoma y generar proyectos grandes con unas posc iteracciones
          * PELIGRO : Ojo con esto que despues el proyecto NO SE PUEDE MANTENER ---> Deuda Cognitiva
    * Ojo con esto de que "es el mejor", todos los codding agents sirven y depende mucho como los uses
        * Una buena guitarra en las manos de un mal guitarrista es peor que una mala guitarra en manos de un buen guitarrista
          * https://www.youtube.com/watch?v=kseSoguuiCs
        * Importa mucho mas el criterio de como los usamos que la herramienta

## Casos de uso para los codding agents

* Los coding agents NO SON PARA generar un proyecto desde cero enorme sin entenderlo   <<< Esto trajo problemas, deuda cognitiva
* Ha habido buenas experiancias para...
    * Proyectos de MIGRACION de una app legacy a una nueva tecnologia (php --> Java)
          * No te ahorra una planificacion previa de la migracion
    * Refactorings globales del proyecto
        * Un cambio de arquitectura
        * Reemplazos masivos inteligentes
            * Ej cambiar los console.log por llamadas a una libreria de looging inteligente
        * Analizar un proyecto existente y sugerir cambios globales para CLEAN CODE y Mejora de arquitectura
            * Despues implementarlos
    * Reemplazar una libreria por otra (donde tal vez tienen nombres de metodos distintos)
        * Ej: Pasar de fetch a axios
        * Convertir promesas de javascript a una libreria reactiva como rxjs
    * Generar automaticante pruebas unitarias para el codigo
        * Se pueden hacer las pruebas unitarias previamente (TDD) y despues que la IA las use de guia para programar
        * Equipos que tienen restriccion de cobertura de codigo por proyecto decirle al codding agents que programe todos los casos de prueba
    * Darle un pull request y que lo implemente
      * Revisando bien toto lo que hizo
     
## Tips para utilizar Codding Agents 

* Problema : Los codding agents pueden romper todo....
    * Solucion : es obligatorio usar GIT, cada cambio manejarlo en un branch, investigar la estrategia de branching git fl

<img width="775" height="507" alt="image" src="https://github.com/user-attachments/assets/b579a820-63d5-4225-a8e1-5b7ed63b0bdb" />

* Problema : Los coding agents gastan muchos tokens (se disparan los costos sobre todo si lo pagas)
    * Solucion : Si la conversacion va mal o es muy extensa, hacete un resumen de la conversacion con chatgpt y empeza un chat nuevo. Cada vez que va al servidor vuelve a mandar todos los mensajes de la conversacion y eso suele hacer que disparen los tokens.
    * Solucion : Utilizar algunas ayudas que reducen tokens como caveman: https://github.com/juliusbrussee/caveman

## Codign agents disponibles

* Los tres propietarios mas conocidos
    * Claude Code
        * El codigo de claude code se filtro en las redes
    * Codex (OpenAI)
    * Gemini Code
* Open Source
    * Aider (que usas con tu propia api key)
        * https://aider.chat/
        * Este se puede ejecutar con cualquier api key
        * Incluso podes bajar un modelo local, ejecutarlo con  ollama y trabajar todo localmente (seguridad y compiance) 
    * Ollama lanch claude (Clon de claude code de ollama)

## Hands on... vamos a probar      

* Installa ollama
  * Ir a https://ollama.com/
  * Ejecutar comando en powershell : irm https://ollama.com/install.ps1 | iex
