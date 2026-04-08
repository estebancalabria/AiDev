# Clase Tres - 7 de Abril del 2026

# Repaso

* LLM
    * Uso de Modelos mediante API Key
    * Groq
    * Colab
* Herramienta
  * WebSim

# Novedades

* Ver el post del profe para el curso
     * https://www.instagram.com/p/DWzXGrulSNF/?img_index=1
* El coding Agent numero 1 para tareas complejas, claude code se filtro su codigo fuente
      * https://www.youtube.com/watch?v=9r2DwV5KwTc
  
# Herramienta

* Herramienta para el scaffolding de proyecto
  * https://replit.com/
* Puntaje
   * 9 / 10

> [!Note]
> A Experiencia personal el profe desarollo 3 webs con Replit

# Codding Assistants

* Hay varios Codding Assistants de todos los colores
   * https://www.instagram.com/p/C5q36wmRpMP/?img_index=1
* Hoy en dia esta bastante estandarizado el uso de Github Copilot desde que se hizo "gratuito"
* Formar de utilizar (son todos igual)
   * Guiando la generacion de codigo por comentarios
   * Usar el chat Inline
   * Usar la ventana de chat a la derecha

# Laboratorio

1. Vamos a loguearnos a Replit
2. Vamos a generar el prompt para el MVP (Minimun viable product) con ChatGPT

* Prompt a ChatGPT
```
Me contrataron para hacer el sistema de una unversidad "EducacionIT". Debo permitir la carga de alumnos, la carga de cursos, la inscripcion de alumnos a cursos. Quiero una aplicacion Web, Me gustaria que me escribas el prompt para un MVP centrandote en los requerimientos funcionales analizando lo que pueda faltar para que sea completo. En cuanto a los requerimientos tecnicos solo me interesa mencionar que se vea bien profesional, responsive
```
* Respuesta para el MVP

