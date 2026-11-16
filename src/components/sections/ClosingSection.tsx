import React from 'react';
import { Heart, RotateCcw } from 'lucide-react';

interface ClosingSectionProps {
  onRestart: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onRestart }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <div className="bg-gradient-to-b from-rose-50 via-white to-blush-50 p-8 sm:p-14 rounded-3xl border border-rose-200 shadow-soft-lg relative overflow-hidden">
        {/* Floating Heart Icon */}
        <div className="w-16 h-16 rounded-full bg-blush-100 text-blush-600 flex items-center justify-center mx-auto mb-6 shadow-soft">
          <Heart className="w-8 h-8 fill-blush-500 text-blush-500 animate-pulse" />
        </div>

        <p className="font-script text-2xl sm:text-3xl text-blush-600 mb-2">
          Terima Kasih Telah Membaca Hingga Akhir
        </p>

        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
          "Kita Mulai Babak Baru Ini Bersama, Sayang."
        </h3>

        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
          Apapun tantangan di depan, Raihan percaya jika kita saling menguatkan, menjaga komunikasi,
          dan memohon pertolongan Allah, setiap impian kita akan menjadi kenyataan yang indah.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-rose-50 border border-rose-200 text-gray-700 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kembali ke Awal Presentasi</span>
          </button>
        </div>
      </div>
    </section>
  );
};
