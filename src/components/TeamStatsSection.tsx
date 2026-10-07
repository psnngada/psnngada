import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Flame, Award, Crosshair, Users, Target } from 'lucide-react';
import { Player, StandingTeam } from '../data/clubData';

interface TeamStatsSectionProps {
  players: Player[];
  psnStanding: StandingTeam | undefined;
}

export const TeamStatsSection: React.FC<TeamStatsSectionProps> = ({ players, psnStanding }) => {
  // Compute team totals
  const totalMatches = psnStanding?.played ?? 0;
  const wins = psnStanding?.won ?? 0;
  const draws = psnStanding?.drawn ?? 0;
  const losses = psnStanding?.lost ?? 0;
  const goalsFor = psnStanding?.goalsFor ?? 0;
  const goalsAgainst = psnStanding?.goalsAgainst ?? 0;
  const points = psnStanding?.points ?? 0;
  const cleanSheets = players.reduce((sum, p) => sum + (p.cleanSheets || 0), 0);

  const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;
  const goalDiff = goalsFor - goalsAgainst;

  // Compute player leaderboards
  const topScorers = [...players].filter(p => p.goals > 0).sort((a, b) => b.goals - a.goals).slice(0, 3);
  const topAssists = [...players].filter(p => p.assists > 0).sort((a, b) => b.assists - a.assists).slice(0, 3);
  const mostCaps = [...players].sort((a, b) => b.caps - a.caps).slice(0, 3);
  const topKeeper = players.find((p) => p.position === 'Penjaga Gawang');

  return (
    <section className="py-20 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
            PERFORMA & DATA
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase">
            STATISTIK TIM & PEMAIN
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 rounded-full" />
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl">
            Torehan angka dan produktivitas Laskar Jaramasi sepanjang gelaran Liga 3 Nasional.
          </p>
        </div>

        {/* Team Overview Metrics Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <span className="block text-xs text-zinc-400 uppercase font-semibold">Tanding</span>
            <span className="font-mono-nums font-black text-2xl sm:text-3xl text-white mt-1 block">
              {totalMatches}
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <span className="block text-xs text-emerald-400 uppercase font-semibold">Menang</span>
            <span className="font-mono-nums font-black text-2xl sm:text-3xl text-emerald-400 mt-1 block">
              {wins}
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <span className="block text-xs text-zinc-400 uppercase font-semibold">Seri</span>
            <span className="font-mono-nums font-black text-2xl sm:text-3xl text-zinc-300 mt-1 block">
              {draws}
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <span className="block text-xs text-zinc-400 uppercase font-semibold">Kalah</span>
            <span className="font-mono-nums font-black text-2xl sm:text-3xl text-zinc-400 mt-1 block">
              {losses}
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <span className="block text-xs text-red-400 uppercase font-semibold">Gol Masuk</span>
            <span className="font-mono-nums font-black text-2xl sm:text-3xl text-red-500 mt-1 block">
              {goalsFor}
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <span className="block text-xs text-zinc-400 uppercase font-semibold">Kebobolan</span>
            <span className="font-mono-nums font-black text-2xl sm:text-3xl text-zinc-400 mt-1 block">
              {goalsAgainst}
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <span className="block text-xs text-blue-400 uppercase font-semibold">Clean Sheet</span>
            <span className="font-mono-nums font-black text-2xl sm:text-3xl text-blue-400 mt-1 block">
              {cleanSheets}
            </span>
          </div>

          <div className="bg-gradient-to-b from-red-950 to-zinc-900 border border-red-800 rounded-xl p-4 text-center shadow-lg">
            <span className="block text-xs text-red-300 uppercase font-bold">Total Poin</span>
            <span className="font-mono-nums font-black text-2xl sm:text-3xl text-red-400 mt-1 block">
              {points}
            </span>
          </div>
        </div>

        {/* Visual Progress Bars for Team Efficiency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Tingkat Kemenangan (Win Rate)
              </span>
              <span className="font-mono-nums font-black text-lg text-emerald-400">{winRate}%</span>
            </div>
            <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${winRate}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-400 mt-2">
              {totalMatches > 0
                ? `${wins} kemenangan dari ${totalMatches} pertandingan yang telah dijalani.`
                : 'Belum ada pertandingan resmi yang tercatat di sistem.'}
            </p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Selisih Gol (Goal Difference)
              </span>
              <span className="font-mono-nums font-black text-lg text-red-400">
                {goalDiff > 0 ? `+${goalDiff}` : goalDiff} SG
              </span>
            </div>
            <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${totalMatches > 0 ? Math.min(100, Math.max(0, (goalsFor / Math.max(1, goalsFor + goalsAgainst)) * 100)) : 0}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-400 mt-2">
              {totalMatches > 0
                ? `Total ${goalsFor} gol dicetak dan ${goalsAgainst} kebobolan sepanjang kompetisi.`
                : 'Data produktivitas gol akan terisi seiring kompetisi berjalan.'}
            </p>
          </div>
        </div>

        {/* Player Leaderboard Showcase or Empty State */}
        <div>
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-6 uppercase flex items-center gap-2">
            <Award className="w-5 h-5 text-red-500" />
            PAPAN PERINGKAT INDIVIDUAL PEMAIN
          </h3>

          {players.length === 0 ? (
            <div className="text-center py-12 px-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-zinc-500" />
              </div>
              <h4 className="font-display font-bold text-base text-white mb-1.5">
                Statistik Pemain Belum Tersedia
              </h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                Papan peringkat pencetak gol, assist, dan clean sheet akan diperbarui setelah data pemain dan pertandingan diinput melalui Panel Kelola Data.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Scorers */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 text-xs font-bold uppercase text-red-500">
                  <Flame className="w-4 h-4" />
                  TOP SCORER (PENCETAK GOL)
                </div>
                <div className="divide-y divide-zinc-800/80 mt-3 font-mono-nums">
                  {topScorers.length === 0 ? (
                    <p className="text-xs text-zinc-500 py-4 text-center">Belum ada pencetak gol tercatat</p>
                  ) : (
                    topScorers.map((p, idx) => (
                      <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-500 font-bold w-4">{idx + 1}</span>
                          <div className="font-sans">
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-[10px] text-zinc-400 font-normal">{p.positionDetail}</span>
                          </div>
                        </div>
                        <span className="font-black text-sm text-red-500">{p.goals} Gol</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Top Assists */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 text-xs font-bold uppercase text-blue-400">
                  <Target className="w-4 h-4" />
                  ASSIST TERBANYAK
                </div>
                <div className="divide-y divide-zinc-800/80 mt-3 font-mono-nums">
                  {topAssists.length === 0 ? (
                    <p className="text-xs text-zinc-500 py-4 text-center">Belum ada assist tercatat</p>
                  ) : (
                    topAssists.map((p, idx) => (
                      <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-500 font-bold w-4">{idx + 1}</span>
                          <div className="font-sans">
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-[10px] text-zinc-400 font-normal">{p.positionDetail}</span>
                          </div>
                        </div>
                        <span className="font-black text-sm text-blue-400">{p.assists} Assist</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Most Caps & Clean Sheet */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 text-xs font-bold uppercase text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  PENAMPILAN & CLEAN SHEET
                </div>
                <div className="divide-y divide-zinc-800/80 mt-3 font-mono-nums">
                  {topKeeper && (
                    <div className="py-2.5 flex items-center justify-between text-xs">
                      <div className="font-sans">
                        <span className="font-bold text-white block">{topKeeper.name}</span>
                        <span className="text-[10px] text-zinc-400 font-normal">Kiper Utama</span>
                      </div>
                      <span className="font-black text-sm text-emerald-400">
                        {topKeeper.cleanSheets ?? 0} Clean Sheet
                      </span>
                    </div>
                  )}
                  {mostCaps.slice(0, 2).map((p) => (
                    <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="font-sans">
                        <span className="font-bold text-white block">{p.name}</span>
                        <span className="text-[10px] text-zinc-400 font-normal">{p.positionDetail}</span>
                      </div>
                      <span className="font-black text-sm text-zinc-300">{p.caps} Laga</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
