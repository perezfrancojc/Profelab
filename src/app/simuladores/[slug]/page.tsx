import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SectionFusionHeader, FusionSection } from '@/components/SectionFusionHeader';
import { SIMULATORS } from '@/data/simulators';
import { SIMULATOR_COMPONENTS } from '@/data/simulatorComponents';
import { THEME } from '@/lib/subjectTheme';
import { SITE_URL } from '@/lib/config';

export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SIMULATORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sim = SIMULATORS.find((s) => s.slug === slug);
  if (!sim) return {};

  const title = `${sim.title} | Simulador | JuancaEduca`;
  const canonical = `${SITE_URL}/simuladores/${sim.slug}`;

  return {
    title,
    description: sim.description,
    alternates: { canonical },
    openGraph: { title, description: sim.description, url: canonical, siteName: 'JuancaEduca', locale: 'es_ES', type: 'website' },
  };
}

export default async function SimulatorPage({ params }: Props) {
  const { slug } = await params;
  const sim = SIMULATORS.find((s) => s.slug === slug);
  const Component = SIMULATOR_COMPONENTS[slug];

  if (!sim || !Component) notFound();

  const theme = THEME[sim.subject];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased">
      <SectionFusionHeader
        title={sim.title}
        compactTitle={sim.title}
        backHref="/simuladores"
        backLabel="Simuladores"
        triggerId="sim-detail-heading"
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <FusionSection id="sim-detail-heading">
          <div className="border-b border-slate-200/80 pb-6">
            <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${theme.accent}`}>
              Simulador · {sim.levels}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{sim.title}</h1>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">{sim.description}</p>
          </div>
        </FusionSection>

        <Component />
      </main>
    </div>
  );
}