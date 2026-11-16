import React, { useState } from 'react';
import { Heart, KeyRound, Sparkles, HelpCircle, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AccessPageProps {
  onUnlock: () => void;
}

export const AccessPage: React.FC<AccessPageProps> = ({ onUnlock }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const CORRECT_CODE = '09112026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === CORRECT_CODE) {
      setError(false);
      // Trigger romantic confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dc7493', '#f4acb7', '#fce7eb', '#c59f5e'],
      });
      setTimeout(() => {
        onUnlock();
      }, 500);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 via-white to-blush-100 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-champagne-200/50 blur-3xl pointer-events-none" />

      {/* Access Card */}
      <div
        className={`w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-soft-lg border border-rose-100 relative z-10 transition-transform ${
          shake ? 'animate-bounce' : ''
        }`}
      >
        {/* Floating Heart Badge */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-200 via-blush-200 to-rose-100 flex items-center justify-center shadow-soft">
              <Lock className="w-8 h-8 text-blush-600" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 fill-white" />
            </span>
          </div>
        </div>

        {/* Headings */}
        <div className="text-center mb-8">
          <p className="font-script text-2xl text-blush-600 mb-1">
            Our Private Journey
          </p>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Selamat Datang, Arum ❤️
          </h1>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            Halaman presentasi ini disiapkan khusus oleh Raihan untuk menyambut masa depan kita berdua.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="access-code"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 text-center"
            >
              Masukkan Kode Akses Spesial
            </label>
            <div className="relative">
              <input
                id="access-code"
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="••••••••"
                className="w-full text-center text-xl md:text-2xl font-mono tracking-widest px-4 py-3.5 bg-rose-50/50 border border-rose-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-blush-400 focus:border-blush-400 transition-all text-gray-800 placeholder-gray-300"
                autoFocus
              />
              <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Friendly Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center animate-in fade-in duration-200">
              <p className="font-medium">Kode salah nih sayang... 💕</p>
              <p className="text-[11px] text-rose-600 mt-0.5">
                Coba ingat tanggal jadian kita saat pertama kali nonton bareng!
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blush-500 via-rose-500 to-blush-600 text-white font-medium text-sm md:text-base shadow-soft hover:shadow-soft-lg hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Buka Presentasi Cinta</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>
        </form>

        {/* Clue/Hint Accordion */}
        <div className="mt-6 pt-4 border-t border-rose-100 text-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-xs text-blush-600 hover:text-blush-700 font-medium transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk?'}</span>
          </button>

          {showHint && (
            <div className="mt-3 p-3 rounded-xl bg-champagne-50/80 border border-champagne-200 text-gray-700 text-xs leading-relaxed animate-in fade-in duration-200">
              <p className="font-semibold text-champagne-800 mb-1">
                Tanggal Spesial Kita (DDMMYYYY):
              </p>
              <p className="text-gray-600">
                09 November 2026 — Hari pertama nonton "Gak Ada Matinya" & bergandengan tangan! 🍿❤️
              </p>
            </div>
          )}
        </div>

        {/* Note */}
        <p className="text-[11px] text-gray-400 text-center mt-6">
          Presentation Access Portal • Raihan & Arum
        </p>
      </div>
    </div>
  );
};
