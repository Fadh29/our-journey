import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { letterForArum } from '../../data/letter';
import { Mail, Heart, Sparkles, Feather } from 'lucide-react';

export const LetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="letter" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SectionHeading
        subtitle="Dari Hati yang Terdalam"
        title="A Letter for Arum"
        description="Sebuah surat cinta khusus yang ditulis oleh Raihan untuk menemani langkah kita berdua."
      />

      <div className="relative">
        {!isOpen ? (
          /* Closed Envelope Presentation */
          <div className="max-w-xl mx-auto bg-gradient-to-br from-rose-100 via-white to-blush-100 p-8 sm:p-12 rounded-3xl shadow-soft-lg border border-rose-200 text-center relative overflow-hidden group">
            <div className="w-20 h-20 rounded-full bg-white shadow-soft flex items-center justify-center mx-auto mb-6 border border-rose-200 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-blush-500" />
            </div>

            <p className="font-script text-2xl text-blush-600 mb-2">
              Khusus untuk Arum Mutiasari
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ada Surat Cinta untukmu, Sayang
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Sentuh amplop di bawah ini untuk membuka dan membaca pesan dari Raihan.
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blush-500 via-rose-500 to-blush-600 text-white font-medium text-sm shadow-soft hover:shadow-soft-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Buka Surat</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Opened Love Letter Paper */
          <div className="max-w-3xl mx-auto bg-[#fffdfa] p-8 sm:p-14 rounded-3xl shadow-soft-lg border-2 border-rose-200/80 relative animate-in fade-in zoom-in-95 duration-500">
            {/* Wax Seal / Monogram Stamp */}
            <div className="flex items-center justify-between border-b border-rose-200/60 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blush-500 text-white flex items-center justify-center shadow-soft">
                  <Feather className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-serif font-bold text-gray-900 text-lg block">
                    {letterForArum.title}
                  </span>
                  <span className="text-xs text-gray-400">{letterForArum.date}</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-blush-600 hover:text-blush-800 underline cursor-pointer"
              >
                Lipat Kembali
              </button>
            </div>

            {/* Salutation */}
            <p className="font-script text-2xl sm:text-3xl text-blush-700 mb-6">
              {letterForArum.salutation}
            </p>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
              {letterForArum.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Letter Sign-off */}
            <div className="mt-10 pt-6 border-t border-rose-200/60 flex flex-col items-end">
              <p className="font-script text-xl text-gray-600 mb-1">
                {letterForArum.closing}
              </p>
              <p className="font-serif font-bold text-xl text-blush-700">
                {letterForArum.sender}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
