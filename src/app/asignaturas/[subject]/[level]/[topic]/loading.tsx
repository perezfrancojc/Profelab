export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      <div className="h-[72px] border-b border-slate-200/70 bg-[#F1EFE8]" />
      <main className="skeleton-delay max-w-4xl mx-auto px-6 py-12 space-y-10 animate-pulse max-sm:px-4 max-sm:py-6">
        <div className="border-b border-slate-200/80 pb-8 space-y-3">
          <div className="h-3 w-28 rounded bg-slate-200" />
          <div className="h-10 w-3/4 rounded bg-slate-200" />
          <div className="h-4 w-2/3 rounded bg-slate-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3">
              <div className="aspect-video rounded-xl bg-slate-100" />
              <div className="h-4 w-2/3 rounded bg-slate-200" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-3">
          <div className="h-5 w-1/3 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-5/6 rounded bg-slate-100" />
        </div>
      </main>
    </div>
  );
}