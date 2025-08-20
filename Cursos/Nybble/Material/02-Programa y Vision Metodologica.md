# Flujo de Trabajo en el Desarrollo de Software con IA

Este diagrama representa un marco metodológico basado en las etapas clásicas del desarrollo de software (Análisis, Diseño, Codificación y Pruebas) con la integración de herramientas y tecnologías de inteligencia artificial. Incluye decisiones clave, como determinar si el proyecto es nuevo o existente, y detalla las herramientas y técnicas disponibles para cada fase, desde la planificación inicial hasta la finalización del proyecto.

```mermaid
graph TD
  %% Análisis
  A[Inicio del Proceso] --> B[Análisis]
  B --> C[Entender Requerimientos]
  C --> D[Notebook LM]
  C --> E[Reuniones con TaqTic]
  C --> F[Diagramas con Mermaid y UML]
  C --> G[Documentación con Markdown]
  
  %% Diseño
  B --> H[Diseño del Proyecto]
  H --> I{¿Es un Proyecto Nuevo?}
  
  %% Bifurcaciones de "Es un proyecto nuevo"
  I --> |Sí| J[Generar un Proyecto]
  J --> K[Planificación con Claude]
  J --> L[Estructura con GitHub Copilot]
  I --> |No| M[Entender el Proyecto Existente]
  M --> N[Revisión en Laboratorio con Claude]
  
  %% Codificación
  H --> O[Codificación]
  O --> P[Asistentes de Código]
  P --> P1[GitHub Copilot]
  P --> P2[Tab Nine]
  P --> P3[Explain y Refactoring]
  P --> P4[Chat vs Inline]
  O --> Q[Entornos de Desarrollo]
  Q --> Q1[Cursor Composer]
  O --> R[Desarrollo GUI]
  R --> R1[Vercel v0]
  R --> R2[StackBlitz]
  R --> R3[WebSim]
  R --> R4[Openfly]
  O --> S[Bases de Datos]
  S --> S1[Postgres.NEW]
  
  %% Pruebas
  O --> T[Pruebas y Ajustes]
  T --> U[LLM en Colab/Groq/Ollama]
  T --> V[Refinamiento del Código]
  T --> W[Test Unitarios con ChatGPT]
  
  %% Finalización
  T --> X[Proyecto Finalizado]
  ```