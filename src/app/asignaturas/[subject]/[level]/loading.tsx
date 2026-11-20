export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      <div className="h-[72px] border-b border-slate-200/70 bg-[#F1EFE8]" />
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8 animate-pulse">
        <div className="border-b border-slate-200/80 pb-6 space-y-3">
          <div className="h-3 w-28 rounded bg-slate-200" />
          <div className="h-9 w-3/4 rounded bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/90 p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 rounded bg-slate-200" />
                <div className="h-3 w-2/3 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}