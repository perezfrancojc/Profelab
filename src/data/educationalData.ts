import { Subject, Topic, Video, Exercise, Quiz, Material } from '@/types';
import { ALL_QUIZZES } from './quizzes';

export const SUBJECTS: Subject[] = [
  // ==========================================
  // MATEMÁTICAS
  // ==========================================
  {
    id: 'mat-1eso',
    name: 'Matemáticas 1º ESO',
    slug: 'matematicas',
    level: '1-eso',
    description: 'Números enteros, fracciones, decimales, iniciación al álgebra y geometría plana.',
  },
  {
    id: 'mat-2eso',
    name: 'Matemáticas 2º ESO',
    slug: 'matematicas',
    level: '2-eso',
    description: 'Proporcionalidad, porcentajes, ecuaciones de 1º y 2º grado y teoremas geométricos.',
  },
  {
    id: 'mat-3eso',
    name: 'Matemáticas 3º ESO',
    slug: 'matematicas',
    level: '3-eso',
    description: 'Sistemas de ecuaciones, sucesiones, funciones lineales y estadística descriptiva.',
  },
  {
    id: 'mat-4eso',
    name: 'Matemáticas 4º ESO',
    slug: 'matematicas',
    level: '4-eso',
    description: 'Polinomios, trigonometría, semejanzas, funciones exponenciales y probabilidad.',
  },
  {
    id: 'mat-1bach',
    name: 'Matemáticas I (1º Bachillerato)',
    slug: 'matematicas',
    level: '1-bachillerato',
    description: 'Trigonometría avanzada, números complejos, vectores, derivadas y límites.',
  },
  {
    id: 'mat-2bach',
    name: 'Matemáticas II (2º Bachillerato)',
    slug: 'matematicas',
    level: '2-bachillerato',
    description: 'Matrices, determinantes, geometría en el espacio, integrales y preparación Selectividad/PAU.',
  },

  // ==========================================
  // FÍSICA Y QUÍMICA
  // ==========================================
  {
    id: 'fq-2eso',
    name: 'Física y Química 2º ESO',
    slug: 'fisica-y-quimica',
    level: '2-eso',
    description: 'La materia, estados de agregación, mezclas, cambios físicos/químicos y energía.',
  },
  {
    id: 'fq-3eso',
    name: 'Física y Química 3º ESO',
    slug: 'fisica-y-quimica',
    level: '3-eso',
    description: 'Estructura atómica, tabla periódica, enlaces químicos, movimiento y fuerzas.',
  },
  {
    id: 'fq-4eso',
    name: 'Física y Química 4º ESO',
    slug: 'fisica-y-quimica',
    level: '4-eso',
    description: 'Cinemática, dinámica, trabajo y energía, estequiometría y química del carbono.',
  },
  {
    id: 'fq-1bach',
    name: 'Física y Química 1º Bachillerato',
    slug: 'fisica-y-quimica',
    level: '1-bachillerato',
    description: 'Leyes de los gases, disoluciones, termoquímica, cinemática vectorial y dinámica.',
  },
  {
    id: 'fq-2bach',
    name: 'Física y Química 2º Bachillerato',
    slug: 'fisica-y-quimica',
    level: '2-bachillerato',
    description: 'Gravitación, electromagnetismo, óptica, física cuántica, ácido-base y redox.',
  },
];

