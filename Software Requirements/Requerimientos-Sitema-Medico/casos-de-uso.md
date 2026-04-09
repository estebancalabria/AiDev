# 📘 Casos de Uso
## Sistema de Gestión de Turnos Médicos – Turnos Salud

### 📌 1. Introducción
Este documento describe los principales casos de uso del sistema de gestión de turnos médicos, detallando las interacciones entre los actores y el sistema.

### 👥 2. Actores
- **Paciente**
- **Médico**
- **Administrador/Recepcionista**
- **Sistema de Notificaciones (externo)**

---

### 🗂️ 3. Lista de Casos de Uso

| ID | Nombre | Actor Principal | Descripción |
|----|--------|----------------|-------------|
| CU-01 | Registrarse | Paciente | Permite a un paciente crear una cuenta en el sistema. |
| CU-02 | Iniciar sesión | Todos | Permite a los usuarios autenticarse en el sistema. |
| CU-03 | Buscar médico | Paciente | Permite buscar médicos por especialidad. |
| CU-04 | Reservar turno | Paciente | Permite seleccionar un horario disponible y confirmar un turno. |
| CU-05 | Cancelar turno | Paciente | Permite cancelar un turno existente. |
| CU-06 | Reprogramar turno | Paciente | Permite modificar la fecha y hora de un turno. |
| CU-07 | Gestionar agenda | Médico | Permite al médico definir su disponibilidad. |
| CU-08 | Bloquear horarios | Médico | Permite bloquear días u horarios no laborables. |
| CU-09 | Enviar recordatorios | Sistema | Envía notificaciones automáticas a los pacientes. |
| CU-10 | Generar reportes | Administrador | Permite visualizar reportes de gestión. |

---

### 📖 4. Descripción Detallada de Casos de Uso

#### ✅ CU-04: Reservar Turno

- **Actor Principal:** Paciente  
- **Actores Secundarios:** Sistema de Notificaciones  
- **Descripción:** Permite a un paciente seleccionar un médico y un horario disponible para reservar un turno.

**Precondiciones:**
- El paciente debe estar registrado e iniciar sesión.
- Debe existir disponibilidad en la agenda del médico.
- El paciente no debe superar el límite de turnos activos (RN-02).

**Postcondiciones:**
- El turno queda registrado en el sistema.
- Se envía un correo electrónico de confirmación al paciente.

**Flujo Principal:**
1. El paciente inicia sesión en el sistema.
2. Selecciona la especialidad médica.
3. Elige un médico.
4. Visualiza los horarios disponibles.
5. Selecciona un horario.
6. Confirma la reserva.
7. El sistema registra el turno.
8. El sistema envía una notificación de confirmación.

**Flujos Alternativos:**
- **A1 – Sin disponibilidad:** El sistema informa que no hay horarios disponibles.
- **A2 – Límite de turnos alcanzado:** El sistema notifica que se ha superado el máximo permitido.
- **A3 – Error en el envío de notificación:** El turno se registra, pero se informa al administrador del fallo.

---

#### ✅ CU-05: Cancelar Turno

- **Actor Principal:** Paciente  
- **Descripción:** Permite cancelar un turno previamente reservado.

**Precondiciones:**
- El paciente debe estar autenticado.
- La cancelación debe realizarse con al menos 24 horas de anticipación (RN-03).

**Postcondiciones:**
- El turno se elimina de la agenda.
- Se envía una notificación de cancelación.

---

#### ✅ CU-07: Gestionar Agenda Médica

- **Actor Principal:** Médico  
- **Descripción:** Permite al médico definir y actualizar sus horarios de atención.

**Precondiciones:**
- El médico debe estar autenticado.

**Postcondiciones:**
- La agenda queda actualizada y disponible para la reserva de turnos.

---

### 🔗 5. Trazabilidad con Reglas de Negocio

| Caso de Uso | Reglas Relacionadas |
|-------------|--------------------|
| CU-04 | RN-01, RN-02, RN-07, RN-08 |
| CU-05 | RN-03 |
| CU-06 | RN-02, RN-11 |
| CU-07 | RN-05, RN-06 |
| CU-09 | RN-08 |

---

### 📌 6. Consideraciones Generales
- Los casos de uso podrán ampliarse en futuras iteraciones del proyecto.
- Este documento servirá como base para la generación de historias de usuario y pruebas funcionales.

### ✅ 7. Aprobación

| Nombre | Rol | Fecha |
|-------|-----|------|
| Dra. Laura Gómez | Directora Médica | ___ / ___ / 2026 |
| Juan Pérez | Responsable Administrativo | ___ / ___ / 2026 |

---
**Documento elaborado por:** Esteban Calabria  
**Versión:** 1.0  
**Fecha:** 9 de abril de 2026
