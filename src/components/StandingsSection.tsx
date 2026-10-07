import React from 'react';
import { Trophy, Info, Flame } from 'lucide-react';
import { StandingTeam, ClubInfo } from '../data/clubData';
import { OfficialClubLogo } from './OfficialClubLogo';

interface StandingsSectionProps {
  standings: StandingTeam[];
  clubInfo: ClubInfo;
}

export const StandingsSection: React.FC<StandingsSectionProps> = ({ standings, clubInfo }) => {
  return (
    <section id="klasemen" className="py-20 bg-zinc-900/50 border-t border-zinc-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
            TABEL PERINGKAT
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase">
            KLASEMEN LIGA 3 NASIONAL
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 rounded-full" />
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl">
            Peta persaingan grup putaran nasional musim {clubInfo.season}. Dua posisi teratas melaju ke babak berikutnya.
          </p>
        </div>

        {/* Standings Table Container or Empty State */}
        {standings.length === 0 ? (
          <div className="text-center py-16 px-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Klasemen Belum Tersedia
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Tabel klasemen Liga 3 Nasional akan diperbarui setelah pertandingan putaran grup resmi dimulai dan dimasukkan melalui Panel Kelola Data.
            </p>
          </div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
            {/* Table Header Bar */}
            <div className="p-4 sm:p-5 bg-zinc-900/80 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-zinc-300">
                <Trophy className="w-4 h-4 text-red-500" />
                <span>Grup A Putaran Nasional</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-600 inline-block" />
                  Zona Promosi / Lolos
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-500 italic">Liga 3 Nasional {clubInfo.season}</span>
              </div>
            </div>

            {/* Responsive Scrollable Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead>
                  <tr className="bg-zinc-900/40 text-zinc-400 uppercase tracking-wider border-b border-zinc-800 font-semibold text-[11px]">
                    <th className="py-3.5 px-4 text-center w-12">Pos</th>
                    <th className="py-3.5 px-4">Klub</th>
                    <th className="py-3.5 px-3 text-center">Main</th>
                    <th className="py-3.5 px-3 text-center">Menang</th>
                    <th className="py-3.5 px-3 text-center">Seri</th>
                    <th className="py-3.5 px-3 text-center">Kalah</th>
                    <th className="py-3.5 px-3 text-center">GM</th>
                    <th className="py-3.5 px-3 text-center">GK</th>
                    <th className="py-3.5 px-3 text-center">SG</th>
                    <th className="py-3.5 px-4 text-center font-bold text-white">Poin</th>
                    <th className="py-3.5 px-4 text-center hidden md:table-cell">Tren</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono-nums">
                  {standings.map((row) => {
                    const isTopTwo = row.pos <= 2;
                    const isPsn = row.isPsn;

                    return (
                      <tr
                        key={row.club}
                        className={`transition-colors ${
                          isPsn
                            ? 'bg-red-950/40 border-l-4 border-l-red-600 font-bold'
                            : 'hover:bg-zinc-900/40'
                        }`}
                      >
                        {/* Position */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${
                              isPsn
                                ? 'bg-red-600 text-white'
                                : isTopTwo
                                ? 'bg-zinc-800 text-emerald-400 font-bold'
                                : 'text-zinc-400'
                            }`}
                          >
                            {row.pos}
                          </span>
                        </td>

                        {/* Club Name */}
                        <td className="py-3.5 px-4 font-sans">
                          <div className="flex items-center gap-2.5">
                            {isPsn ? (
                              <div className="w-6 h-6 rounded-full overflow-hidden border border-orange-500 flex-shrink-0 bg-zinc-950 p-0.5">
                                <OfficialClubLogo customUrl={clubInfo.crestUrl} className="w-full h-full object-contain" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs flex-shrink-0">
                                🛡️
                              </div>
                            )}
                            <span
                              className={`font-semibold tracking-wide ${
                                isPsn ? 'text-white font-extrabold text-sm' : 'text-zinc-200'
                              }`}
                            >
                              {row.club}
                            </span>
                            {isPsn && (
                              <span className="text-[10px] font-sans font-extrabold uppercase px-1.5 py-0.2 rounded bg-red-600/40 text-red-300 border border-red-500/40 ml-1">
                                Klub Kebanggaan
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Stats */}
                        <td className="py-3.5 px-3 text-center text-zinc-300">{row.played}</td>
                        <td className="py-3.5 px-3 text-center text-zinc-300">{row.won}</td>
                        <td className="py-3.5 px-3 text-center text-zinc-400">{row.drawn}</td>
                        <td className="py-3.5 px-3 text-center text-zinc-400">{row.lost}</td>
                        <td className="py-3.5 px-3 text-center text-zinc-400">{row.goalsFor}</td>
                        <td className="py-3.5 px-3 text-center text-zinc-400">{row.goalsAgainst}</td>
                        <td className="py-3.5 px-3 text-center font-semibold">
                          <span className={row.goalDiff > 0 ? 'text-emerald-400' : row.goalDiff < 0 ? 'text-red-400' : 'text-zinc-400'}>
                            {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                          </span>
                        </td>

                        {/* Points */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`font-extrabold text-sm ${
                              isPsn ? 'text-red-400 text-base' : 'text-white'
                            }`}
                          >
                            {row.points}
                          </span>
                        </td>

                        {/* Form (5 matches) */}
                        <td className="py-3.5 px-4 text-center hidden md:table-cell">
                          <div className="flex items-center justify-center gap-1">
                            {row.form.map((res, i) => (
                              <span
                                key={i}
                                className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center ${
                                  res === 'W'
                                    ? 'bg-emerald-600/80 text-white'
                                    : res === 'D'
                                    ? 'bg-zinc-700 text-zinc-300'
                                    : 'bg-red-800/80 text-white'
                                }`}
                              >
                                {res}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-4 bg-zinc-900/60 border-t border-zinc-800 text-[11px] text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-zinc-500" />
                <span>Geser ke kanan untuk melihat rincian tabel lengkap di layar ponsel.</span>
              </div>
              <span>Update Terakhir: {clubInfo.season}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
