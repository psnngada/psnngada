import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Trophy, Shield, ChevronRight, X, Flame } from 'lucide-react';
import { Match, ClubInfo } from '../data/clubData';
import { OfficialClubLogo } from './OfficialClubLogo';

interface MatchesSectionProps {
  matches: Match[];
  clubInfo: ClubInfo;
}

export const MatchesSection: React.FC<MatchesSectionProps> = ({ matches, clubInfo }) => {
  const [filter, setFilter] = useState<'Semua' | 'Home' | 'Away' | 'Akan Datang' | 'Sudah Dimainkan'>('Semua');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const filterTabs: ('Semua' | 'Home' | 'Away' | 'Akan Datang' | 'Sudah Dimainkan')[] = [
    'Semua',
    'Akan Datang',
    'Sudah Dimainkan',
    'Home',
    'Away',
  ];

  const filteredMatches = matches.filter((m) => {
    if (filter === 'Home') return m.homeOrAway === 'HOME';
    if (filter === 'Away') return m.homeOrAway === 'AWAY';
    if (filter === 'Akan Datang') return m.status === 'Akan Datang';
    if (filter === 'Sudah Dimainkan') return m.status === 'Selesai';
    return true;
  });

  return (
    <section id="jadwal" className="py-20 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
            AGENDA & REKAPITULASI
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase">
            JADWAL & HASIL PERTANDINGAN
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 rounded-full" />
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl">
            Perjalanan Laskar Jaramasi menembus ketatnya persaingan Liga 3 Nasional musim ini.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === tab
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Fixtures List or Empty State */}
        {filteredMatches.length === 0 ? (
          <div className="text-center py-16 px-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Belum Ada Jadwal Pertandingan
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Jadwal pertandingan Liga 3 Nasional untuk PSN Ngada belum dimasukkan atau belum diumumkan. Administrator dapat menambah jadwal melalui Panel Kelola Data.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMatches.map((m) => {
              const isFinished = m.status === 'Selesai';

              return (
                <div
                  key={m.id}
                  className={`bg-zinc-900/70 border rounded-xl p-5 transition-all hover:border-zinc-700 shadow-lg ${
                    isFinished ? 'border-zinc-800/80' : 'border-zinc-800 hover:bg-zinc-900/90'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Left Column: Match Info */}
                    <div className="md:col-span-3 text-xs text-zinc-400 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold uppercase tracking-wider text-red-500">
                          {m.round}
                        </span>
                        <span>·</span>
                        <span className="font-semibold text-zinc-300">{m.competition}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-300 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{m.date}</span>
                        <span>·</span>
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{m.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400 truncate">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                        <span className="truncate">{m.stadium}</span>
                      </div>
                    </div>

                    {/* Center Column: Teams Clash & Score */}
                    <div className="md:col-span-6 flex items-center justify-between sm:justify-center gap-4 sm:gap-8 py-2 border-y md:border-y-0 md:border-x border-zinc-800/80 px-2 sm:px-4">
                      {/* Home Team */}
                      <div className="flex items-center gap-3 justify-end flex-1">
                        <span className="font-display font-bold text-sm sm:text-base text-white text-right truncate">
                          {m.homeOrAway === 'HOME' ? clubInfo.name : m.opponent}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-700 p-0.5 flex items-center justify-center flex-shrink-0 shadow">
                          {m.homeOrAway === 'HOME' ? (
                            <OfficialClubLogo customUrl={clubInfo.crestUrl} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-xl">{m.opponentLogo || '🛡️'}</span>
                          )}
                        </div>
                      </div>

                      {/* Middle Score / VS Box */}
                      <div className="flex flex-col items-center justify-center px-3">
                        {isFinished ? (
                          <div className="flex items-center gap-2 font-mono-nums font-black text-xl sm:text-2xl text-white bg-zinc-950 px-4 py-1.5 rounded-lg border border-zinc-800 shadow-inner">
                            <span className={m.homeOrAway === 'HOME' ? 'text-red-500' : 'text-zinc-200'}>
                              {m.homeOrAway === 'HOME' ? m.psnScore : m.opponentScore}
                            </span>
                            <span className="text-zinc-600">:</span>
                            <span className={m.homeOrAway === 'AWAY' ? 'text-red-500' : 'text-zinc-200'}>
                              {m.homeOrAway === 'AWAY' ? m.psnScore : m.opponentScore}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs font-extrabold uppercase tracking-wider text-red-500 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded">
                            VS
                          </span>
                        )}
                        <span className="text-[10px] text-zinc-500 font-semibold uppercase mt-1">
                          {isFinished ? 'Selesai' : m.homeOrAway === 'HOME' ? 'Kandang' : 'Tandang'}
                        </span>
                      </div>

                      {/* Away Team */}
                      <div className="flex items-center gap-3 justify-start flex-1">
                        <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-700 p-0.5 flex items-center justify-center flex-shrink-0 shadow">
                          {m.homeOrAway === 'AWAY' ? (
                            <OfficialClubLogo customUrl={clubInfo.crestUrl} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-xl">{m.opponentLogo || '🛡️'}</span>
                          )}
                        </div>
                        <span className="font-display font-bold text-sm sm:text-base text-white text-left truncate">
                          {m.homeOrAway === 'AWAY' ? clubInfo.name : m.opponent}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Action / Button */}
                    <div className="md:col-span-3 flex items-center justify-end">
                      {isFinished ? (
                        <button
                          onClick={() => setSelectedMatch(m)}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          DETAIL PERTANDINGAN
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="w-full md:w-auto text-center px-4 py-2 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs font-semibold text-amber-400">
                          Akan Datang
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Match Detail Modal (Section 10: Detail Pertandingan) */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <div className="bg-zinc-900 p-6 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest block">
                  DETAIL HASIL PERTANDINGAN
                </span>
                <h3 className="font-display font-black text-lg text-white">
                  {selectedMatch.competition}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMatch(null)}
                aria-label="Tutup Rincian Pertandingan"
                className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Match Clash Showcase */}
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-around text-center py-4 bg-zinc-900/60 rounded-xl border border-zinc-800">
                <div>
                  <div className="w-14 h-14 rounded-full bg-zinc-950 border-2 border-orange-500 p-1 mx-auto mb-2 flex items-center justify-center shadow">
                    <OfficialClubLogo customUrl={clubInfo.crestUrl} className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-bold text-sm text-white uppercase">{clubInfo.name}</h4>
                  <span className="font-mono-nums font-black text-3xl text-red-500 block mt-1">
                    {selectedMatch.psnScore}
                  </span>
                </div>

                <span className="text-zinc-600 font-bold text-lg">VS</span>

                <div>
                  <div className="w-14 h-14 rounded-full bg-zinc-950 border-2 border-zinc-700 p-1 mx-auto mb-2 flex items-center justify-center shadow text-2xl">
                    {selectedMatch.opponentLogo || '🛡️'}
                  </div>
                  <h4 className="font-bold text-sm text-zinc-300 uppercase">{selectedMatch.opponent}</h4>
                  <span className="font-mono-nums font-black text-3xl text-zinc-200 block mt-1">
                    {selectedMatch.opponentScore}
                  </span>
                </div>
              </div>

              {/* Match Details */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Tanggal & Waktu:</span>
                  <span className="text-zinc-200 font-semibold">{selectedMatch.date} · {selectedMatch.time}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Stadion:</span>
                  <span className="text-zinc-200 font-semibold">{selectedMatch.stadium}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">Babak / Pekan:</span>
                  <span className="text-zinc-200 font-semibold">{selectedMatch.round}</span>
                </div>
              </div>

              {/* Goal Scorers */}
              {selectedMatch.scorers && selectedMatch.scorers.length > 0 && (
                <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-red-500" />
                    Pencetak Gol PSN Ngada
                  </h5>
                  <ul className="space-y-1 text-xs text-zinc-200 font-medium">
                    {selectedMatch.scorers.map((scorer, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>{scorer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Report Summary */}
              {selectedMatch.reportSummary && (
                <div className="text-xs text-zinc-300 italic border-l-2 border-red-600 pl-3">
                  "{selectedMatch.reportSummary}"
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold uppercase cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
