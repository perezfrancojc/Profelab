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