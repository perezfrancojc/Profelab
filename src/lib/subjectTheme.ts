export type SubjectKey = 'mat' | 'fq';

export const THEME = {
  mat: {
    accent: 'text-red-600',
    accentHover: 'group-hover:text-red-600',
    iconBox: 'bg-red-50 border-red-100 text-red-600',
    iconBoxHover: 'group-hover:bg-red-600 group-hover:text-white',
    topicHoverBorder: 'hover:border-red-500/40',
    badgeHoverText: 'group-hover:text-red-700',
    badgeHoverBg: 'group-hover:bg-red-50/70',
    badgeHoverRing: 'group-hover:ring-red-500/25',
    badgeHoverShadow:
      'group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_-8px_rgba(220,38,38,0.35)]',
    dot: 'group-hover:bg-red-500',
    ping: 'bg-red-500',
  },
  fq: {
    accent: 'text-blue-600',
    accentHover: 'group-hover:text-blue-600',
    iconBox: 'bg-blue-50 border-blue-100 text-blue-600',
    iconBoxHover: 'group-hover:bg-blue-600 group-hover:text-white',
    topicHoverBorder: 'hover:border-blue-500/40',
    badgeHoverText: 'group-hover:text-blue-700',
    badgeHoverBg: 'group-hover:bg-blue-50/70',
    badgeHoverRing: 'group-hover:ring-blue-500/25',
    badgeHoverShadow:
      'group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_-8px_rgba(37,99,235,0.35)]',
    dot: 'group-hover:bg-blue-500',
    ping: 'bg-blue-500',
  },
} as const;

export function themeFor(subject: string) {
  return subject.toLowerCase().includes('fisica') ? THEME.fq : THEME.mat;
}