import type { ReactNode } from 'react';

const ICONS: Record<string, ReactNode> = {
  // --- Matemáticas ---
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
  limit: (<><path d="M4 4v16h16" /><path d="M6 8c6 0 9 3 10 10" /><path d="M18 5v15" strokeDasharray="2 2.5" /></>),
  derivative: (<><path d="M3 18c4 0 5-12 9-12s5 12 9 12" /><path d="M6 11l12-4" /><circle cx="12" cy="9" r="1.5" fill="currentColor" /></>),
  integral: (<><path d="M14 3c-2.5 0-3 1.5-3 4v10c0 2.5-.5 4-3 4" /><path d="M16 12h4M4 12h4" /></>),
  matrix: (<><path d="M8 4H5v16h3M16 4h3v16h-3" /><circle cx="10" cy="9" r="1" fill="currentColor" /><circle cx="14" cy="9" r="1" fill="currentColor" /><circle cx="10" cy="15" r="1" fill="currentColor" /><circle cx="14" cy="15" r="1" fill="currentColor" /></>),
  complex: (<><path d="M12 3v18M3 12h18" /><path d="M12 12l5-5" /><circle cx="17" cy="7" r="1.7" fill="currentColor" /></>),
  space: (<><path d="M12 12V3M12 12l8 5M12 12l-8 5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></>),
  sigma: (<><path d="M18 5H6l6 7-6 7h12" /></>),

  // --- Física ---
  bolt: (<><path d="M13 3L5 14h6l-1 7 8-11h-6z" /></>),
  gauge: (<><path d="M4 17a8 8 0 1116 0" /><path d="M12 17l4-5" /></>),
  force: (<><rect x="4" y="12" width="8" height="7" rx="1" /><path d="M12 15.5h8M17 12.5l3 3-3 3" /></>),
  momentum: (<><circle cx="6.5" cy="12" r="3" /><circle cx="17.5" cy="12" r="3" /><path d="M10 12h4M12.5 10l1.5 2-1.5 2" /></>),
  pendulum: (<><path d="M12 3L7 16M12 3l5 13" strokeDasharray="2 2.5" /><circle cx="6.5" cy="18" r="2.5" /></>),
  circuit: (<><path d="M5 12V6h6M15 6h4v12H5v-6" /><path d="M11 3v6M15 4.5v3" /></>),
  wave: (<><path d="M2 12c3-8 5-8 8 0s5 8 8 0 3-4 4-4" /></>),
  lens: (<><path d="M12 4c-4 3-4 13 0 16 4-3 4-13 0-16z" /><path d="M2 12h7M15 8l7-2M15 12h7M15 16l7 2" /></>),
  magnet: (<><path d="M6 3v8a6 6 0 0012 0V3h-4v8a2 2 0 01-4 0V3z" /></>),
  orbit: (<><circle cx="12" cy="12" r="4" /><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-20 12 12)" /></>),
  nuclear: (<><circle cx="12" cy="12" r="2" fill="currentColor" /><path d="M12 10V4M13.7 13l5.2 3M10.3 13l-5.2 3" /><circle cx="12" cy="12" r="9" /></>),
  thermo: (<><path d="M10 14V5a2 2 0 014 0v9a4 4 0 11-4 0z" /></>),
  flame: (<><path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z" /></>),

  // --- Química ---
  atom: (<><circle cx="12" cy="12" r="1.8" fill="currentColor" /><ellipse cx="12" cy="12" rx="9" ry="3.8" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" /></>),
  periodic: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M3 14h18M9 4v16M15 4v16" /></>),
  bond: (<><circle cx="7" cy="12" r="4" /><circle cx="17" cy="12" r="4" /><path d="M11 12h2" /></>),
  flask: (<><path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" /><path d="M7.5 15h9" /></>),
  organic: (<><path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z" /><circle cx="12" cy="12" r="3" /></>),
  drop: (<><path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" /></>),
  acid: (<><path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" /><path d="M12 12v5M9.5 14.5h5" /></>),
  redox: (<><path d="M5 8h13l-3-3M19 16H6l3 3" /></>),
  gas: (<><circle cx="8" cy="15" r="3" /><circle cx="16" cy="9" r="3.5" /><circle cx="16" cy="18" r="1.6" /><circle cx="7" cy="6" r="1.6" /></>),
};

const RULES: [RegExp, keyof typeof ICONS][] = [
  // Matemáticas (Bachillerato)
  [/\b(limite|continuidad|asintota)/, 'limit'],
  [/\bderivad/, 'derivative'],
  [/\b(integral|primitiva)/, 'integral'],
  [/\b(matric|determinant)/, 'matrix'],
  [/\bcomplej/, 'complex'],
  [/\b(espacio|tridimensional)/, 'space'],
  // Matemáticas (ESO)
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
  // Física
  [/\b(cantidad de movimiento|momento lineal|choque|colision|impulso)/, 'momentum'],
  [/\b(oscilac|armonico|pendulo|muelle|elastic)/, 'pendulum'],
  [/\b(electric|electrost|corriente|circuito|ohm)/, 'circuit'],
  [/\b(energia|trabajo|potencia mecanica)/, 'bolt'],
  [/\b(cinematic|movimiento|velocidad|mru|mrua)/, 'gauge'],
  [/\b(fuerza|dinamica|newton|rozamiento)/, 'force'],
  [/\b(optica|lente|espejo|refraccion|reflexion)/, 'lens'],
  [/\b(onda|sonido|luz|ondulatorio)/, 'wave'],
  [/\b(magnet|electromagnet|induccion)/, 'magnet'],
  [/\b(gravit|campo gravitatorio|kepler)/, 'orbit'],
  [/\b(nuclear|radiactiv|cuantica|relativ)/, 'nuclear'],
  [/\b(termoquimica|entalpia|combustion)/, 'flame'],
  [/\b(termo|calor|temperatura|dilatacion)/, 'thermo'],
  // Química
  [/\b(periodica|tabla periodica|elemento)/, 'periodic'],
  [/\b(enlace|molecul)/, 'bond'],
  [/\b(atom|estructura atomica|modelo atomico)/, 'atom'],
  [/\b(organica|carbono|hidrocarburo)/, 'organic'],
  [/\b(acido|base|ph|neutralizacion)/, 'acid'],
  [/\b(redox|oxidacion|reduccion|pila|electrolisis)/, 'redox'],
  [/\b(reaccion|estequiometr|formulacion|equilibrio|cinetica|mol)/, 'flask'],
  [/\b(disolucion|mezcla|solubilidad|concentracion)/, 'drop'],
  [/\b(gas|materia|estados|presion)/, 'gas'],
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ');
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Glifo geométrico único y estable por tema (cuando ninguna regla coincide)
function GeneratedGlyph({ seed }: { seed: string }) {
  const h = hash(seed);
  const sides = 3 + (h % 6); // 3..8 lados
  const rotation = (h >> 3) % 360;
  const inner = (h >> 9) % 4;

  const pts = Array.from({ length: sides }, (_, i) => {
    const a = (Math.PI * 2 * i) / sides - Math.PI / 2;
    return `${(12 + 8.5 * Math.cos(a)).toFixed(2)},${(12 + 8.5 * Math.sin(a)).toFixed(2)}`;
  }).join(' ');

  return (
    <g transform={`rotate(${rotation} 12 12)`}>
      <polygon points={pts} />
      {inner === 0 && <circle cx="12" cy="12" r="2.6" />}
      {inner === 1 && <path d="M12 6v12M6 12h12" />}
      {inner === 2 && <circle cx="12" cy="12" r="1.5" fill="currentColor" />}
      {inner === 3 && <polygon points="12,8 15.5,14 8.5,14" />}
    </g>
  );
}

export function TopicIcon({
  slug,
  title,
  name,
  className = 'w-6 h-6',
}: {
  slug?: string;
  title?: string;
  name?: string | null; // override manual (clave de ICONS)
  className?: string;
}) {
  const text = normalize(`${title || ''} ${slug || ''}`);

  const key =
    (name && name in ICONS ? name : undefined) ??
    RULES.find(([re]) => re.test(text))?.[1];

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
      {key ? ICONS[key] : <GeneratedGlyph seed={slug || title || 'topic'} />}
    </svg>
  );
}