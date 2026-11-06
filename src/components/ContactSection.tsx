'use client';

import { useState } from 'react';
import { Mail, Phone, User, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-16 px-6 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Tutorías Personalizadas
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ¿Necesitas tutorías online o ayuda personalizada?
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Escríbeme para agrupar clases particulares online, resolver dudas puntuales o solicitar información sobre el material.
          </p>
        </div>

        <div className="bg-[#FAF9F5] border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
          {status === 'success' ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">¡Mensaje enviado con éxito!</h3>
              <p className="text-sm text-slate-600">
                Gracias por contactar. Revisaré tu mensaje y te responderé al correo o teléfono facilitado lo antes posible.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-xs font-bold text-red-600 underline hover:text-red-700 pt-2"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nombre */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    ¿Quién eres? (Nombre)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Ej. Sofía (Alumna 2º ESO)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Teléfono de contacto
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="600 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Correo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="tuemail@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  ¿En qué te puedo ayudar?
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Cuéntame qué curso estudias, qué asignatura necesitas reforzar o tus horarios disponibles..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-white rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-red-500 transition resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Hubo un problema enviando el mensaje. Por favor, inténtalo de nuevo.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Enviando mensaje...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Solicitar tutoría o información
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}