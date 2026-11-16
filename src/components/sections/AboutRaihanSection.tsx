import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { raihanProfile } from '../../data/profile';
import {
  User,
  Calendar,
  HeartHandshake,
  Briefcase,
  Gamepad2,
  Compass,
  MapPin,
  Phone,
  Mail,
  Ruler,
  Weight,
  Sparkles,
} from 'lucide-react';

export const AboutRaihanSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        subtitle="Mengenal Calon Suami & Teman Seumur Hidup"
        title="Tentang Raihan"
        description="Sosok yang siap memimpin dengan kelembutan, bekerja dengan ketulusan, dan mendampingi Arum di setiap langkah menuju masa depan."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Portrait & Essence Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-md bg-white p-4 sm:p-5 rounded-3xl shadow-soft-lg border border-rose-100 relative">
            {/* Photo frame */}
            <div className="overflow-hidden rounded-2xl aspect-[3/4] bg-rose-50 mb-4 relative group">
              <img
                src={raihanProfile.photo}
                alt={raihanProfile.name}
                width={1439}
                height={1920}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-serif text-xl font-bold">{raihanProfile.name}</p>
                <p className="text-xs text-rose-100 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
                  Calon Imam & Pasangan Hidup
                </p>
              </div>
            </div>

            {/* Quote / Bio */}
            <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-center">
              <p className="font-script text-xl text-blush-700 leading-snug">
                "{raihanProfile.bioQuotes}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Groupings */}
        <div className="lg:col-span-7 space-y-6">
          {/* Group 1: Profil Pribadi & Fisik */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-rose-100/80 hover:border-blush-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blush-100 text-blush-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Profil Pribadi & Karakteristik
                </h3>
                <p className="text-xs text-gray-500">Identitas dan data fisik</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/40">
                <Calendar className="w-4 h-4 text-blush-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">Tempat & Tanggal Lahir</span>
                  <span className="font-medium text-gray-800">{raihanProfile.birthPlaceDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/40">
                <Ruler className="w-4 h-4 text-blush-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">Tinggi Badan</span>
                  <span className="font-medium text-gray-800">{raihanProfile.physical.height}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/40">
                <Weight className="w-4 h-4 text-blush-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">Berat Badan</span>
                  <span className="font-medium text-gray-800">{raihanProfile.physical.weight}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/40">
                <Sparkles className="w-4 h-4 text-blush-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">Ciri Khas</span>
                  <span className="font-medium text-gray-800">Berkacamata (sama seperti Arum)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Group 2: Keluarga Tercinta */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-rose-100/80 hover:border-blush-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-champagne-100 text-champagne-700 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Keluarga Tercinta
                </h3>
                <p className="text-xs text-gray-500">Keluarga tempat Raihan bertumbuh</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="inline-block px-3 py-1 rounded-full bg-champagne-50 border border-champagne-200 text-xs font-semibold text-champagne-800 mb-1">
                {raihanProfile.family.role}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-rose-50/30 border border-rose-100/50">
                  <span className="text-xs text-gray-400 block">Ayah Tercinta</span>
                  <p className="font-medium text-gray-800">{raihanProfile.family.father.name}</p>
                  <p className="text-xs text-gray-500">Usia {raihanProfile.family.father.age} tahun</p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/30 border border-rose-100/50">
                  <span className="text-xs text-gray-400 block">Ibu Tercinta</span>
                  <p className="font-medium text-gray-800">{raihanProfile.family.mother.name}</p>
                  <p className="text-xs text-gray-500">Usia {raihanProfile.family.mother.age} tahun</p>
                </div>
              </div>
            </div>
          </div>

          {/* Group 3: Karir & Tempat Kerja */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-rose-100/80 hover:border-blush-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Pekerjaan & Dedikasi
                </h3>
                <p className="text-xs text-gray-500">Profesi yang dijalani</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3.5 rounded-xl bg-rose-50/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-gray-900 text-base">{raihanProfile.career.company}</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-blush-100 text-blush-700 text-xs font-medium w-fit">
                    {raihanProfile.career.position}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-600 space-y-1">
                  <p className="font-medium text-gray-700">Lokasi Kerja:</p>
                  {raihanProfile.career.locations.map((loc, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blush-500 mt-0.5 shrink-0" />
                      <span>{loc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Group 4: Hobi & Keseharian */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-rose-100/80 hover:border-blush-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blush-100 text-blush-600 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Hobi & Minat
                </h3>
                <p className="text-xs text-gray-500">Hal-hal yang menyenangkan di waktu luang</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-rose-50/40 flex items-center gap-3">
                <Compass className="w-5 h-5 text-blush-500 shrink-0" />
                <span className="font-medium text-gray-800">Traveling & Eksplorasi Alam</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/40 flex items-center gap-3">
                <Gamepad2 className="w-5 h-5 text-blush-500 shrink-0" />
                <span className="font-medium text-gray-800">Simulator Games</span>
              </div>
            </div>
          </div>

          {/* Group 5: Kontak & Alamat */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-rose-100/80 hover:border-blush-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-champagne-100 text-champagne-700 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Kontak & Rumah Pulang
                </h3>
                <p className="text-xs text-gray-500">Keterbukaan informasi komunikasi</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${raihanProfile.contact.phone}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50/40 hover:bg-rose-100/60 transition-colors text-gray-800 font-medium"
                >
                  <Phone className="w-4 h-4 text-blush-500" />
                  <span>{raihanProfile.contact.phone}</span>
                </a>

                <a
                  href={`mailto:${raihanProfile.contact.email}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50/40 hover:bg-rose-100/60 transition-colors text-gray-800 font-medium truncate"
                >
                  <Mail className="w-4 h-4 text-blush-500 shrink-0" />
                  <span className="truncate">{raihanProfile.contact.email}</span>
                </a>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/40 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blush-500 mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">Alamat Rumah</span>
                  <span className="text-gray-800 font-medium leading-relaxed">
                    {raihanProfile.contact.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
