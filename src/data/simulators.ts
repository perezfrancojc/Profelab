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