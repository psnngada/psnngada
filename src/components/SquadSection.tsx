import React, { useState } from 'react';
import { Shield, User, X, Activity, Award, Footprints } from 'lucide-react';
import { Player } from '../data/clubData';

interface SquadSectionProps {
  players: Player[];
}

export const SquadSection: React.FC<SquadSectionProps> = ({ players }) => {
  const [activeTab, setActiveTab] = useState<'Semua' | 'Penjaga Gawang' | 'Bek' | 'Gelandang' | 'Penyerang'>('Semua');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const tabs: ('Semua' | 'Penjaga Gawang' | 'Bek' | 'Gelandang' | 'Penyerang')[] = [
    'Semua',
    'Penjaga Gawang',
    'Bek',
    'Gelandang',
    'Penyerang',
  ];

  const filteredPlayers = activeTab === 'Semua'
    ? players
    : players.filter((p) => p.position === activeTab);

  return (
    <section id="tim" className="py-20 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
            KOMPOSISI TIM LIGA 3
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase">
            SKUAD PSN NGADA
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 rounded-full" />
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl">
            Para kesatria Laskar Jaramasi yang berjuang mengharumkan nama Kabupaten Ngada dan Nusa Tenggara Timur.
          </p>
        </div>

        {/* Position Filter Tabs */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Player Cards Grid or Empty State */}
        {filteredPlayers.length === 0 ? (
          <div className="text-center py-16 px-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Belum Ada Data Pemain Terdaftar
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Daftar skuad resmi PSN Ngada sedang dihimpun. Administrator dapat mendaftarkan nama pemain, nomor punggung, dan posisi melalui Panel Kelola Data.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className="group bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-600/70 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20 cursor-pointer flex flex-col"
              >
                {/* Player Jersey / Visual Box */}
                <div className="relative aspect-[3/4] bg-zinc-900/90 flex flex-col items-center justify-center p-4 border-b border-zinc-800/80 overflow-hidden">
                  {/* Background Jersey Graphic */}
                  <div className="absolute -right-4 -bottom-4 font-mono font-black text-7xl text-zinc-800/40 select-none group-hover:text-red-950/40 transition-colors">
                    {player.number}
                  </div>

                  {/* Player Silhouette or Badge */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-400 group-hover:text-red-400 transition-colors" />
                  </div>

                  {/* Jersey Number Tag */}
                  <span className="absolute top-2 left-2 font-mono-nums font-extrabold text-sm text-red-500 bg-zinc-950/90 border border-zinc-800 px-2 py-0.5 rounded">
                    #{player.number}
                  </span>

                  {player.isCaptain && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded uppercase">
                      Kapten
                    </span>
                  )}
                </div>

                {/* Player Card Content */}
                <div className="p-3 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-red-400 transition-colors truncate">
                      {player.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-medium truncate mt-0.5">
                      {player.positionDetail}
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-around text-[10px] font-mono-nums text-zinc-400">
                    <span>{player.caps} Main</span>
                    <span>·</span>
                    <span>{player.goals} Gol</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-950 p-6 border-b border-zinc-800">
              <button
                onClick={() => setSelectedPlayer(null)}
                aria-label="Tutup Rincian Pemain"
                className="absolute top-4 right-4 p-1.5 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-red-600 flex items-center justify-center font-mono-nums font-black text-2xl text-white shadow-lg">
                  #{selectedPlayer.number}
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white">
                    {selectedPlayer.name}
                  </h3>
                  <p className="text-xs text-red-400 font-bold uppercase tracking-wider">
                    {selectedPlayer.position} · {selectedPlayer.positionDetail}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Details */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
                <div>
                  <span className="text-zinc-500 block">Tanggal Lahir:</span>
                  <span className="text-zinc-200 font-semibold">{selectedPlayer.birthDate}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Tinggi / Berat:</span>
                  <span className="text-zinc-200 font-semibold">{selectedPlayer.height} / {selectedPlayer.weight}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Kaki Dominan:</span>
                  <span className="text-zinc-200 font-semibold">{selectedPlayer.foot}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Asal Daerah:</span>
                  <span className="text-zinc-200 font-semibold">{selectedPlayer.hometown}</span>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="pt-2">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-500" />
                  STATISTIK LIGA 3 NASIONAL
                </h4>

                <div className="grid grid-cols-3 gap-2 text-center font-mono-nums">
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                    <span className="block text-xl font-bold text-white">{selectedPlayer.caps}</span>
                    <span className="text-[10px] text-zinc-500 font-sans uppercase">Penampilan</span>
                  </div>
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                    <span className="block text-xl font-bold text-red-500">{selectedPlayer.goals}</span>
                    <span className="text-[10px] text-zinc-500 font-sans uppercase">Gol</span>
                  </div>
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                    <span className="block text-xl font-bold text-white">{selectedPlayer.assists}</span>
                    <span className="text-[10px] text-zinc-500 font-sans uppercase">Assist</span>
                  </div>
                </div>

                {selectedPlayer.position === 'Penjaga Gawang' && (
                  <div className="mt-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center font-mono-nums">
                    <span className="block text-lg font-bold text-emerald-400">{selectedPlayer.cleanSheets ?? 0}</span>
                    <span className="text-[10px] text-zinc-500 font-sans uppercase">Clean Sheet (Nirbobol)</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer"
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
