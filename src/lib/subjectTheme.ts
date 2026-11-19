export type SubjectKey = 'mat' | 'fq';

// Matemáticas: naranja quemado  #D2560F
// Física y Química: azul        #0A5FCC
export const THEME = {
  mat: {
    accent: 'text-[#D2560F]',
    accentHover: 'group-hover:text-[#D2560F]',
    iconBox: 'border-transparent bg-[#D2560F]/[0.09] text-[#D2560F]',
    iconBoxHover: 'group-hover:bg-[#D2560F] group-hover:text-white',
    topicHoverBorder: 'hover:border-slate-300',
    badgeHoverText: 'group-hover:text-[#D2560F]',
    badgeHoverBg: 'group-hover:bg-[#D2560F]/[0.07]',
    dot: 'group-hover:bg-[#D2560F]',
  },
  fq: {
    accent: 'text-[#0A5FCC]',
    accentHover: 'group-hover:text-[#0A5FCC]',
    iconBox: 'border-transparent bg-[#0A5FCC]/[0.09] text-[#0A5FCC]',
    iconBoxHover: 'group-hover:bg-[#0A5FCC] group-hover:text-white',
    topicHoverBorder: 'hover:border-slate-300',
    badgeHoverText: 'group-hover:text-[#0A5FCC]',
    badgeHoverBg: 'group-hover:bg-[#0A5FCC]/[0.07]',
    dot: 'group-hover:bg-[#0A5FCC]',
  },
} as const;

export function themeFor(subject: string) {
  return subject.toLowerCase().includes('fisica') ? THEME.fq : THEME.mat;
}