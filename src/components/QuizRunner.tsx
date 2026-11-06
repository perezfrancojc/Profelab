'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';
import type { Quiz } from '@/types';

interface QuizProps {
  quiz: Quiz;
}

export function QuizRunner({ quiz }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex] as any;

  if (!questions.length) return null;

  // Garantiza lectura correcta sea cual sea el nombre del campo en src/types/index.ts
  const questionText = 
    currentQuestion?.question || 
    currentQuestion?.text || 
    currentQuestion?.statement || 
    currentQuestion?.prompt || 
    '';

  const options: string[] = currentQuestion?.options || [];
  const correctAnswer: number = currentQuestion?.correctAnswer ?? currentQuestion?.correctOption ?? 0;
  const explanation: string | undefined = currentQuestion?.explanation;

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === correctAnswer) {
      setScore((prev) => prev + 1);
    }
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

  const isCompleted = currentQuestionIndex >= questions.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-slate-900 text-base">{quiz.title}</h3>
        </div>
        {!isCompleted && (
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </span>
        )}
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
            {questionText}
          </p>

          <div className="space-y-2.5">
            {options.map((option, idx) => {
              let buttonStyle = "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100";
              
              if (selectedOption === idx) {
                buttonStyle = "bg-slate-900 text-white border-slate-900 font-semibold";
              }

              if (isSubmitted) {
                if (idx === correctAnswer) {
                  buttonStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                } else if (selectedOption === idx) {
                  buttonStyle = "bg-red-50 border-red-400 text-red-900";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition flex items-center justify-between ${buttonStyle}`}
                >
                  <span>{option}</span>
                  {isSubmitted && idx === correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && selectedOption === idx && idx !== correctAnswer && (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {isSubmitted && explanation && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600">
              <strong className="block text-slate-900 mb-1">Explicación:</strong>
              {explanation}
            </div>
          )}

          <div className="flex justify-end pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
              >
                Comprobar respuesta
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
              >
                Siguiente pregunta
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="inline-flex p-3 bg-red-50 text-red-600 rounded-full border border-red-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-extrabold text-slate-900">¡Cuestionario completado!</h4>
            <p className="text-xs text-slate-600 mt-1">
              Has acertado <strong className="text-slate-900">{score}</strong> de <strong className="text-slate-900">{questions.length}</strong> preguntas.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition mt-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Repetir cuestionario
          </button>
        </div>
      )}
    </div>
  );
}