# Laboratorio: Uso de LLM para Modelo de Datos, SQL y Datos de Prueba

## Objetivo
Utilizar un modelo de lenguaje (LLM) para generar un modelo de datos, una consulta SQL que implemente una operación de división, y datos de prueba para verificar la consulta.

## Requisitos previos
- Acceso a un LLM (como GPT-3.5 o GPT-4)
- SQL Server Management Studio o herramienta similar de gestión de bases de datos

## Pasos

### 1. Generación del modelo de datos

**Prompt para el LLM:**
```
Genera un script SQL para un sistema de gestión de cursos universitarios. 
Incluye tablas para estudiantes, cursos, inscripciones y requisitos de graduación. 
Proporciona el código SQL para crear las tablas con sus relaciones.
Asegúrate de incluir claves primarias y foráneas.
Usa la sintaxis de SQL Server.
Devuelve solamente el script.
```

**Ejemplo de respuesta del LLM:**
```sql
CREATE TABLE Estudiantes (
    id_estudiante INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100),
    apellido NVARCHAR(100),
    fecha_nacimiento DATE
);

CREATE TABLE Cursos (
    id_curso INT PRIMARY KEY IDENTITY(1,1),
    nombre_curso NVARCHAR(100),
    creditos INT
);

CREATE TABLE Inscripciones (
    id_estudiante INT,
    id_curso INT,
    semestre NVARCHAR(20),
    calificacion FLOAT,
    PRIMARY KEY (id_estudiante, id_curso),
    FOREIGN KEY (id_estudiante) REFERENCES Estudiantes(id_estudiante),
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
);

CREATE TABLE RequisitosGraduacion (
    id_requisito INT PRIMARY KEY IDENTITY(1,1),
    id_curso INT,
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
);
```

### 2. Generación de la consulta de división

**Prompt para el LLM:**
```
Basándote en el modelo de datos para el sistema de gestión de cursos universitarios que acabamos de crear: Genera una consulta SQL que implemente una operación para encontrar todos los estudiantes que han completado todos los cursos requeridos para la graduación. Usa la sintaxis de SQL Server. Proporciona solo la consulta SQL, sin explicaciones adicionales.
```

**Ejemplo de respuesta del LLM:**
```sql
SELECT DISTINCT e.id_estudiante, e.nombre, e.apellido
FROM Estudiantes e
WHERE NOT EXISTS (
    SELECT r.id_curso
    FROM RequisitosGraduacion r
    WHERE NOT EXISTS (
        SELECT i.id_curso
        FROM Inscripciones i
        WHERE i.id_estudiante = e.id_estudiante
        AND i.id_curso = r.id_curso
        AND i.calificacion >= 60  -- Asumiendo que 60 es la calificación mínima para aprobar
    )
);
```

### 3. Generación de datos de prueba

**Prompt para el LLM:**
```
Genera instrucciones SQL para insertar datos de prueba en las tablas del sistema de gestión de cursos universitarios. 
Incluye al menos:
- 5 estudiantes
- 7 cursos
- 5 cursos requeridos para graduación
- Inscripciones que permitan probar la consulta de división (algunos estudiantes que hayan completado todos los cursos requeridos y otros que no)
Usa la sintaxis de SQL Server.
```

**Ejemplo de respuesta del LLM:**
```sql
-- Insertar estudiantes
INSERT INTO Estudiantes (nombre, apellido, fecha_nacimiento) VALUES
('Juan', 'Pérez', '1998-05-15'),
('María', 'González', '1999-02-20'),
('Carlos', 'Rodríguez', '1997-11-30'),
('Ana', 'Martínez', '1998-09-10'),
('Pedro', 'Sánchez', '1999-07-05');

-- Insertar cursos
INSERT INTO Cursos (nombre_curso, creditos) VALUES
('Matemáticas I', 4),
('Programación Básica', 3),
('Física General', 4),
('Bases de Datos', 3),
('Estructuras de Datos', 3),
('Redes de Computadoras', 3),
('Inteligencia Artificial', 4);

-- Insertar requisitos de graduación
INSERT INTO RequisitosGraduacion (id_curso) VALUES
(1), (2), (3), (4), (5);

-- Insertar inscripciones
-- Juan Pérez: Completa todos los cursos requeridos
INSERT INTO Inscripciones (id_estudiante, id_curso, semestre, calificacion) VALUES
(1, 1, '2022-1', 85), (1, 2, '2022-1', 90), (1, 3, '2022-2', 78),
(1, 4, '2023-1', 88), (1, 5, '2023-1', 92);

-- María González: Falta un curso requerido
INSERT INTO Inscripciones (id_estudiante, id_curso, semestre, calificacion) VALUES
(2, 1, '2022-1', 82), (2, 2, '2022-1', 79), (2, 3, '2022-2', 85),
(2, 4, '2023-1', 90);

-- Carlos Rodríguez: Completa todos los cursos requeridos
INSERT INTO Inscripciones (id_estudiante, id_curso, semestre, calificacion) VALUES
(3, 1, '2022-1', 75), (3, 2, '2022-1', 81), (3, 3, '2022-2', 79),
(3, 4, '2023-1', 83), (3, 5, '2023-1', 88);

-- Ana Martínez: Falta dos cursos requeridos
INSERT INTO Inscripciones (id_estudiante, id_curso, semestre, calificacion) VALUES
(4, 1, '2022-1', 91), (4, 2, '2022-1', 87), (4, 3, '2022-2', 84);

-- Pedro Sánchez: Completa todos los cursos requeridos y algunos adicionales
INSERT INTO Inscripciones (id_estudiante, id_curso, semestre, calificacion) VALUES
(5, 1, '2022-1', 88), (5, 2, '2022-1', 92), (5, 3, '2022-2', 90),
(5, 4, '2023-1', 85), (5, 5, '2023-1', 89), (5, 6, '2023-2', 87),
(5, 7, '2023-2', 91);
```

### 4. Prueba de la consulta

1. Abre SQL Server Management Studio y conecta a tu servidor.
2. Crea una nueva base de datos para este laboratorio.
3. Ejecuta el script SQL para crear las tablas (paso 1).
4. Ejecuta el script SQL para insertar los datos de prueba (paso 3).
5. Ejecuta la consulta de división (paso 2).

**Resultados esperados:**
La consulta debería devolver los siguientes estudiantes:
- Juan Pérez
- Carlos Rodríguez
- Pedro Sánchez

Estos estudiantes han completado todos los cursos requeridos para la graduación.

## Notas adicionales
- Este laboratorio demuestra cómo un LLM puede generar un modelo de datos, una consulta SQL compleja que implementa una división relacional, y datos de prueba relevantes.
- La consulta de división encuentra estudiantes que han completado todos los cursos requeridos, lo cual es un caso de uso común para esta operación.
- Asegúrate de revisar y entender el código SQL generado antes de ejecutarlo en tu entorno de base de datos.
- Puedes modificar los datos de prueba o la consulta para explorar diferentes escenarios y entender mejor cómo funciona la operación de división en SQL.
