# 📑 Reglas de Negocio
## Sistema de Gestión de Turnos Médicos – Turnos Salud

### 📌 1. Introducción
El presente documento describe las reglas de negocio que rigen el funcionamiento del sistema de gestión de turnos médicos de la Clínica San Rafael. Estas reglas establecen las políticas operativas y restricciones que deben cumplirse para garantizar una correcta administración de los turnos.

### 👥 2. Actores Involucrados
- **Paciente:** Persona que solicita y gestiona turnos médicos.
- **Médico:** Profesional de la salud que atiende a los pacientes.
- **Administrador/Recepcionista:** Personal encargado de la supervisión y gestión del sistema.

### 📋 3. Reglas de Negocio

| ID | Regla | Descripción |
|----|------|-------------|
| RN-01 | Registro obligatorio | Todo paciente debe estar registrado para poder solicitar un turno. |
| RN-02 | Límite de turnos activos | Un paciente no puede tener más de **tres turnos activos** simultáneamente. |
| RN-03 | Anticipación de cancelación | Los turnos deben cancelarse con al menos **24 horas de anticipación**. |
| RN-04 | Duración de los turnos | La duración estándar de un turno será de **30 minutos**, configurable por especialidad. |
| RN-05 | Disponibilidad médica | Los médicos pueden definir y modificar sus horarios de atención. |
| RN-06 | Bloqueo de agenda | Los médicos pueden bloquear días u horarios no laborables. |
| RN-07 | Prevención de superposición | El sistema no permitirá la asignación de turnos superpuestos para un mismo médico. |
| RN-08 | Recordatorios automáticos | El sistema enviará recordatorios por correo electrónico **24 horas antes** del turno. |
| RN-09 | Acceso por roles | El acceso al sistema estará restringido según el rol del usuario (paciente, médico o administrador). |
| RN-10 | Escalabilidad | El sistema deberá permitir la incorporación de múltiples sucursales en el futuro. |
| RN-11 | Reprogramación | La reprogramación de turnos estará sujeta a la disponibilidad del médico. |
| RN-12 | Protección de datos | El sistema debe cumplir con las normativas de protección de datos personales vigentes. |

### 🔄 4. Relaciones entre Reglas
- **RN-02** se relaciona con **RN-11**, ya que la reprogramación no debe exceder el límite de turnos activos.
- **RN-05** y **RN-06** impactan directamente en la disponibilidad de turnos.
- **RN-07** asegura la integridad de la agenda médica.

### 📝 5. Consideraciones Adicionales
- Las reglas de negocio podrán evolucionar en futuras versiones del sistema.
- Cualquier cambio deberá ser validado por la dirección médica y el área administrativa.

### ✅ 6. Aprobación

| Nombre | Rol | Fecha |
|-------|-----|------|
| Dra. Laura Gómez | Directora Médica | ___ / ___ / 2026 |
| Juan Pérez | Responsable Administrativo | ___ / ___ / 2026 |

---
**Documento elaborado por:** Esteban Calabria  
**Versión:** 1.0  
**Fecha:** 9 de abril de 2026
