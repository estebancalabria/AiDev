# 📝 Acta de Reunión de Discovery

## 📌 Información General

- **Proyecto:** Implementación del Sistema de Gestión de Turnos Médicos – *Turnos Salud*
- **Fecha:** 8 de abril de 2026
- **Hora:** 10:00 a 11:30
- **Modalidad:** Reunión virtual (Microsoft Teams)
- **Organizador:** Esteban Calabria – Consultor de Soluciones

## 👥 Participantes

| Nombre | Rol | Organización |
|-------|-----|-------------|
| Dra. Laura Gómez | Directora Médica | Clínica San Rafael |
| Juan Pérez | Responsable Administrativo | Clínica San Rafael |
| Ana Martínez | Recepcionista | Clínica San Rafael |
| Esteban Calabria | Consultor de Soluciones | Independiente |

## 🎯 Objetivo de la Reunión

Relevar en detalle las necesidades de la clínica para la implementación de un sistema digital de gestión de turnos médicos, identificando problemas actuales, expectativas y requerimientos preliminares.

---

## 📋 Resumen Ejecutivo

Durante la reunión se analizaron los principales desafíos del proceso actual de asignación de turnos, el cual se realiza de manera manual y telefónica. Esta modalidad genera demoras, errores en la programación y una alta carga operativa para el personal administrativo.

Los participantes manifestaron la necesidad de una solución web que permita a los pacientes autogestionar sus turnos y a los profesionales médicos administrar sus agendas, mejorando la eficiencia operativa y reduciendo el ausentismo mediante recordatorios automáticos.

---

## 🔍 Situación Actual (AS-IS)

- La asignación de turnos se realiza exclusivamente por teléfono o de manera presencial.
- La agenda médica se gestiona mediante planillas de cálculo.
- No existe un sistema automatizado de recordatorios para los pacientes.
- Se registran frecuentes errores de superposición de turnos.
- El ausentismo de pacientes es elevado debido a la falta de notificaciones.
- La generación de reportes es manual y demanda mucho tiempo.

---

## 🚀 Necesidades y Requerimientos Preliminares

### ✅ Requerimientos Funcionales

1. **Registro de pacientes** con datos personales y de contacto.
2. **Autenticación de usuarios** (pacientes y médicos).
3. **Búsqueda de médicos** por especialidad.
4. **Visualización de disponibilidad** de turnos.
5. **Reserva de turnos** por parte de los pacientes.
6. **Cancelación y reprogramación** de turnos.
7. **Gestión de agenda médica**, permitiendo bloquear días y horarios no laborables.
8. **Envío de recordatorios automáticos** por correo electrónico.
9. **Panel administrativo** con acceso a reportes básicos.
10. **Soporte para múltiples sucursales** en futuras etapas.

### 🔒 Requerimientos No Funcionales

1. **Accesibilidad:** El sistema debe ser responsive y accesible desde dispositivos móviles.
2. **Seguridad:** Protección de los datos personales de los pacientes y control de accesos por roles.
3. **Disponibilidad:** El sistema debe estar disponible las 24 horas, los 7 días de la semana.
4. **Usabilidad:** Interfaz intuitiva para usuarios con bajo nivel de conocimiento tecnológico.
5. **Escalabilidad:** Posibilidad de incorporar nuevas sucursales en el futuro.
6. **Cumplimiento normativo:** Adecuación a las normativas de protección de datos personales vigentes.

---

## 📏 Reglas de Negocio Identificadas

1. Un paciente no podrá tener más de **tres turnos activos** simultáneamente.
2. Las cancelaciones deberán realizarse con al menos **24 horas de anticipación**.
3. La duración estándar de los turnos será de **30 minutos**, configurable por especialidad.
4. Los médicos podrán definir sus horarios de atención y bloquear días no laborables.
5. El sistema deberá enviar **recordatorios automáticos** 24 horas antes del turno.

---

## ⚖️ Decisiones Tomadas

- La solución será implementada inicialmente como una **aplicación web**, con posibilidad de evolucionar a una aplicación móvil en el futuro.
- Se priorizará la **autogestión de turnos por parte de los pacientes**.
- El sistema deberá contemplar la **escalabilidad** para incorporar nuevas sucursales.
- Se evaluará la integración con sistemas existentes en una fase posterior.

---

## ❓ Preguntas Abiertas

1. ¿Se requerirá integración con sistemas de historia clínica electrónica?
2. ¿Qué método de autenticación será necesario (usuario/contraseña, autenticación social, etc.)?
3. ¿Se necesitará soporte para pagos en línea de consultas?
4. ¿Qué nivel de detalle deberán tener los reportes administrativos?
5. ¿Existen lineamientos específicos de identidad visual para la interfaz?

---

## ⚠️ Supuestos y Restricciones

### Supuestos
- Los pacientes contarán con acceso a internet y correo electrónico.
- El personal médico adoptará el uso del sistema para la gestión de sus agendas.
- La clínica proporcionará la información necesaria para la configuración inicial.

### Restricciones
- El presupuesto y el cronograma del proyecto aún están por definirse.
- La implementación inicial se limitará a la sede principal.
- El sistema deberá cumplir con la normativa local de protección de datos personales.

---

## 📌 Próximos Pasos

| Acción | Responsable | Fecha Estimada |
|-------|-------------|---------------|
| Validar el alcance preliminar | Clínica San Rafael | 15/04/2026 |
| Definir prioridades del backlog | Todas las partes | 18/04/2026 |
| Elaborar propuesta técnica | Esteban Calabria | 20/04/2026 |
| Coordinar próxima reunión | Esteban Calabria | 22/04/2026 |

---

## 📝 Observaciones Finales

La reunión permitió establecer una comprensión compartida de las necesidades del proyecto y sentar las bases para la definición detallada de los requerimientos. Se destaca el compromiso de los participantes y la disposición para avanzar en las հաջentes etapas del proceso.

---

**Documento elaborado por:** Esteban Calabria  
**Fecha de elaboración:** 9 de abril de 2026
