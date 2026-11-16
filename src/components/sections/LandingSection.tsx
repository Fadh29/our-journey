import React from 'react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';

interface LandingSectionProps {
  onStartJourney: () => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ onStartJourney }) => {
  return (
    <section
      id="landing"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-blush-50/30"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-champagne-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
        {/* Sweet intro badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200/70 shadow-xs mb-6 animate-pulse-subtle">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span className="text-xs md:text-sm font-medium text-gray-700 tracking-wide">
            Sebuah Persembahan Khusus untuk Arum Mutiasari
          </span>
          <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
        </div>

        {/* Exact title required by specification */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight md:leading-tight max-w-4xl mx-auto mb-6 tracking-tight">
          Presentasi awal Journey of Raihan Fadhlurahman dan Arum Mutiasari
        </h1>

        {/* Romantic Subtitle */}
        <p className="font-script text-2xl sm:text-3xl md:text-4xl text-blush-600 mb-8 max-w-2xl mx-auto">
          "Dari pertemuan tak terduga, melangkah bersama merajut masa depan."
        </p>

        {/* Photo Container - Elegant Polaroid / Frame */}
        <div className="relative max-w-md mx-auto mb-10 group">
          <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-soft-lg border border-rose-100 transition-transform duration-500 group-hover:scale-[1.01]">
            <div className="overflow-hidden rounded-2xl aspect-[3/4] bg-rose-50">
              <img
                src="./images/hero-landing.webp"
                alt="Raihan Fadhlurahman & Arum Mutiasari"
                width={1439}
                height={1920}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
            </div>
            {/* Caption underneath photo */}
            <div className="pt-3 pb-1 text-center">
              <p className="font-script text-xl sm:text-2xl text-gray-800">
                Raihan & Arum
              </p>
              <p className="text-[11px] sm:text-xs text-blush-500 uppercase tracking-widest font-medium">
                Our Journey Begins • 2026
              </p>
            </div>
          </div>

          {/* Decorative Corner Embellishments */}
          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-champagne-100 border border-champagne-300 flex items-center justify-center text-xs shadow-xs">
            🌸
          </div>
          <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-xs shadow-xs">
            ✨
          </div>
        </div>

        {/* Brief Intro */}
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
          Selamat datang di halaman perjalanan kita, sayang. Di sini Raihan merangkum setiap kisah manis
          pertemuan kita, komitmen hati, serta langkah nyata dan kalkulasi terencana untuk menyongsong
          pernikahan impian kita bersama.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartJourney}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blush-500 via-rose-500 to-blush-600 text-white font-medium text-base shadow-soft hover:shadow-soft-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Mulai Jelajahi Perjalanan Kita</span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
