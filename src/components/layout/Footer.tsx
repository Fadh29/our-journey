import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-white via-rose-50/40 to-blush-100/50 pt-16 pb-12 border-t border-rose-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Monogram */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-soft border border-rose-200/60 mb-6">
          <span className="font-serif text-xl font-bold text-blush-600">R & A</span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl text-gray-900 font-bold mb-2">
          Raihan Fadhlurahman & Arum Mutiasari
        </h3>
        <p className="font-script text-xl text-blush-600 mb-6">
          Menuju Masa Depan Bersama
        </p>

        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto italic mb-8 leading-relaxed">
          "Semoga Allah memudahkan langkah kami, melimpahkan keberkahan rezeki, dan menyatukan kami dalam ikatan pernikahan yang sakinah, mawaddah, warahmah. Aamiin."
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-8">
          <span>Dibuat dengan segenap cinta</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          <span>oleh Raihan khusus untuk Arum</span>
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-blush-600 bg-white hover:bg-rose-50 border border-rose-200 px-4 py-2 rounded-full transition-all duration-200 shadow-xs"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          Kembali ke Atas
        </button>
      </div>
    </footer>
  );
};
