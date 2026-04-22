# Clase Siete - 21 de Abril del 2023

# Repaso

* Herramientas
  * Lovable
    * Conectamos con Github
* Entornos de Desarrollo
  * Cursor

# Herramientas de Scaffolding

* Lovable
* Replit
* Base44
* Bolt.New

## Base 44

> https://base44.com/

* Aspectos a considerar
  * Funciona muy bien con Figma
  * Interfaces graficas muy alineadas con Ux
  * 

* Prompt que utilizamos

```

### 🚀 Prompt MVP – Kanban Scrum (Frontend only)

Construir una aplicación web tipo **tablero Kanban para Scrum** completamente en **frontend (sin backend)**.

### 🧩 Objetivo

Un MVP simple pero funcional para gestionar tareas tipo Scrum con columnas Kanban.

---

### 📌 Requisitos funcionales

La aplicación debe permitir:

* Crear, editar y eliminar tareas (cards)
* Mover tareas entre columnas mediante drag & drop
* Editar título y descripción de cada tarea
* Asignar estado a cada tarea según columnas
* Persistir datos en **localStorage** del navegador

---

### 📊 Columnas del tablero

El tablero debe incluir estas columnas:

* 🟦 To Do
* 🟨 In Progress
* 🟩 Review
* 🟪 Done

---

### 🧱 Estructura de una tarjeta (Task Card)

Cada tarea debe tener:

* id único
* título (string)
* descripción (string opcional)
* estado (columna actual)
* fecha de creación

---

### 🎨 UI / UX

* Diseño limpio estilo Jira / Trello simple
* Layout horizontal con columnas visibles
* Cards arrastrables entre columnas (drag & drop)
* Botón “+ Add Task” por columna
* Modal o inline edit para tareas
* Indicadores visuales por estado (colores suaves)
* Responsive básico (desktop-first)

---

### ⚙️ Restricciones técnicas

* Solo frontend (HTML + CSS + JavaScript o framework liviano si es necesario)
* Sin backend
* Sin autenticación
* Persistencia solo con localStorage
* Código modular y simple (pensado como MVP)

---

### 🧠 Lógica esperada

* Estado global de tareas en memoria
* Render automático al cambiar estado
* Sync con localStorage en cada cambio
* Drag & drop actualiza estado de la tarea

---

### 📦 Bonus (si es posible en el MVP)

* Filtro por estado
* Contador de tareas por columna
* Botón “Clear board”
* Confirmación antes de borrar tarea


```

* Me genero
  * https://obedient-sprint-flow-board.base44.app

> [!NOTE]
> Puntaje 9 / 10

---

# Bolt.new

> https://bolt.new/

* Vamos a probarla con el mismo prompt que Base44
* Trabaja casi exclusivamente con los modelos de Antrhopic
 * Es un poco lento porque los modelos de claude de por si ya son un poco mas lentos, pero tambien son muy potentes
 * Hicmos este ejemplo
   * https://frontend-kanban-boar-d86h.bolt.host

> Puntaje : 9 / 10
---
  
# Hugging Face

> https://huggingface.co/

* Podemos desde Google Colab utilizar Los modelos de hugging face
  * Por ejemplo vamos a probar este modelo : https://huggingface.co/microsoft/VibeVoice-1.5B
* Podemos probar los modelos de Huggig Face desde la parte de Spaces
* Elijo un modelo y luego en la parte "use this model" podemos abrirlo y utilizarlo en python (en general los ejemplos que traen son para colab)

# Herramienta Para Interfaces Graficas

> https://stitch.withgoogle.com/

* Prompt Utilizado

```
### 🚀 MVP Prompt – App de gestión de tiempo + tareas (tipo Notion + Pomodoro)

Construí un MVP de una aplicación web responsive enfocada en **gestión de tiempo, productividad y seguimiento de tareas**, combinando conceptos de Notion + Pomodoro.

## 🎯 Objetivo del producto

Permitir que el usuario:

* Inicie sesión con Google
* Gestione tareas tipo Notion (listas, páginas simples)
* Use técnicas de productividad como Pomodoro
* Haga seguimiento de tiempo dedicado a tareas

---

## 🔐 Autenticación

* Login con Google (OAuth)
* Pantalla de bienvenida simple con botón “Continuar con Google”
* Al loguearse, redirigir al dashboard

---

## 🧭 Estructura de la app (Frontend SPA)

### 1. 🏠 Dashboard

* Vista general tipo Notion minimalista
* Sidebar izquierda con:

  * Inbox
  * Hoy
  * Proyectos
  * Pomodoro Timer
  * Estadísticas
* Área principal con:

  * Lista de tareas del día
  * Tareas agrupadas por proyecto
  * Botón “+ Nueva tarea”

---

### 2. 📝 Gestor de tareas (tipo Notion simplificado)

Cada tarea debe tener:

* Título
* Descripción (opcional, estilo block editor simple)
* Estado: To do / Doing / Done
* Proyecto asociado
* Estimación de tiempo (opcional)
* Botón “Iniciar Pomodoro”

Permitir:

* Crear tareas inline
* Editar en panel lateral
* Drag & drop entre estados

---

### 3. ⏱️ Pomodoro Timer

Pantalla dedicada con:

* Timer configurable (25/5 por defecto)
* Botón Start / Pause / Reset
* Asociación con tarea activa
* Registro de sesiones completadas
* Historial simple de pomodoros por día

---

### 4. 📊 Estadísticas

* Tiempo total trabajado por día
* Pomodoros completados
* Tareas finalizadas
* Gráfico simple semanal

---

### 5. ⚙️ Diseño UI/UX

* Estilo minimalista tipo Notion
* Fondo claro con modo dark opcional
* Tipografía limpia (Inter o similar)
* Componentes tipo cards suaves
* Animaciones sutiles (transiciones de tareas y timer)

---

## ⚙️ Requisitos técnicos del MVP

* Todo en frontend (sin backend complejo en esta versión)
* Estado local o mock data
* Arquitectura modular por componentes
* Preparado para futura integración con backend (Firebase o Supabase)

---

## 💡 Extras opcionales (si entra en MVP)

* Modo foco (pantalla limpia solo timer + tarea activa)
* Atajos de teclado para iniciar/detener pomodoro
* Notificaciones del navegador al terminar sesiones

```

> [!NOTE]
> Puntaje 9+

> [!NOTE]
> Hay que estar muy atento
> https://www.anthropic.com/news/claude-design-anthropic-labs
