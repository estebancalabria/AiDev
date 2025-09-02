# Clase Cinco - 2 de Septiembre del 2025

## Herramientas para Scaffolding de Proyectos

Similar a Replit : https://lovable.dev/
   
* Genera muy buenas interfaces de pantalla ademas del scaffolding
* Admite proyectos con base de datos con Supabase
         * https://supabase.com/
* Genera codigo en react
* Se puede generar un repo en github con el proyecto para descargar archivos
* La version gratuita no me permite editar para descargar tengo que pasar por github
* Hacer sin login
   

Para generar el prompt utilize ChatGPT y le puse

```
Crear un prompt para un MVP con lovable para un sistema de turnos que se pueda utilizar en distintos rubros tanto medico, hotel, administrativo,etc.
```
y chatgpt me genero

```
Acá te dejo un **prompt bien armado para Lovable** que apunta a un **MVP de sistema de turnos multipropósito** (médico, hotel, administrativo, etc.), manteniendo la idea de algo simple pero escalable:

---

### Prompt para Lovable

Quiero que generes un **MVP de un sistema de turnos online**, multipropósito y adaptable a distintos rubros (médico, hotelero, administrativo, peluquería, etc.).

📌 **Requerimientos principales del MVP:**

1. **Usuarios y roles**:

   * Administrador (configura rubro, horarios, disponibilidad, reglas de turnos).
   * Cliente/Usuario final (reserva, cancela, consulta sus turnos).

2. **Gestión de turnos**:

   * Alta, modificación y cancelación de turnos.
   * Definición de horarios disponibles según rubro.
   * Prevención de superposición de turnos.

3. **Interfaz**:

   * Simple, responsive y minimalista.
   * Vista de calendario o lista de turnos disponibles.
   * Formulario de reserva con datos básicos (nombre, email/teléfono, rubro).

4. **Notificaciones (opcional en MVP)**:

   * Confirmación/cancelación vía email o notificación interna.

5. **Configuración flexible por rubro**:

   * Poder definir campos adicionales según el rubro (ej: médico → especialidad, hotel → tipo de habitación, administrativo → trámite).

6. **Tecnología sugerida (si aplica)**:

   * Backend ligero con base de datos para turnos y usuarios.
   * Frontend claro con componentes de calendario/lista.
   * Arquitectura modular para poder escalar luego.

⚡ El objetivo es que el sistema sea **sencillo de usar**, **escalable** y pueda adaptarse a distintos escenarios sin rehacer todo desde cero.

---

¿Querés que te lo arme yo ya en formato **prompt optimizado para Lovable** (con estilo instructivo, como si fuera un input directo para la IA), o lo dejamos como guía y vos lo copias y adaptas?

```

> MVP : Minimum Viable Producto


## IA para System Design (Disenio de Sistemaas)

### Diagram GPT

Herramienta para digramar y generar la arquitectura de la aplicacion

> https://www.eraser.io/diagramgpt

Prompt utilizado (mas pro si lo pasaramos por chaatgpt)

```
Generame un diagraama de arquitectrua para una aplicacion tipo netflix que voy a hacer deploy en Azure
```

Ver imagen en diagramgpt/

* Permite importar diagramas de otras herramientas como Draw.io o lucidchart
* Permite subir los diagramas a github
* Permite exprotar los diagramas como imagen


### Lenguaje general para hacer diagramas

Mermaid


