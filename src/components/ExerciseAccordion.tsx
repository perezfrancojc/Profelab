'use client';

import { useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  statement: string;
  solution?: string;
  difficulty?: string;
}

interface ExerciseProps {
  exercise: Exercise;
}

export function ExerciseAccordion({ exercise }: ExerciseProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition hover:border-slate-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex items-start justify-between gap-4 bg-white hover:bg-slate-50/80 transition"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {exercise.difficulty && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {exercise.difficulty}
              </span>
            )}
            <h3 className="text-sm font-bold text-slate-900">{exercise.title}</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pt-1">{exercise.statement}</p>
        </div>
        <div className={`p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-red-50 text-red-600' : ''}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {isOpen && (
        <div className="p-5 bg-slate-50/70 border-t border-slate-100 text-xs text-slate-700 space-y-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Solución explicada:</span>
          </div>
          <div className="prose prose-slate max-w-none text-xs leading-relaxed whitespace-pre-line pl-5 border-l-2 border-red-500/40">
            {exercise.solution || 'La solución detallada para este ejercicio estará disponible próximamente.'}
          </div>
        </div>
      )}
    </div>
  );
}