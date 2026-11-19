'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';
import type { Quiz } from '@/types';
import { MathText } from '@/components/Math';

interface QuizProps {
  quiz: Quiz;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

function resultFor(pct: number) {
  if (pct >= 90) return { text: '¡Excelente! Dominas este tema.', color: 'text-emerald-700', bar: 'bg-emerald-500' };
  if (pct >= 70) return { text: '¡Muy bien! Repasa los fallos y lo tendrás.', color: 'text-emerald-700', bar: 'bg-emerald-500' };
  if (pct >= 50) return { text: 'Vas por buen camino. Repasa la teoría y repite el test.', color: 'text-amber-700', bar: 'bg-amber-500' };
  return { text: 'Conviene repasar el tema antes de volver a intentarlo.', color: 'text-red-700', bar: 'bg-red-500' };
}

export function QuizRunner({ quiz }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = quiz.questions || [];
  if (!questions.length) return null;

  const total = questions.length;
  const isCompleted = currentQuestionIndex >= total;
  const current = (questions[currentQuestionIndex] ?? {}) as any;

  const questionText: string =
    current.text ?? current.question ?? current.statement ?? current.prompt ?? '';
  const options: string[] = current.options ?? [];
  const correctAnswer: number = Number(
    current.correctAnswer ?? current.correctOptionIndex ?? current.correctOption ?? 0
  );
  const explanation: string | undefined = current.explanation;

  const progress = isCompleted ? 100 : (currentQuestionIndex / total) * 100;
  const pct = Math.round((score / total) * 100);
  const result = resultFor(pct);

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === correctAnswer) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <HelpCircle className="w-5 h-5 text-slate-500 shrink-0" />
          <h3 className="font-bold text-slate-900 text-base truncate">{quiz.title}</h3>
        </div>
        {!isCompleted && (
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md shrink-0">
            {currentQuestionIndex + 1} / {total}
          </span>
        )}
      </div>

      {/* Barra de progreso */}
      <div
        className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden mb-6"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div
          className="h-full rounded-full bg-slate-800 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!isCompleted ? (
        <div key={currentQuestionIndex} className="quiz-in space-y-5">
          <p className="text-[15px] font-semibold text-slate-900 leading-relaxed">
            <MathText text={questionText} />
          </p>

          <div className="space-y-2.5">
            {options.map((option, idx) => {
              const isCorrect = idx === correctAnswer;
              const isSelected = selectedOption === idx;

              let box = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300';
              let letter = 'bg-slate-100 text-slate-600';

              if (isSelected && !isSubmitted) {
                box = 'bg-slate-900 border-slate-900 text-white';
                letter = 'bg-white/20 text-white';
              }

              if (isSubmitted) {
                if (isCorrect) {
                  box = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                  letter = 'bg-emerald-500 text-white';
                } else if (isSelected) {
                  box = 'bg-red-50 border-red-400 text-red-900';
                  letter = 'bg-red-500 text-white';
                } else {
                  box = 'bg-white border-slate-200 text-slate-400';
                  letter = 'bg-slate-100 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3 rounded-xl border text-sm font-medium transition flex items-center gap-3 ${box}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition ${letter}`}
                  >
                    {LETTERS[idx] ?? idx + 1}
                  </span>
                  <span className="flex-1">
                    <MathText text={option} />
                  </span>
                  {isSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {isSubmitted && explanation && (
            <div className="quiz-in p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-sm text-slate-700 leading-relaxed">
              <strong className="block text-slate-900 mb-1">Explicación</strong>
              <MathText text={explanation} />
            </div>
          )}

          <div className="flex justify-end pt-1">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition"
              >
                Comprobar respuesta
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition"
              >
                {currentQuestionIndex === total - 1 ? 'Ver resultado' : 'Siguiente pregunta'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-in text-center py-4 space-y-5">
          <div>
            <p className="text-6xl font-black tracking-tight text-slate-900">
              {pct}
              <span className="text-3xl text-slate-400">%</span>
            </p>
            <p className="text-sm text-slate-600 mt-1">
              <strong className="text-slate-900">{score}</strong> de{' '}
              <strong className="text-slate-900">{total}</strong> respuestas correctas
            </p>
          </div>

          <div className="h-2 w-full max-w-xs mx-auto rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${result.bar}`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <p className={`text-sm font-semibold ${result.color}`}>{result.text}</p>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-4 py-2.5 rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" /> Repetir cuestionario
          </button>
        </div>
      )}
    </div>
  );
}