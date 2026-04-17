# Clase Seis - 16 de Abril del 2026

# Repaso

* Spec Driven Development
* Asistentes de Codigicacion
  * GitHub Copilot
    * Patron Hgh Level Goal :  Escribir un comentario al principio para guiar el desarrollo de la IA
    * Como Educar a la IA para que programe como yo quiero
    * Model Context Protocol
      * Protocolo para agrarle plugins y herramientas a copilot
* Diferencia entre Agentes y Asistentes

# Herramienta

* Herramientas de scaffolding de proyectos
  * https://lovable.dev/
  * Permite descargar el codigo directamente
  * Lo podes subir a github
  * Destaca en el disenio de interfaces para aplicaciones de React
  * Lo podemos publicar ya que lovable me da un pequenio hosting

* Generamos un prompt con ChatGPT

```
Quiero que desarrolles el frontend de un MVP para una peluquería que permita a los usuarios reservar turnos.

Objetivo

Construir una aplicación web simple donde:

Se visualice una agenda de turnos disponibles
Los usuarios puedan reservar un turno
Los turnos queden guardados en memoria local (sin backend)
Requisitos funcionales
Vista principal (Agenda)
Mostrar días de la semana (ej: Lunes a Sábado)
Mostrar horarios disponibles (ej: 09:00 a 18:00 en intervalos de 30 min)
Cada slot debe indicar:
Disponible
Reservado
Reserva de turno
Al hacer click en un horario disponible:
Mostrar un formulario simple con:
Nombre
Teléfono
Confirmar reserva
El turno pasa automáticamente a estado "Reservado"
Persistencia
Usar localStorage
Guardar:
Día
Hora
Nombre
Teléfono
Al recargar la página, los turnos deben mantenerse
Requisitos técnicos
Usar React (preferentemente con hooks)
Manejo de estado con useState o useReducer
Componentes separados:
Agenda
Slot de turno
Modal/Formulario
Código claro, simple y bien estructurado
UI / UX (MUY IMPORTANTE)

La estética debe reflejar una peluquería moderna y profesional:

Paleta de colores:
Negro (#111)
Blanco (#fff)
Dorado (#C9A227) o tonos cálidos
Tipografía elegante (similar a barbería premium)
Botones con buen contraste
Animaciones suaves (hover, selección de turno)
Diseño limpio y minimalista

Inspiración:

Barberías premium
Estética masculina / moderna
Sensación de exclusividad
Extras deseables (si es simple)
Animación al seleccionar turno
Confirmación visual de reserva
Posibilidad de cancelar turno
```

* Una vez que genere el proyecto con Lovable
* (Puedo iterar sobre el mismo)
* Sinconizo con github
    * https://github.com/estebancalabria/golden-hour-slots.git

* Clonar el Repo
* 
```
> git clone https://github.com/estebancalabria/golden-hour-slots.git
> cd golden-hour-slots
```

* Lo abro con Cursor

```
> cursor .
```

* Instalar las dependencias

```
> npm install
```

* Lo ejecute

```
npm run dev
```

* Me mostro

```
  VITE v5.4.19  ready in 950 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.0.102:8080/
  ➜  press h + enter to show help
Browserslist: browsers data (caniuse-lite) is 10 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme

```

> [!NOTE]
> Todos los proyectos de lovable se ejecutan en general de esta manera

* Pedirle un cambio "grande" con cursor

```
Quiero que cuando inicie me muestre un login siguiendo la misma estetica de la aplicacion el cual se ingresa con el usuario peluqueria y el pass peluqueria
```

# Cursor

* Como funciona Cursor
  * https://www.instagram.com/p/DPWOQ-HjoEr/?img_index=1
* Al igualque lo que vimos la clase pasada admite
  * Servidores MCP
  * Instrucciones personalizadas 
  
# MCP en Cursor

* Crear el archivo en .cursor/mcp.json

```
{
    "mcpServers": {
        "puppeteer": {
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-puppeteer"
            ]
        }
    }
}
```

> [!NOTE]
> Esta forma instala un servidor MCP solmente para el proyecto en cuestion, si deseo hacerlo para todos los proyectos lo puedo agregar en el Agent Settings

* IR a Agent settigs y habilitarlo

* Luego le pedi que use el mcp en mi prompt

```
Quiero que uses el mcp de pupeteer vayas al localhost:8080 y te loguees con usuario peluqueria y password peluqueria
```
