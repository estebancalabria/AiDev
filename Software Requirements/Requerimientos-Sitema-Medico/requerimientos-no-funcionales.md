# 🔒 Requerimientos No Funcionales
## Sistema de Gestión de Turnos Médicos – Turnos Salud

### 📌 1. Introducción
Este documento describe los requerimientos no funcionales (RNF) del sistema, los cuales definen los atributos de calidad y restricciones bajo los cuales debe operar la solución.

---

### 🗂️ 2. Clasificación de Requerimientos No Funcionales

#### 🔐 2.1 Seguridad

| ID | Requerimiento | Métrica de Aceptación |
|----|--------------|----------------------|
| RNF-SEC-01 | El sistema debe requerir autenticación para el acceso de usuarios. | 100% de las funcionalidades protegidas. |
| RNF-SEC-02 | Los datos sensibles deben almacenarse cifrados. | Uso de cifrado AES-256 en la base de datos. |
| RNF-SEC-03 | Las comunicaciones deben realizarse mediante HTTPS. | Certificado SSL/TLS válido. |
| RNF-SEC-04 | El sistema debe implementar control de acceso basado en roles (RBAC). | Validación de permisos por rol. |
| RNF-SEC-05 | El sistema debe registrar eventos de auditoría. | Logs disponibles para accesos y operaciones críticas. |

---

#### ⚡ 2.2 Rendimiento

| ID | Requerimiento | Métrica de Aceptación |
|----|--------------|----------------------|
| RNF-PERF-01 | El tiempo de respuesta para operaciones críticas debe ser menor a 2 segundos. | Pruebas de rendimiento satisfactorias. |
| RNF-PERF-02 | El sistema debe soportar al menos 500 usuarios concurrentes. | Pruebas de carga exitosas. |
| RNF-PERF-03 | La búsqueda de turnos disponibles debe ejecutarse en menos de 1 segundo. | Validación mediante pruebas de estrés. |

---

#### 🌐 2.3 Disponibilidad y Confiabilidad

| ID | Requerimiento | Métrica de Aceptación |
|----|--------------|----------------------|
| RNF-DISP-01 | El sistema debe estar disponible el 99.5% del tiempo. | Monitoreo mensual de disponibilidad. |
| RNF-DISP-02 | Deben realizarse copias de seguridad diarias. | Verificación automática de backups. |
| RNF-DISP-03 | El sistema debe permitir la recuperación ante desastres en menos de 4 horas (RTO). | Pruebas de recuperación documentadas. |
| RNF-DISP-04 | La pérdida máxima de datos debe ser menor a 24 horas (RPO). | Validación de políticas de backup. |

---

#### 📱 2.4 Usabilidad y Accesibilidad

| ID | Requerimiento | Métrica de Aceptación |
|----|--------------|----------------------|
| RNF-USA-01 | El sistema debe ser responsive y adaptable a dispositivos móviles. | Pruebas en diferentes resoluciones. |
| RNF-USA-02 | La interfaz debe ser intuitiva para usuarios no técnicos. | Evaluaciones de usabilidad con usuarios reales. |
| RNF-USA-03 | El sistema debe cumplir con las pautas WCAG 2.1 nivel AA. | Auditoría de accesibilidad aprobada. |
| RNF-USA-04 | El proceso de reserva de turnos no debe requerir más de 5 pasos. | Validación mediante pruebas de usuario. |

---

#### 📈 2.5 Escalabilidad

| ID | Requerimiento | Métrica de Aceptación |
|----|--------------|----------------------|
| RNF-ESC-01 | El sistema debe permitir la incorporación de nuevas sucursales sin afectar el rendimiento. | Pruebas de escalabilidad exitosas. |
| RNF-ESC-02 | La arquitectura debe soportar escalado horizontal. | Validación en entorno de infraestructura. |

---

#### 🔗 2.6 Compatibilidad e Integración

| ID | Requerimiento | Métrica de Aceptación |
|----|--------------|----------------------|
| RNF-INT-01 | El sistema debe permitir integración con sistemas de historia clínica electrónica mediante APIs REST. | Pruebas de integración satisfactorias. |
| RNF-INT-02 | Debe ser compatible con los navegadores modernos (Chrome, Firefox, Edge y Safari). | Pruebas de compatibilidad aprobadas. |

---

#### ⚖️ 2.7 Cumplimiento Legal y Normativo

| ID | Requerimiento | Métrica de Aceptación |
|----|--------------|----------------------|
| RNF-LEG-01 | El sistema debe cumplir con la Ley de Protección de Datos Personales (Ley 25.326 - Argentina). | Validación legal y auditoría de cumplimiento. |
| RNF-LEG-02 | Los usuarios deben aceptar los términos y condiciones y la política de privacidad. | Registro del consentimiento en el sistema. |

---

### 🔗 3. Trazabilidad con Stakeholders

| Categoría | Stakeholders Relacionados |
|-----------|--------------------------|
| Seguridad | Directora Médica, Equipo de TI, Autoridades regulatorias |
| Rendimiento | Pacientes, Médicos |
| Usabilidad | Pacientes, Recepcionistas |
| Disponibilidad | Todos |
| Cumplimiento legal | Autoridades regulatorias |

---

### 🧪 4. Validación y Pruebas

Los requerimientos no funcionales serán validados mediante:
- Pruebas de rendimiento y carga.
- Auditorías de seguridad.
- Evaluaciones de usabilidad.
- Pruebas de recuperación ante desastres.
- Revisiones de cumplimiento legal.

---

### ✅ 5. Aprobación

| Nombre | Rol | Fecha |
|-------|-----|------|
| Dra. Laura Gómez | Directora Médica | ___ / ___ / 2026 |
| Juan Pérez | Responsable Administrativo | ___ / ___ / 2026 |

---

**Documento elaborado por:** Esteban Calabria  
**Versión:** 1.0  
**Fecha:** 9 de abril de 2026
