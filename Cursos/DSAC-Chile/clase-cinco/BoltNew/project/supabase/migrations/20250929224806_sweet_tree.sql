/*
  # IAccademy Student Platform Initial Schema

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `instructor` (text)
      - `duration` (text)
      - `level` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
    
    - `classes`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `video_url` (text)
      - `duration` (text)
      - `order` (integer)
      - `created_at` (timestamp)
    
    - `materials`
      - `id` (uuid, primary key)
      - `class_id` (uuid, foreign key)
      - `title` (text)
      - `type` (text)
      - `url` (text)
      - `created_at` (timestamp)
    
    - `enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `course_id` (uuid, foreign key)
      - `progress` (integer)
      - `enrolled_at` (timestamp)
      - `last_accessed` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their own data
    - Add policies for enrolled users to access course content
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  instructor text NOT NULL,
  duration text DEFAULT '0 horas',
  level text DEFAULT 'Principiante' CHECK (level IN ('Principiante', 'Intermedio', 'Avanzado')),
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  video_url text DEFAULT '',
  duration text DEFAULT '0 min',
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create materials table
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text DEFAULT 'document' CHECK (type IN ('pdf', 'document', 'link', 'image')),
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  enrolled_at timestamptz DEFAULT now(),
  last_accessed timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses
CREATE POLICY "Users can view courses they are enrolled in"
  ON courses
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT course_id FROM enrollments 
      WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for classes
CREATE POLICY "Users can view classes for enrolled courses"
  ON classes
  FOR SELECT
  TO authenticated
  USING (
    course_id IN (
      SELECT course_id FROM enrollments 
      WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for materials
CREATE POLICY "Users can view materials for enrolled courses"
  ON materials
  FOR SELECT
  TO authenticated
  USING (
    class_id IN (
      SELECT c.id FROM classes c
      JOIN enrollments e ON c.course_id = e.course_id
      WHERE e.user_id = auth.uid()
    )
  );

-- RLS Policies for enrollments
CREATE POLICY "Users can view their own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own enrollments"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Insert sample data
INSERT INTO courses (title, description, instructor, duration, level, image_url) VALUES
  (
    'Introducción a JavaScript',
    'Aprende los fundamentos de JavaScript desde cero. Este curso te enseñará las bases del lenguaje de programación más popular del mundo.',
    'María García',
    '12 horas',
    'Principiante',
    'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&crop=center'
  ),
  (
    'React Avanzado',
    'Domina React con conceptos avanzados como hooks, context API, y patrones de diseño modernos.',
    'Carlos Rodríguez',
    '18 horas',
    'Avanzado',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&crop=center'
  ),
  (
    'Base de Datos con PostgreSQL',
    'Aprende a diseñar y gestionar bases de datos relacionales con PostgreSQL.',
    'Ana Martínez',
    '15 horas',
    'Intermedio',
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop&crop=center'
  );

-- Insert classes for JavaScript course
INSERT INTO classes (course_id, title, description, video_url, duration, "order")
SELECT 
  c.id,
  'Variables y Tipos de Datos',
  'Aprende sobre variables, tipos de datos primitivos y cómo declararlos en JavaScript.',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  '45 min',
  1
FROM courses c WHERE c.title = 'Introducción a JavaScript';

INSERT INTO classes (course_id, title, description, video_url, duration, "order")
SELECT 
  c.id,
  'Funciones y Scope',
  'Comprende cómo funcionan las funciones, parámetros, y el concepto de scope en JavaScript.',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  '50 min',
  2
FROM courses c WHERE c.title = 'Introducción a JavaScript';

INSERT INTO classes (course_id, title, description, video_url, duration, "order")
SELECT 
  c.id,
  'Objetos y Arrays',
  'Aprende a trabajar con estructuras de datos complejas como objetos y arrays.',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  '55 min',
  3
FROM courses c WHERE c.title = 'Introducción a JavaScript';

-- Insert classes for React course
INSERT INTO classes (course_id, title, description, video_url, duration, "order")
SELECT 
  c.id,
  'Hooks Avanzados',
  'Profundiza en useEffect, useCallback, useMemo y hooks personalizados.',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  '60 min',
  1
FROM courses c WHERE c.title = 'React Avanzado';

INSERT INTO classes (course_id, title, description, video_url, duration, "order")
SELECT 
  c.id,
  'Context API y Estado Global',
  'Maneja el estado global de tu aplicación con Context API y patrones avanzados.',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  '65 min',
  2
FROM courses c WHERE c.title = 'React Avanzado';

-- Insert sample materials
INSERT INTO materials (class_id, title, type, url)
SELECT 
  cl.id,
  'Guía de Variables JavaScript',
  'pdf',
  'https://example.com/javascript-variables-guide.pdf'
FROM classes cl
JOIN courses c ON cl.course_id = c.id
WHERE c.title = 'Introducción a JavaScript' AND cl.title = 'Variables y Tipos de Datos';

INSERT INTO materials (class_id, title, type, url)
SELECT 
  cl.id,
  'Ejercicios Prácticos',
  'document',
  'https://example.com/javascript-exercises.docx'
FROM classes cl
JOIN courses c ON cl.course_id = c.id
WHERE c.title = 'Introducción a JavaScript' AND cl.title = 'Variables y Tipos de Datos';

INSERT INTO materials (class_id, title, type, url)
SELECT 
  cl.id,
  'React Hooks Cheat Sheet',
  'pdf',
  'https://example.com/react-hooks-cheatsheet.pdf'
FROM classes cl
JOIN courses c ON cl.course_id = c.id
WHERE c.title = 'React Avanzado' AND cl.title = 'Hooks Avanzados';