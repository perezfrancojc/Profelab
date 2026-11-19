export type SubjectKey = 'mat' | 'fq';

export const THEME = {
  mat: {
    accent: 'text-[#A32035]',
    accentHover: 'group-hover:text-[#A32035]',
    iconBox: 'border-transparent bg-[#A32035]/[0.07] text-[#A32035]',
    iconBoxHover: 'group-hover:bg-[#A32035] group-hover:text-white',
    topicHoverBorder: 'hover:border-slate-300',
    badgeHoverText: 'group-hover:text-[#A32035]',
    badgeHoverBg: 'group-hover:bg-[#A32035]/[0.06]',
    dot: 'group-hover:bg-[#A32035]',
  },
  fq: {
    accent: 'text-[#2B5C8A]',
    accentHover: 'group-hover:text-[#2B5C8A]',
    iconBox: 'border-transparent bg-[#2B5C8A]/[0.07] text-[#2B5C8A]',
    iconBoxHover: 'group-hover:bg-[#2B5C8A] group-hover:text-white',
    topicHoverBorder: 'hover:border-slate-300',
    badgeHoverText: 'group-hover:text-[#2B5C8A]',
    badgeHoverBg: 'group-hover:bg-[#2B5C8A]/[0.06]',
    dot: 'group-hover:bg-[#2B5C8A]',
  },
} as const;

export function themeFor(subject: string) {
  return subject.toLowerCase().includes('fisica') ? THEME.fq : THEME.mat;
}