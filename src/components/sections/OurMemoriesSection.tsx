import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Modal } from '../ui/Modal';
import { photoMemories } from '../../data/memories';
import { MemoryItem } from '../../types/memories';
import { Calendar, ZoomIn, Heart } from 'lucide-react';

export const OurMemoriesSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        subtitle="Galeri Kenangan Manis yang Abadi"
        title="Our Little Memories"
        description="Potret-potret sederhana saksi bisu kebahagiaan, tawa, dan rasa nyaman yang tumbuh di antara kita."
      />

      {/* Polaroid Scrapbook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-center justify-center">
        {photoMemories.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className={`cursor-pointer group bg-white p-4 sm:p-5 rounded-3xl shadow-polaroid border border-rose-100/80 transition-all duration-300 hover:scale-105 hover:shadow-soft-lg hover:z-20 ${
              item.rotation || ''
            }`}
          >
            {/* Photo Container */}
            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-rose-50 mb-4">
              <img
                src={item.image}
                alt={item.title}
                width={1440}
                height={1920}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-3 rounded-full bg-white/80 text-gray-800 shadow-lg">
                  <ZoomIn className="w-5 h-5 text-blush-600" />
                </span>
              </div>
              {item.tag && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/90 text-blush-600 shadow-xs backdrop-blur-xs">
                  {item.tag}
                </span>
              )}
            </div>

            {/* Handwritten-style Caption */}
            <div className="text-center px-1">
              <h4 className="font-serif font-bold text-gray-900 text-base mb-1">
                {item.title}
              </h4>
              <p className="font-script text-base text-blush-600 line-clamp-2 mb-2">
                "{item.caption}"
              </p>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                <Calendar className="w-3 h-3 text-blush-400" />
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={selectedPhoto !== null}
        onClose={() => setSelectedPhoto(null)}
        title={selectedPhoto?.title}
      >
        {selectedPhoto && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl aspect-[3/4] max-h-[60vh] bg-rose-50 flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center pt-2">
              <p className="font-script text-xl sm:text-2xl text-blush-700 mb-1">
                "{selectedPhoto.caption}"
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-blush-500" />
                <span>{selectedPhoto.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-rose-500">
                  <Heart className="w-3 h-3 fill-current" />
                  Kenangan Kita
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
