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