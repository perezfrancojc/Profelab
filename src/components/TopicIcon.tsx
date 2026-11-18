import type { ReactNode } from 'react';

const ICONS: Record<string, ReactNode> = {
  numberline: (<><path d="M3 12h18M6 9v6M12 9v6M18 9v6" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /></>),
  divide: (<><path d="M5 12h14" /><circle cx="12" cy="6.5" r="1.4" fill="currentColor" /><circle cx="12" cy="17.5" r="1.4" fill="currentColor" /></>),
  integers: (<><path d="M4 8h8M8 4v8M13 17h8" /></>),
  pie: (<><circle cx="12" cy="12" r="8" /><path d="M12 4v8h8" /></>),
  proportion: (<><path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4" /></>),
  percent: (<><path d="M19 5L5 19" /><circle cx="7" cy="7" r="2.2" /><circle cx="17" cy="17" r="2.2" /></>),
  algebra: (<><path d="M4 7l9 10M13 7L4 17" /><path d="M16 5.5h3.5L16 9h4" /></>),
  equation: (<><path d="M12 4v16M7 20h10M5 8h14" /><path d="M5 8l-2.5 6a3 3 0 005 0zM19 8l-2.5 6a3 3 0 005 0z" /></>),
  pythagoras: (<><path d="M4 19V5l16 14z" /><path d="M4 15h4v4" /></>),
  stats: (<><path d="M4 20V4M4 20h16" /><path d="M8 16v-4M12 16V8M16 16v-6" /></>),
  polynomial: (<><path d="M3 20h18M3 4v16" /><path d="M5 17c4-1 5-11 9-11s2 10 6 11" /></>),
  radical: (<><path d="M3 13h3l3 6 5-14h7" /></>),
  system: (<><path d="M4 18L20 6M4 6l16 12" /><circle cx="12" cy="12" r="1.8" fill="currentColor" /></>),
  sequence: (<><path d="M4 20h4v-4h4v-4h4V8h4" /></>),
  function: (<><path d="M4 4v16h16" /><path d="M7 16l4-5 3 3 5-7" /></>),
  dice: (<><rect x="4" y="4" width="16" height="16" rx="3" /><circle cx="9" cy="9" r="1.2" fill="currentColor" /><circle cx="15" cy="15" r="1.2" fill="currentColor" /><circle cx="15" cy="9" r="1.2" fill="currentColor" /><circle cx="9" cy="15" r="1.2" fill="currentColor" /></>),
  tree: (<><circle cx="12" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /><path d="M11 7l-4 10M13 7l4 10" /></>),
  log: (<><path d="M4 4v16h16" /><path d="M6 19c1-8 5-11 13-12" /></>),
  inequality: (<><path d="M18 6L6 12l12 6" /><path d="M6 20h12" /></>),
  trig: (<><path d="M4 19h16M4 19L16 7" /><path d="M10 19a6 6 0 00-1.8-4.2" /></>),
  vector: (<><path d="M4 4v16h16" /><path d="M4 20L18 7M12 7h6v6" /></>),
  cube: (<><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>),
  bolt: (<><path d="M13 3L5 14h6l-1 7 8-11h-6z" /></>),
  gauge: (<><path d="M4 17a8 8 0 1116 0" /><path d="M12 17l4-5" /></>),
  force: (<><rect x="4" y="12" width="8" height="7" rx="1" /><path d="M12 15.5h8M17 12.5l3 3-3 3" /></>),
  atom: (<><circle cx="12" cy="12" r="1.8" fill="currentColor" /><ellipse cx="12" cy="12" rx="9" ry="3.8" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" /></>),
  flask: (<><path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" /><path d="M7.5 15h9" /></>),
  drop: (<><path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" /></>),
  gas: (<><circle cx="8" cy="15" r="3" /><circle cx="16" cy="9" r="3.5" /><circle cx="16" cy="18" r="1.6" /><circle cx="7" cy="6" r="1.6" /></>),
  wave: (<><path d="M2 12c3-8 5-8 8 0s5 8 8 0 3-4 4-4" /></>),
  magnet: (<><path d="M6 3v8a6 6 0 0012 0V3h-4v8a2 2 0 01-4 0V3z" /></>),
  orbit: (<><circle cx="12" cy="12" r="4" /><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-20 12 12)" /></>),
  thermo: (<><path d="M10 14V5a2 2 0 014 0v9a4 4 0 11-4 0z" /></>),
  sigma: (<><path d="M18 5H6l6 7-6 7h12" /></>),
};

const RULES: [RegExp, keyof typeof ICONS][] = [
  [/\btrigonometr/, 'trig'],
  [/\b(analitica|vector)/, 'vector'],
  [/\b(cuerpos|volumen)/, 'cube'],
  [/\b(geometr|pitagoras|semejanza)/, 'pythagoras'],
  [/\blogaritm/, 'log'],
  [/\binecuacion/, 'inequality'],
  [/\bsistema/, 'system'],
  [/\becuacion/, 'equation'],
  [/\bpolinom/, 'polynomial'],
  [/\b(potencia|raice|radical)/, 'radical'],
  [/\b(porcentaje|interes)/, 'percent'],
  [/\bproporcional/, 'proportion'],
  [/\b(fraccion|decimal)/, 'pie'],
  [/\b(divisib|primo|mcd|mcm)/, 'divide'],
  [/\b(conjunto|real|racional|irracional)/, 'numberline'],
  [/\bentero/, 'integers'],
  [/\b(algebra|expresion)/, 'algebra'],
  [/\b(sucesion|progresion)/, 'sequence'],
  [/\b(funcion|grafica)/, 'function'],
  [/\b(estadistic|parametro)/, 'stats'],
  [/\bcombinator/, 'tree'],
  [/\bprobabilidad/, 'dice'],
  [/\b(energia|trabajo|electr|corriente)/, 'bolt'],
  [/\b(cinematic|movimiento|velocidad)/, 'gauge'],
  [/\b(fuerza|dinamica|newton)/, 'force'],
  [/\b(atom|estructura|enlace|periodica)/, 'atom'],
  [/\b(reaccion|estequiometr|carbono|formulacion|redox|acido)/, 'flask'],
  [/\b(disolucion|mezcla)/, 'drop'],
  [/\b(gas|materia|estados)/, 'gas'],
  [/\b(onda|optica|sonido|luz)/, 'wave'],
  [/\bmagnet/, 'magnet'],
  [/\bgravit/, 'orbit'],
  [/\b(termo|calor|temperatura)/, 'thermo'],
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ');
}

export function TopicIcon({
  slug,
  title,
  className = 'w-6 h-6',
}: {
  slug?: string;
  title?: string;
  className?: string;
}) {
  const text = normalize(`${title || ''} ${slug || ''}`);
  const key = RULES.find(([re]) => re.test(text))?.[1] ?? 'sigma';

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONS[key]}
    </svg>
  );
}