export const TOPICS: Topic[] = [
  // TEMAS 1º ESO MATEMÁTICAS
  { id: 'mat-1eso-conjuntos-numericos', slug: 'conjuntos-numericos', title: 'Conjuntos Numéricos', description: 'Números ℕ, ℤ, ℚ y la recta numérica.', subjectId: 'mat-1eso', order: 1 },
  { id: 'mat-1eso-numeros-naturales-y-divisibilidad', slug: 'numeros-naturales-y-divisibilidad', title: 'Números Naturales y Divisibilidad', description: 'Jerarquía, divisibilidad, MCD y MCM.', subjectId: 'mat-1eso', order: 2 },
  { id: 'mat-1eso-numeros-enteros', slug: 'numeros-enteros', title: 'Números Enteros', description: 'Operaciones combinadas con signo y paréntesis.', subjectId: 'mat-1eso', order: 3 },
  { id: 'mat-1eso-decimales-y-fracciones', slug: 'decimales-y-fracciones', title: 'Decimales y Fracciones', description: 'Conversión, orden y tipos de decimales.', subjectId: 'mat-1eso', order: 4 },
  { id: 'mat-1eso-proporcionalidad', slug: 'proporcionalidad', title: 'Proporcionalidad', description: 'Regla de tres directa e inversa.', subjectId: 'mat-1eso', order: 5 },
  { id: 'mat-1eso-fracciones', slug: 'fracciones', title: 'Fracciones', description: 'Operaciones con fracciones y reducción.', subjectId: 'mat-1eso', order: 6 },
  { id: 'mat-1eso-porcentajes', slug: 'porcentajes', title: 'Porcentajes', description: 'Cálculo de porcentajes, aumentos y descuentos.', subjectId: 'mat-1eso', order: 7 },
  { id: 'mat-1eso-iniciacion-al-algebra', slug: 'iniciacion-al-algebra', title: 'Iniciación al Álgebra', description: 'Monomios, lenguaje algebraico y valor numérico.', subjectId: 'mat-1eso', order: 8 },
  { id: 'mat-1eso-ecuaciones', slug: 'ecuaciones', title: 'Ecuaciones', description: 'Resolución de ecuaciones de 1º grado.', subjectId: 'mat-1eso', order: 9 },
  { id: 'mat-1eso-geometria', slug: 'geometria', title: 'Geometría', description: 'Ángulos, áreas, perímetros y Pitágoras.', subjectId: 'mat-1eso', order: 10 },
  { id: 'mat-1eso-estadistica', slug: 'estadistica', title: 'Estadística', description: 'Tablas de frecuencia, media, moda y mediana.', subjectId: 'mat-1eso', order: 11 },

  // OTROS TEMAS
  { id: 'topic-ecuaciones-3eso', slug: 'ecuaciones', title: 'Ecuaciones de 1º y 2º Grado', description: 'Resolución de ecuaciones lineales, incompletas y completas de segundo grado.', subjectId: 'mat-3eso', order: 1 },
  { id: 'topic-energia-3eso', slug: 'energia', title: 'Trabajo y Energía', description: 'Energía cinética, potencial, mecánica y su conservación.', subjectId: 'fyq-3eso', order: 1 }
];

export const VIDEOS: Video[] = [
  {
    id: 'v1',
    youtubeId: 'y__Ettmx5r8',
    title: 'Cálculo y Representación de Intersecciones y Uniones',
    description: 'Explicación detallada paso a paso.',
    duration: '12:45',
    type: 'explicacion',
    difficulty: 'basico',
    topicId: 'topic-ecuaciones-3eso'
  }
];

export const EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    title: 'Ecuación con fracciones y paréntesis',
    statement: 'Resuelve la siguiente ecuación: 2(x - 3) + x/2 = 9',
    solutionSteps: [
      'Elimina el paréntesis multiplicando: 2x - 6 + x/2 = 9',
      'Multiplica toda la ecuación por 2 para quitar denominadores: 4x - 12 + x = 18',
      'Agrupa términos semejantes: 5x = 30',
      'Despeja la incógnita: x = 30/5 = 6'
    ],
    finalAnswer: 'x = 6',
    difficulty: 'intermedio',
    topicId: 'topic-ecuaciones-3eso'
  }
];

export const QUIZZES: Quiz[] = [
  ...(ALL_QUIZZES as any[]),
];

export const MATERIALS: Material[] = [
  {
    id: 'mat-1',
    title: 'Formulario Resumen: Álgebra 3º ESO',
    type: 'formulario',
    fileUrl: '/docs/formulario-algebra.pdf',
    isPremium: false,
    topicId: 'topic-ecuaciones-3eso'
  }
];