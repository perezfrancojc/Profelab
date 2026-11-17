
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/75 backdrop-blur-xl border-b border-white/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
        <Link
          href="/"
          className="font-serif italic font-normal text-2xl text-red-600 tracking-tight hover:text-red-700 transition-colors"
        >
          JuancaEduca
        </Link>
      </div>
    </header>
  );
}
