export type EducationalLevel = '1-eso' | '2-eso' | '3-eso' | '4-eso' | '1-bachillerato' | '2-bachillerato';

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  duration: string;
  type: 'explicacion' | 'ejercicio' | 'repaso' | 'examen';
  difficulty: 'basico' | 'intermedio' | 'avanzado';
  topicId: string;
}

export interface Exercise {
  id: string;
  title: string;
  statement: string;
  solutionSteps: string[];
  finalAnswer: string;
  difficulty: 'basico' | 'intermedio' | 'avanzado';
  topicId: string;
}

export interface Question {
  id: string;
  prompt: string;
  type: 'multiple-choice' | 'boolean' | 'numeric';
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  topicId: string;
  estimatedMinutes: number;
  questions: Question[];
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'resumen' | 'formulario' | 'ficha';
  fileUrl: string;
  isPremium: boolean;
  topicId: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  subjectId: string;
  order: number;
}

export interface Subject {
  id: string;
  slug: string;
  name: string;
  level: EducationalLevel;
  description: string;
  icon?: string; // El signo ? hace que el campo sea opcional
}