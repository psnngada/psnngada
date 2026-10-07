import React from 'react';
import { Calendar, ChevronRight, Newspaper } from 'lucide-react';
import { ClubInfo } from '../data/clubData';
import { OfficialClubLogo } from './OfficialClubLogo';

interface HeroProps {
  clubInfo: ClubInfo;
}

export const Hero: React.FC<HeroProps> = ({ clubInfo }) => {
  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Scrim Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={clubInfo.heroImageUrl}
          alt="PSN Ngada Football Action"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-1000"
          style={{ animationDuration: '8s' }}
        />
        {/* Measured scrims according to constitution */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/50 to-zinc-950" />
        {/* Subtle red sports lighting streak */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/15 blur-[120px] pointer-events-none rounded-full" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Season & League Metadata (Clean text with slash separator) */}
        <div className="flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase text-red-500 mb-6 bg-red-950/40 border border-red-800/40 px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-inner">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>{clubInfo.competition}</span>
          <span className="text-zinc-500">/</span>
          <span className="text-zinc-300 font-mono-nums">{clubInfo.season}</span>
        </div>

        {/* Club Crest (Official Emblem) */}
        <div className="mb-6 relative group">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-b from-orange-500 via-amber-700 to-zinc-950 shadow-2xl shadow-orange-950/60 transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 border-2 border-zinc-900 flex items-center justify-center p-0.5">
              <OfficialClubLogo customUrl={clubInfo.crestUrl} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* Primary Headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase drop-shadow-md">
          {clubInfo.name}
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-red-500 uppercase">
          Berjuang di {clubInfo.competition}
        </p>

        {/* Emotional Regional Statement */}
        <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed text-balance">
          {clubInfo.motto}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#jadwal"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-red-900/40 transition-all hover:scale-105 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            LIHAT JADWAL
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </a>

          <a
            href="#berita"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all hover:scale-105 cursor-pointer backdrop-blur-sm"
          >
            <Newspaper className="w-4 h-4 text-red-500" />
            BERITA TERBARU
          </a>
        </div>

        {/* Quiet Subtext Indicators */}
        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase">Kandang:</span>
            <span className="text-zinc-200 font-semibold">{clubInfo.homeStadium}</span>
          </div>
          <div className="hidden sm:block text-zinc-700">·</div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase">Asal:</span>
            <span className="text-zinc-200 font-semibold">{clubInfo.city}, NTT</span>
          </div>
          <div className="hidden sm:block text-zinc-700">·</div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase">Julukan:</span>
            <span className="text-red-400 font-semibold">{clubInfo.nickname}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
