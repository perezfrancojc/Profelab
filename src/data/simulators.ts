export type SimulatorMeta = {
  slug: string;
  title: string;
  description: string;
  subject: 'mat' | 'fq';
  levels: string;
  // Temas donde se muestra: cursos y palabras clave del slug/título del tema
  subjectIds: string[];
  keywords: string[];
};

export const SIMULATORS: SimulatorMeta[] = [
  {
    slug: 'parabola',
    title: 'La parábola y la ecuación de 2º grado',
    description:
      'Mueve a, b y c y mira cómo cambian la parábola, el vértice, las raíces y el discriminante.',
    subject: 'mat',
    levels: '3.º y 4.º ESO',
    subjectIds: ['mat-3eso', 'mat-4eso'],
    keywords: ['ecuacion', 'funcion'],
  },
    {
    slug: 'recta',
    title: 'La recta y la pendiente',
    description:
      'Mueve m y n y observa cómo cambian la inclinación, el corte con los ejes y el crecimiento de la recta.',
    subject: 'mat',
    levels: '2.º, 3.º y 4.º ESO',
    subjectIds: ['mat-2eso', 'mat-3eso', 'mat-4eso'],
    keywords: ['funcion', 'grafica'],
  },

    {
    slug: 'circunferencia-goniometrica',
    title: 'La circunferencia goniométrica',
    description:
      'Arrastra el ángulo y observa en vivo el seno, el coseno y la tangente, junto a sus gráficas.',
    subject: 'mat',
    levels: '4.º ESO y 1.º Bachillerato',
    subjectIds: ['mat-4eso', 'mat-1bach'],
    keywords: ['trigonometr'],
  },

    {
    slug: 'pitagoras',
    title: 'El teorema de Pitágoras',
    description:
      'Cuadrados sobre los lados, demostración animada, una escalera apoyada y la distancia entre dos puntos.',
    subject: 'mat',
    levels: '1.º a 4.º ESO',
    subjectIds: ['mat-1eso', 'mat-2eso', 'mat-3eso', 'mat-4eso'],
    keywords: ['pitagoras', 'geometr'],
  },
  {
    slug: 'sistemas-ecuaciones',
    title: 'Sistemas de ecuaciones e inecuaciones',
    description:
      'Resuelve y visualiza sistemas de 2 o 3 incógnitas, y las regiones solución de sus inecuaciones.',
    subject: 'mat',
    levels: '2.º a 4.º ESO y 1.º Bachillerato',
    subjectIds: ['mat-2eso', 'mat-3eso', 'mat-4eso', 'mat-1bach'],
    keywords: ['sistema', 'inecuacion'],
  },

    {
    slug: 'estadistica-probabilidad',
    title: 'Estadística y probabilidad',
    description:
      'Analiza tus propios datos (media, mediana, moda, histograma, caja) y lanza monedas y dados para ver la ley de los grandes números.',
    subject: 'mat',
    levels: '1.º a 4.º ESO',
    subjectIds: ['mat-1eso', 'mat-2eso', 'mat-3eso', 'mat-4eso'],
    keywords: ['estadistic', 'probabilidad'],
  },

    {
    slug: 'derivadas',
    title: 'Derivadas y recta tangente',
    description:
      'Convierte una secante en tangente al acercar h a 0, calcula la pendiente y compara la función con su derivada.',
    subject: 'mat',
    levels: '1.º y 2.º Bachillerato',
    subjectIds: ['mat-1bach', 'mat-2bach', 'mat-1bachccss', 'mat-2bachccss'],
    keywords: ['derivad'],
  },
  {
    slug: 'intervalos',
    title: 'Intervalos en la recta real',
    description:
      'Dibuja intervalos abiertos, cerrados e infinitos y calcula uniones, intersecciones, diferencias y complementarios.',
    subject: 'mat',
    levels: '3.º ESO a 1.º Bachillerato',
    subjectIds: ['mat-3eso', 'mat-4eso', 'mat-1bach'],
    keywords: ['intervalo', 'real', 'racional'],
  },

    {
    slug: 'cinematica',
    title: 'MRU y MRUA: movimiento de un coche',
    description:
      'Anima un coche (o dos) y observa a la vez las gráficas de posición, velocidad y aceleración. Calcula cuándo se encuentran.',
    subject: 'fq',
    levels: '2.º ESO a 1.º Bachillerato',
    subjectIds: ['fq-2eso', 'fq-3eso', 'fq-4eso', 'fq-1bach'],
    keywords: ['cinematic', 'movimiento', 'velocidad'],
  },
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function getSimulatorsForTopic(subjectId: string, slug: string, title: string) {
  const text = normalize(`${slug} ${title}`);
  return SIMULATORS.filter(
    (s) => s.subjectIds.includes(subjectId) && s.keywords.some((k) => text.includes(k))
  );
}