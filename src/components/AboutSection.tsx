import React, { useState } from 'react';
import { Shield, MapPin, Award, Calendar, Flame, ChevronDown, ChevronUp, Users, HeartHandshake } from 'lucide-react';
import { ClubInfo } from '../data/clubData';
import { OfficialClubLogo } from './OfficialClubLogo';

interface AboutSectionProps {
  clubInfo: ClubInfo;
  onOpenSupport: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ clubInfo, onOpenSupport }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="profil" className="py-20 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
            PROFIL KLUB
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase">
            Tentang PSN Ngada
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 rounded-full" />
        </div>

        {/* Main Grid: Card Profil & Narasi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Crest Showcase & Regional Landscape */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              <div className="h-64 sm:h-72 overflow-hidden relative">
                <img
                  src={clubInfo.stadiumImageUrl}
                  alt="Stadion & Lanskap Bajawa Ngada"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-medium text-zinc-300">
                  Lanskap Bajawa & Pegunungan Ngada
                </span>
              </div>

              {/* Club Crest Lockup */}
              <div className="p-6 relative -mt-12 bg-zinc-950/95 backdrop-blur-md rounded-t-2xl border-t border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-950 border-2 border-orange-500 p-1 flex-shrink-0 shadow-lg">
                    <OfficialClubLogo customUrl={clubInfo.crestUrl} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-white">
                      {clubInfo.fullName}
                    </h3>
                    <p className="text-xs font-medium text-orange-500">
                      {clubInfo.nickname} · {clubInfo.competition}
                    </p>
                  </div>
                </div>

                {/* Key Facts List */}
                <div className="mt-6 space-y-3 text-xs border-t border-zinc-800/80 pt-4">
                  <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">Tahun Berdiri:</span>
                    <span className="text-zinc-200 font-semibold">{clubInfo.foundedYear}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">Kota / Kabupaten:</span>
                    <span className="text-zinc-200 font-semibold">{clubInfo.city}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">Provinsi:</span>
                    <span className="text-zinc-200 font-semibold">{clubInfo.province}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-zinc-900">
                    <span className="text-zinc-400">Stadion Kandang:</span>
                    <span className="text-zinc-200 font-semibold">{clubInfo.homeStadium}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-zinc-400">Warna Kebanggaan:</span>
                    <span className="text-red-400 font-semibold">{clubInfo.colors}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narasi & Identitas */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/50 border border-red-800/50 text-red-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              IDENTITAS & FILOSOFI
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Menjaga Kebanggaan Sepak Bola Nusa Tenggara Timur
            </h3>

            {/* Narasi Resmi sesuai User Prompt */}
            <blockquote className="p-5 border-l-4 border-red-600 bg-zinc-900/60 rounded-r-xl text-base text-zinc-200 leading-relaxed italic">
              "{clubInfo.description}"
            </blockquote>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Bagi masyarakat Ngada, sepak bola bukan sekadar olahraga, melainkan sarana persatuan
              dan pembuktian karakter pantang menyerah. Di setiap jengkal rumput hijau Stadion
              Lebijaga maupun di stadion lawan, para pemain mengemban amanah kehormatan daerah.
            </p>

            {/* Tiga Pilar Semangat */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
                <Shield className="w-5 h-5 text-red-500 mb-2" />
                <h4 className="font-bold text-sm text-white mb-1">Ketangguhan</h4>
                <p className="text-xs text-zinc-400">Disiplin dan daya tahan seperti Gunung Inerie.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
                <Users className="w-5 h-5 text-red-500 mb-2" />
                <h4 className="font-bold text-sm text-white mb-1">Kolektivitas</h4>
                <p className="text-xs text-zinc-400">Irama persaudaraan tarian Ja'i dalam setiap operan.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
                <HeartHandshake className="w-5 h-5 text-red-500 mb-2" />
                <h4 className="font-bold text-sm text-white mb-1">Sportivitas</h4>
                <p className="text-xs text-zinc-400">Menjunjung tinggi kehormatan dan kejujuran laga.</p>
              </div>
            </div>

            {/* Tombol Selengkapnya */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                {expanded ? (
                  <>
                    TUTUP RINCIAN <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    SELENGKAPNYA <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                onClick={onOpenSupport}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                DUKUNG PSN NGADA
              </button>
            </div>

            {/* Expandable Content Drawer */}
            {expanded && (
              <div className="mt-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs space-y-4 animate-in fade-in duration-300">
                <h4 className="font-bold text-sm text-white uppercase tracking-wider text-red-400">
                  Nilai & Komitmen Klub di Liga 3 Nasional
                </h4>
                <p className="text-zinc-300 leading-relaxed">
                  {clubInfo.philosophy}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-800 text-zinc-400">
                  <div>
                    <span className="block font-semibold text-zinc-200">Kapasitas Stadion:</span>
                    <span>{clubInfo.stadiumCapacity}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-zinc-200">Target Musim Ini:</span>
                    <span>Promosi ke kasta Liga 2 Nasional</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-zinc-200">Komitmen Pembinaan:</span>
                    <span>Mengorbitkan talenta muda putra daerah Flores & NTT</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-zinc-200">Sekretariat Resmi:</span>
                    <span>{clubInfo.contact.address}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
