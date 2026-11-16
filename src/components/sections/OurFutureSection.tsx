import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { futureMilestones, futureNotes } from '../../data/future';
import { Home, CheckCircle2, Sparkles, Heart } from 'lucide-react';

export const OurFutureSection: React.FC = () => {
  return (
    <section id="future" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        subtitle="Rencana Masa Depan yang Kita Rancang Bersama"
        title="Our Future Timeline"
        description="Peta perjalanan menuju satu tujuan: Membangun keluarga yang sakinah, mawaddah, warahmah dengan ikhtiar nyata dan doa."
      />

      {/* Future Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {futureMilestones.map((milestone, idx) => {
          const isWeddingYear = milestone.year === '2029';

          return (
            <div
              key={milestone.year}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                isWeddingYear
                  ? 'bg-gradient-to-b from-rose-500 to-blush-600 text-white shadow-soft-lg scale-[1.02] border border-rose-400'
                  : 'bg-white text-gray-900 shadow-soft border border-rose-100 hover:border-blush-300'
              }`}
            >
              {/* Year & Badge Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-serif text-4xl sm:text-5xl font-bold tracking-tight ${
                      isWeddingYear ? 'text-white' : 'text-blush-600'
                    }`}
                  >
                    {milestone.year}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      isWeddingYear
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}
                  >
                    {milestone.badge}
                  </span>
                </div>

                <h3
                  className={`font-serif text-xl sm:text-2xl font-bold mb-2 ${
                    isWeddingYear ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {milestone.title}
                </h3>

                <p
                  className={`text-xs sm:text-sm mb-6 ${
                    isWeddingYear ? 'text-rose-100' : 'text-gray-600'
                  }`}
                >
                  {milestone.description}
                </p>

                {/* Items List */}
                <div className="space-y-3">
                  {milestone.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isWeddingYear ? 'text-champagne-300' : 'text-blush-500'
                        }`}
                      />
                      <span
                        className={`leading-relaxed ${
                          isWeddingYear ? 'text-rose-50' : 'text-gray-700'
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="mt-8 pt-4 border-t border-current/15 flex items-center justify-between text-xs font-medium">
                <span>Fase 0{idx + 1}</span>
                {isWeddingYear ? (
                  <span className="flex items-center gap-1 text-champagne-200">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    Hari Bahagia
                  </span>
                ) : (
                  <span className="text-gray-400">Menuju Pelaminan</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Future Planning: Rumah & Pernikahan */}
      <div className="bg-gradient-to-br from-champagne-50 via-white to-rose-50 p-6 sm:p-8 rounded-3xl border border-champagne-200/80 shadow-soft mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-champagne-100 text-champagne-700 flex items-center justify-center shrink-0 shadow-xs">
            <Home className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100/70 text-champagne-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Prioritas Bersama
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {futureNotes.dualPriorityTitle}
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {futureNotes.dualPriorityText}
            </p>
          </div>
        </div>
      </div>

      {/* Closing Prayer & Flexibility Note */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-rose-100 shadow-soft text-center max-w-3xl mx-auto">
        <p className="font-serif text-lg sm:text-xl font-bold text-blush-700 mb-3">
          "{futureNotes.closingPrayer}"
        </p>
        <p className="text-xs text-gray-500 italic leading-relaxed">
          {futureNotes.flexibilityNote}
        </p>
      </div>
    </section>
  );
};