---
```markdown
Perfecto, voy a ir directo a lo que necesitás: un **prompt sólido para generar un MVP**, pero bien pensado (no humo), incluyendo lo que normalmente la gente se olvida en este tipo de sistemas.

---

## 🧠 Enfoque

Tu caso es básicamente un **Sistema de Gestión Académica básico (SIS)**.
Los 3 requisitos que mencionaste son el núcleo, pero **no alcanzan solos para un MVP usable**.

Te agrego lo mínimo necesario para que no quede “incompleto de verdad”.

---

## ⚠️ Cosas que faltan (clave)

Si no las incluís, el sistema queda flojo:

* Identificación única de alumnos (email o DNI)
* Estados (activo/inactivo)
* Cupos en cursos
* Evitar doble inscripción
* Listado y búsqueda
* Baja (soft delete o estado)
* Validaciones básicas
* Roles (aunque sea admin único)
* Fechas de cursada

---

## ✍️ PROMPT listo para usar

Copialo y usalo en ChatGPT / Claude / Cursor / Copilot:

---

**PROMPT:**

> Quiero que actúes como un arquitecto de software senior y desarrollador full stack.
> Necesito que diseñes e implementes un MVP de una aplicación web para la gestión académica de una institución educativa llamada “EducacionIT”.
>
> ## 🎯 Objetivo del sistema
>
> Permitir la gestión básica de:
>
> * Alumnos
> * Cursos
> * Inscripciones
>
> ## 🧩 Requerimientos funcionales
>
> ### 1. Gestión de Alumnos
>
> El sistema debe permitir:
>
> * Crear alumno
> * Editar alumno
> * Listar alumnos
> * Buscar alumnos
> * Dar de baja (soft delete o estado inactivo)
>
> Cada alumno debe tener:
>
> * ID único
> * Nombre
> * Apellido
> * Email (único)
> * Estado (activo/inactivo)
> * Fecha de registro
>
> ### 2. Gestión de Cursos
>
> El sistema debe permitir:
>
> * Crear curso
> * Editar curso
> * Listar cursos
> * Buscar cursos
> * Dar de baja (opcional)
>
> Cada curso debe tener:
>
> * ID único
> * Nombre del curso
> * Descripción
> * Cupo máximo
> * Fecha de inicio
> * Fecha de fin
> * Estado (activo/inactivo)
>
> ### 3. Inscripción de Alumnos a Cursos
>
> El sistema debe permitir:
>
> * Inscribir un alumno en un curso
> * Listar inscripciones
> * Ver inscripciones por alumno
> * Ver inscripciones por curso
> * Cancelar inscripción
>
> Reglas:
>
> * Un alumno no puede inscribirse dos veces al mismo curso
> * No se puede superar el cupo máximo del curso
> * Solo se pueden inscribir alumnos activos en cursos activos
>
> Cada inscripción debe tener:
>
> * ID único
> * Alumno
> * Curso
> * Fecha de inscripción
> * Estado (activa/cancelada)
>
> ### 4. Validaciones
>
> * Email único para alumnos
> * Campos obligatorios
> * Validación de fechas coherentes
> * Control de cupos
>
> ### 5. Interfaz de Usuario
>
> * Dashboard simple
> * Navegación clara entre módulos (Alumnos, Cursos, Inscripciones)
> * Formularios intuitivos
> * Tablas con listado y búsqueda
>
> ## 🎨 Requerimientos no funcionales
>
> * Diseño profesional
> * Responsive (mobile + desktop)
> * UI moderna y limpia
> * Buena experiencia de usuario (UX)
>
> ## ⚙️ Entregables esperados
>
> * Estructura del proyecto
> * Modelos de datos
> * API endpoints
> * Componentes principales del frontend
> * Flujo de navegación
> * Código base funcional del MVP
>
> Priorizá simplicidad, claridad y buenas prácticas. No sobreingenierizar.

---

## 💡 Bonus (esto te sube el nivel profesional)

Si querés hacerlo más “vendible” o más serio, podés agregar al prompt:

* Autenticación simple (admin login)
* Exportación a CSV
* Paginación en listados

---

## 🧠 Opinión honesta (importante)

Este prompt ya está en nivel **semi-profesional real**, no académico.

Con esto podés:

* Generar código usable
* Mostrarlo como demo
* Escalarlo después

Si querés, en el siguiente paso te armo:
👉 arquitectura sugerida (Angular + .NET / Node / etc)
👉 o directamente el código base listo para correr

Decime cómo lo querés encarar.

```
---

> [!NOTE]
> En este caso tome el prompt como viene pero en un caso practico iteraria sobre el mismo



3. Vamos a usar la parte del prompt para pasarla a Replit
4. Generar la app con Replit
   * Esto es lo que genere : https://attached-assets--emotionalwellne.replit.app/

5. Iterar sobre la app pidiendole los cambios obvios

> [!NOTE]
> Ver el archivo repllit.md que habla de la arquitectura de la app


6. Loguearnos en Github si no esta logueados
7. Configurar Integracion con Github
8. Subir proyecto a Github
   
> Lo subio en https://github.com/estebancalabria/84807-replit-demo/
> Ojo que tal vez lo borre

9. Bajar localmente y abrir proyecto

> [!WARN]
> En este momento tengo un proyecto que genero la IA y no entiendo de todo. Tengo Deuda Cognitiva

```cmd
git clone https://github.com/estebancalabria/84807-replit-demo/
cd 84807-replit-demo
code .
```
10. Instalar la extension de GithubCopilot en VSCode
11. Entender el proyecto con la IA

```
De que es el proyecto? Tiene los scripts de creacion de la base de datos? Por donde arranca? En que tecnologia esta? Cual es el componente principal?
```

12. Ejecutarlo localmente

```
Esto esta en el Replit.MD sino se lo puedo preguntar a la IA
```

14. Ajustar el proyecto con el codding assistant (cambios puntuales)


* Antes
   * Soy Programador/ Dev
* Ahora
   * Disenio sistemas y orquesto IA 

# Proxima Clase

* MAs de codding assistants
* IDes potenciadas con IA
* Otra herramienta
