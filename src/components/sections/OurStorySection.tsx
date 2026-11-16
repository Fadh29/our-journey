import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { storyMilestones, whyIChooseArum } from '../../data/journey';
import { Heart, Sparkles, Quote } from 'lucide-react';

export const OurStorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        subtitle="Setiap Detik Bersamamu Adalah Anugerah"
        title="Our Story"
        description="Jejak langkah perjalanan bagaimana takdir menuntun dua hati bertemu, saling jatuh cinta, dan mengikat komitmen suci."
      />

      {/* Timeline Section */}
      <div className="relative mb-24">
        {/* Central connecting line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-10 bottom-10 -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-200 via-blush-300 to-rose-200" />

        <div className="space-y-16 md:space-y-24">
          {storyMilestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node icon on center line */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-blush-400 items-center justify-center shadow-soft z-10 text-xs font-serif font-bold text-blush-600">
                  {index + 1}
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2">
                  <div
                    className={`bg-white p-6 sm:p-8 rounded-3xl shadow-soft border border-rose-100 hover:border-blush-200 transition-all ${
                      isEven ? 'md:mr-10' : 'md:ml-10'
                    }`}
                  >
                    {/* Date & Badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold tracking-wide border border-rose-200/50">
                        {item.date}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-champagne-50 text-champagne-800 text-[11px] font-medium border border-champagne-200/60">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="font-script text-lg text-blush-600 mb-4">
                      {item.subtitle}
                    </p>

                    <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                      {item.description.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Highlight Box / Quote */}
                    {item.highlight && (
                      <div className="mt-4 p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100/70 text-xs text-rose-900 font-medium flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-blush-500 shrink-0 mt-0.5" />
                        <span>{item.highlight}</span>
                      </div>
                    )}

                    {item.quote && (
                      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-rose-100/80 to-blush-100/80 border border-rose-200 text-center">
                        <p className="font-script text-3xl font-bold text-blush-700 tracking-wider">
                          {item.quote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Photo Side */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div
                    className={`relative w-full max-w-sm bg-white p-3 sm:p-4 rounded-3xl shadow-polaroid border border-rose-100 transition-transform duration-300 hover:scale-[1.02] ${
                      isEven ? 'rotate-1' : '-rotate-1'
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl aspect-[3/4] bg-rose-50">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        width={1440}
                        height={1920}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                    <div className="pt-3 pb-1 text-center">
                      <p className="font-script text-lg text-gray-700">{item.title}</p>
                      <p className="text-[11px] text-gray-400">{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WHY I CHOOSE ARUM SECTION */}
      <div className="bg-gradient-to-br from-rose-50/90 via-white to-blush-50/70 p-6 sm:p-10 md:p-14 rounded-3xl shadow-soft-lg border border-rose-200/80 relative overflow-hidden">
        {/* Subtle decorative heart watermark */}
        <Heart className="absolute -bottom-10 -right-10 w-72 h-72 text-rose-200/30 fill-rose-100/20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-blush-600 text-xs font-semibold shadow-xs border border-rose-200 mb-3">
              <Heart className="w-3.5 h-3.5 fill-blush-500" />
              Satu Pilihan Untuk Selamanya
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
              {whyIChooseArum.title}
            </h3>
            <p className="font-script text-2xl text-blush-600">
              {whyIChooseArum.subtitle}
            </p>
          </div>

          {/* Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {whyIChooseArum.points.map((pt, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl shadow-xs border border-rose-100 hover:border-blush-300 transition-all flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-blush-100 text-blush-600 flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-gray-900 text-base mb-1">
                    {pt.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {pt.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Personal Declaration Box */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-rose-200 shadow-soft text-center mb-8 relative">
            <Quote className="w-8 h-8 text-rose-200 mx-auto mb-3" />
            <p className="font-serif text-base sm:text-lg text-gray-800 italic leading-relaxed max-w-2xl mx-auto mb-4">
              "{whyIChooseArum.personalDeclaration}"
            </p>
            <p className="font-script text-xl text-blush-600">
              — Raihan Fadhlurahman
            </p>
          </div>

          {/* SAMAWA Closing Prayer */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blush-500 via-rose-500 to-blush-600 text-white text-center shadow-soft">
            <p className="text-xs uppercase tracking-widest text-rose-100 font-semibold mb-1">
              Doa Tulus Kita Berdua
            </p>
            <p className="font-serif text-base sm:text-lg font-medium leading-relaxed">
              "{whyIChooseArum.closingPrayer}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
