'use client';

function extractYouTubeId(input: string | null | undefined): string {
  if (!input) return '';
  const str = String(input).trim();

  // Si ya son exactamente los 11 caracteres del ID (ej: DYRnCpqmTRo)
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }

  // Extraer ID de URLs cortas (youtu.be), estándar (watch?v=), embebidas o shorts
  const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (match && match[1]) {
    return match[1];
  }

  // Búsqueda de respaldo: cualquier secuencia de 11 caracteres en la URL
  const fallbackMatch = str.match(/([a-zA-Z0-9_-]{11})/);
  if (fallbackMatch && fallbackMatch[1]) {
    return fallbackMatch[1];
  }

  return '';
}

interface YouTubeFacadeProps {
  youtubeId: string;
  title: string;
}

export function YouTubeFacade({ youtubeId, title }: YouTubeFacadeProps) {
  const cleanId = extractYouTubeId(youtubeId);

  if (!cleanId) {
    return (
      <div className="w-full aspect-video bg-slate-100 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-500 text-xs font-medium p-4 text-center">
        <span>No se pudo procesar el vídeo (Dato recibido: "{String(youtubeId || 'vacío')}")</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-sm">
      <iframe
        src={`https://www.youtube.com/embed/${cleanId}`}
        title={title}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}