# Clase Cuatro - 06 de Agosto del 2025

Plan para hoy ver:
* Una herramienta para Scafoldin de proyectos (como Replt)
* Herramientas para el analisis
     * Tactic para las reuniones por ejemplo
     * NotebookLM para las minutas de reuniones y toda la documentacion 

## TIP 
* Con cualquier herramienta conviene mejorar los prompts con ChatGPT para obtener mejores resultados (o el mejorador de prompt incluidos en la herramienta)
* Conviene poner los prompts en ingles
* IMPROTANTE: En herramientas como Replt tomarse el tiempo para iterar el plan antes de generar la aplicacion

## Replit

> https://replit.com/

Permite
* Frontend y Backend en python o nodejs
* Tiene competencias por dinero
* Permite deployment

Primero mejoramos el prompt con ChatGPT
Prompt Indea:
```
Mejorar este prompt para hacer una app con Relplit  : "Crear un clon de jira para cargar tickets con visualizacion de tableros de comando tipo scrum y con un backend en python con flask" . Buscar y aplicar mejores practicas a la hora de realizar prompts en replit.
```
     
Prompt Mejorado
```
A web-based project management application similar to Jira for creating and managing tickets with Scrum-style kanban boards and command dashboards, built with a Python Flask backend.

Core Features:

Create, edit, and manage project tickets with details like title, description, priority, and assignee
Kanban board visualization with drag-and-drop functionality (To Do, In Progress, Done columns)
Scrum dashboard showing sprint metrics and team progress
User management for assigning tickets to team members
Visual References:
Inspired by Atlassian Jira and Trello's board interfaces, known for their intuitive ticket management and clean kanban board layouts.

Style Guide:

Colors: Primary #0052CC (Jira blue), Secondary #36B37E (success green), Background #F4F5F7 (light grey), Text #172B4D (dark blue), Cards #FFFFFF (white), Accent #FFAB00 (warning orange)
Design: Inter/Roboto fonts, card-based ticket layout, drag-and-drop kanban columns, responsive grid system, 16px padding, clean forms and modals for ticket creation

Application is in spanish
```

## Herranietas de IA para Analisis de Sistemas

### Workflow de trabajo

1. Capturo la transcripcion de las minutas de reunion
2. Junto toda la documentacion de un proyecto
3. Utilizo NotebookLM para organizar toda la documentacion y utilizar un LLM para hacer consultas

### Analisis de Requerimientos : Minutas de Reuniones

Herramientas para grabar reuniones y generar Minutas:
* https://tactiq.io/es
* https://meetgeek.ai/es
* https://www.notta.ai/es
* https://otter.ai/
* https://tldv.io/es/

Estas herramientas tienen dos modos de funcionamiento
* Cargar el video o el audio de la minuta de reunion para transcribirlo y generar notas
* Tomar notas directamente de la reunion desde Meet, Webex, Zoom, Teams (lo trae en forma nativa), etc

### NotebookLM

Es comoo un chatgpt (en realidad usa los modelos de google) donde le podes cargar un monton de documentacion como contexto armando "notebooks" sobre una tematica

> https://notebooklm.google.com/

Una vez cargada la documetnacion puedo:
* Generar notas
* Pedir Resumenes
* Hacer preguntas concretas
* Generar mapas de mente
* FRUTILLA DEL POSTRE : Puede generar un podcast sobre la documentacion donde dos personas explican toda la documentacion hablando como si fuera un programa de radio!
        * En settings... output language.. le puedo cambiar el idioma 
