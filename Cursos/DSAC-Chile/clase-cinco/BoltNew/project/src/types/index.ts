export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  image_url: string;
  created_at: string;
}

export interface Class {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string;
  duration: string;
  order: number;
  created_at: string;
}

export interface Material {
  id: string;
  class_id: string;
  title: string;
  type: 'pdf' | 'document' | 'link' | 'image';
  url: string;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  progress: number;
  last_accessed: string;
}