import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Trophy, ShieldAlert, Bell } from 'lucide-react';
import { Match, ClubInfo } from '../data/clubData';
import { OfficialClubLogo } from './OfficialClubLogo';

interface NextMatchBannerProps {
  match: Match | undefined;
  clubInfo: ClubInfo;
  onOpenReminderToast?: () => void;
}

export const NextMatchBanner: React.FC<NextMatchBannerProps> = ({
  match,
  clubInfo,
  onOpenReminderToast,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 11,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });
  const [reminderSet, setReminderSet] = useState(false);

  // Live countdown timer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!match) {
    return (
      <div className="relative -mt-8 z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-full bg-zinc-950 border-2 border-orange-500 p-1 flex-shrink-0 shadow-lg">
                <OfficialClubLogo customUrl={clubInfo.crestUrl} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-orange-500 block">
                  PERTANDINGAN BERIKUTNYA
                </span>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                  Jadwal Pertandingan Belum Diumumkan
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Jadwal resmi putaran Liga 3 Nasional akan diperbarui setelah dirilis oleh PSSI.
                </p>
              </div>
            </div>

            <a
              href="#kontak"
              className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
            >
              Informasi Sekretariat
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleReminderClick = () => {
    setReminderSet(true);
    if (onOpenReminderToast) onOpenReminderToast();
    setTimeout(() => setReminderSet(false), 3500);
  };

  return (
    <div className="relative -mt-8 z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
        {/* Top subtle highlight bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-extrabold uppercase tracking-widest text-red-500 flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              PERTANDINGAN BERIKUTNYA
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-medium">{match.competition}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-red-950/60 text-red-400 border border-red-800/50">
              {match.homeOrAway === 'HOME' ? 'Kandang (Home)' : 'Tandang (Away)'}
            </span>
            <span className="text-zinc-400 text-xs font-mono-nums">{match.round}</span>
          </div>
        </div>

        {/* Center Match Clash Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
          {/* Team 1: PSN Ngada */}
          <div className="lg:col-span-4 flex items-center lg:justify-end gap-4 order-1">
            <div className="text-left lg:text-right">
              <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white uppercase">
                {clubInfo.name}
              </h3>
              <p className="text-xs text-zinc-400 font-medium">{clubInfo.nickname}</p>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-950 border-2 border-orange-500 p-1 flex-shrink-0 flex items-center justify-center shadow-lg shadow-orange-950/50">
              <OfficialClubLogo customUrl={clubInfo.crestUrl} className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Versus Center Box & Countdown */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center order-3 lg:order-2">
            <div className="text-sm font-extrabold text-red-500 uppercase tracking-widest px-3 py-1 bg-zinc-950 rounded border border-zinc-800 mb-3">
              VS
            </div>

            {/* Live Countdown */}
            <div className="grid grid-cols-4 gap-2 text-center my-1 w-full max-w-[280px]">
              <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-lg py-2 px-1">
                <span className="block text-xl sm:text-2xl font-bold font-mono-nums text-white">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-zinc-500 font-semibold">Hari</span>
              </div>
              <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-lg py-2 px-1">
                <span className="block text-xl sm:text-2xl font-bold font-mono-nums text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-zinc-500 font-semibold">Jam</span>
              </div>
              <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-lg py-2 px-1">
                <span className="block text-xl sm:text-2xl font-bold font-mono-nums text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-zinc-500 font-semibold">Mnt</span>
              </div>
              <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-lg py-2 px-1">
                <span className="block text-xl sm:text-2xl font-bold font-mono-nums text-red-500 animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-zinc-500 font-semibold">Dtk</span>
              </div>
            </div>
          </div>

          {/* Team 2: Opponent */}
          <div className="lg:col-span-4 flex items-center justify-start gap-4 order-2 lg:order-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-950 border-2 border-zinc-700 p-1 flex-shrink-0 flex items-center justify-center shadow-lg text-3xl">
              <span>{match.opponentLogo || '🛡️'}</span>
            </div>
            <div className="text-left">
              <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-zinc-200 uppercase">
                {match.opponent}
              </h3>
              <p className="text-xs text-zinc-400 font-medium">Lawan Kompetisi</p>
            </div>
          </div>
        </div>

        {/* Match Location & Time Footer */}
        <div className="mt-4 pt-5 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="font-semibold">{match.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="font-semibold">{match.time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{match.stadium}</span>
            </div>
          </div>

          <button
            onClick={handleReminderClick}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              reminderSet
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            {reminderSet ? 'Pengingat Aktif' : 'Ingatkan Saya'}
          </button>
        </div>
      </div>
    </div>
  );
};
