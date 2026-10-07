import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  UserPlus,
  Trash2,
  Edit,
  Shield,
  Calendar,
  Trophy,
  Users,
  Settings,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ClubInfo, Player, Match, StandingTeam, NewsArticle } from '../data/clubData';
import { OfficialClubLogo } from './OfficialClubLogo';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubInfo: ClubInfo;
  players: Player[];
  matches: Match[];
  standings: StandingTeam[];
  onUpdateClubInfo: (info: Partial<ClubInfo>) => void;
  onAddPlayer: (player: Player) => void;
  onUpdatePlayer: (id: string, player: Partial<Player>) => void;
  onDeletePlayer: (id: string) => void;
  onUpdateMatch: (id: string, match: Partial<Match>) => void;
  onUpdateStanding: (club: string, standing: Partial<StandingTeam>) => void;
  onResetToDefault: () => void;
  onClearAllData?: () => void;
  onImportData: (jsonData: string) => boolean;
  fullDataJson: string;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  clubInfo,
  players,
  matches,
  standings,
  onUpdateClubInfo,
  onAddPlayer,
  onUpdatePlayer,
  onDeletePlayer,
  onUpdateMatch,
  onUpdateStanding,
  onResetToDefault,
  onClearAllData,
  onImportData,
  fullDataJson,
}) => {
  const [activeTab, setActiveTab] = useState<'klub' | 'pemain' | 'pertandingan' | 'klasemen' | 'json'>('klub');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Club info local form state
  const [clubForm, setClubForm] = useState<ClubInfo>(clubInfo);

  // New Player Form State
  const [newPlayerForm, setNewPlayerForm] = useState<Partial<Player>>({
    number: 11,
    name: '',
    position: 'Gelandang',
    positionDetail: 'Gelandang Serang (AM)',
    birthDate: '12 Jan 2003',
    height: '175 cm',
    weight: '68 kg',
    foot: 'Kanan',
    hometown: 'Bajawa, Ngada',
    caps: 5,
    goals: 1,
    assists: 1,
  });

  // JSON input state for backup/restore
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleSaveClub = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateClubInfo(clubForm);
    showToast('Informasi profil klub berhasil diperbarui!');
  };

  const handleAddNewPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerForm.name) return;

    const newP: Player = {
      id: `p-${Date.now()}`,
      number: Number(newPlayerForm.number) || 99,
      name: newPlayerForm.name || 'Nama Pemain Baru',
      position: newPlayerForm.position as any || 'Gelandang',
      positionDetail: newPlayerForm.positionDetail || 'Pemain',
      birthDate: newPlayerForm.birthDate || '01 Jan 2002',
      height: newPlayerForm.height || '175 cm',
      weight: newPlayerForm.weight || '70 kg',
      foot: newPlayerForm.foot as any || 'Kanan',
      hometown: newPlayerForm.hometown || 'Ngada, NTT',
      caps: Number(newPlayerForm.caps) || 0,
      goals: Number(newPlayerForm.goals) || 0,
      assists: Number(newPlayerForm.assists) || 0,
      yellowCards: 0,
      redCards: 0,
    };

    onAddPlayer(newP);
    setNewPlayerForm({
      number: (newP.number || 10) + 1,
      name: '',
      position: 'Gelandang',
      positionDetail: 'Gelandang',
      birthDate: '12 Jan 2003',
      height: '175 cm',
      weight: '68 kg',
      foot: 'Kanan',
      hometown: 'Bajawa, Ngada',
      caps: 0,
      goals: 0,
      assists: 0,
    });
    showToast('Pemain baru berhasil ditambahkan ke skuad!');
  };

  const handleExport = () => {
    const blob = new Blob([fullDataJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `psn-ngada-database-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('File JSON cadangan berhasil diunduh!');
  };

  const handleImport = () => {
    setJsonError(null);
    if (!jsonInput.trim()) {
      setJsonError('Harap tempel data JSON terlebih dahulu.');
      return;
    }
    const ok = onImportData(jsonInput);
    if (ok) {
      showToast('Data berhasil diimpor & disimpan!');
      setJsonInput('');
    } else {
      setJsonError('Format JSON tidak valid atau struktur tidak cocok.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col relative">
        {/* Modal Topbar */}
        <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-950 text-red-500 border border-red-800/60">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-white">
                PANEL KELOLA DATA PSN NGADA
              </h3>
              <p className="text-xs text-zinc-400">
                Pusat pengaturan data klub, skuad pemain, jadwal pertandingan, dan klasemen Liga 3.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup Panel Admin"
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 bg-zinc-900/50 border-b border-zinc-800 overflow-x-auto text-xs font-bold uppercase tracking-wider scrollbar-none">
          <button
            onClick={() => setActiveTab('klub')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'klub'
                ? 'border-red-600 text-red-500'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Profil Klub
          </button>
          <button
            onClick={() => setActiveTab('pemain')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'pemain'
                ? 'border-red-600 text-red-500'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Skuad Pemain ({players.length})
          </button>
          <button
            onClick={() => setActiveTab('pertandingan')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'pertandingan'
                ? 'border-red-600 text-red-500'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Jadwal & Skor ({matches.length})
          </button>
          <button
            onClick={() => setActiveTab('klasemen')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'klasemen'
                ? 'border-red-600 text-red-500'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Klasemen Grup
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'json'
                ? 'border-red-600 text-red-500'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Ekspor / Impor JSON
          </button>
        </div>

        {/* Toast Notifier */}
        {successToast && (
          <div className="mx-6 mt-4 p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Scrollable Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          {/* TAB 1: KLUB */}
          {activeTab === 'klub' && (
            <form onSubmit={handleSaveClub} className="space-y-4">
              {/* Logo Preview Section */}
              <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500 bg-zinc-950 p-0.5 flex-shrink-0 shadow-lg">
                  <OfficialClubLogo customUrl={clubForm.crestUrl} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <label className="block font-bold text-white text-xs mb-1">
                    Logo Resmi Klub (PERSERIKATAN SEPAKBOLA NGADA)
                  </label>
                  <input
                    type="text"
                    value={clubForm.crestUrl}
                    onChange={(e) => setClubForm({ ...clubForm, crestUrl: e.target.value })}
                    placeholder="URL gambar logo..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white text-xs"
                  />
                  <span className="text-[10px] text-zinc-500 mt-1 block">
                    Menampilkan lambang resmi PSN Ngada dengan 7 bintang, bola sepak, padi-kapas, dan tugu Ngadhu.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Nama Klub</label>
                  <input
                    type="text"
                    value={clubForm.name}
                    onChange={(e) => setClubForm({ ...clubForm, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={clubForm.fullName}
                    onChange={(e) => setClubForm({ ...clubForm, fullName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Musim Kompetisi</label>
                  <input
                    type="text"
                    value={clubForm.season}
                    onChange={(e) => setClubForm({ ...clubForm, season: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Kompetisi</label>
                  <input
                    type="text"
                    value={clubForm.competition}
                    onChange={(e) => setClubForm({ ...clubForm, competition: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Stadion Kandang</label>
                  <input
                    type="text"
                    value={clubForm.homeStadium}
                    onChange={(e) => setClubForm({ ...clubForm, homeStadium: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Kota & Provinsi</label>
                  <input
                    type="text"
                    value={clubForm.city}
                    onChange={(e) => setClubForm({ ...clubForm, city: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Motto / Slogan</label>
                <input
                  type="text"
                  value={clubForm.motto}
                  onChange={(e) => setClubForm({ ...clubForm, motto: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Narasi Resmi Klub</label>
                <textarea
                  rows={3}
                  value={clubForm.description}
                  onChange={(e) => setClubForm({ ...clubForm, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Simpan Perubahan Klub
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: PEMAIN */}
          {activeTab === 'pemain' && (
            <div className="space-y-6">
              {/* Tambah Pemain Baru */}
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl">
                <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-red-500" />
                  Tambah Pemain Baru ke Skuad
                </h4>
                <form onSubmit={handleAddNewPlayer} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">No. Punggung</label>
                    <input
                      type="number"
                      required
                      value={newPlayerForm.number}
                      onChange={(e) => setNewPlayerForm({ ...newPlayerForm, number: parseInt(e.target.value) })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Nama Pemain</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Pemain..."
                      value={newPlayerForm.name}
                      onChange={(e) => setNewPlayerForm({ ...newPlayerForm, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Posisi Utama</label>
                    <select
                      value={newPlayerForm.position}
                      onChange={(e) => setNewPlayerForm({ ...newPlayerForm, position: e.target.value as any })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white"
                    >
                      <option value="Penjaga Gawang">Penjaga Gawang</option>
                      <option value="Bek">Bek</option>
                      <option value="Gelandang">Gelandang</option>
                      <option value="Penyerang">Penyerang</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded cursor-pointer"
                    >
                      Tambah Pemain
                    </button>
                  </div>
                </form>
              </div>

              {/* Daftar Pemain Saat Ini */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-zinc-400 text-xs font-semibold">
                  <span>Daftar Pemain Terdaftar</span>
                  <span>{players.length} Pemain</span>
                </div>
                <div className="divide-y divide-zinc-800 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
                  {players.map((p) => (
                    <div key={p.id} className="p-3 flex items-center justify-between gap-4 hover:bg-zinc-900">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-center font-bold text-red-500 font-mono">
                          #{p.number}
                        </span>
                        <div>
                          <span className="font-bold text-white block">{p.name}</span>
                          <span className="text-[11px] text-zinc-400">{p.position} · {p.positionDetail}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-3 text-zinc-400 font-mono">
                          <span>{p.caps} Laga</span>
                          <span>{p.goals} Gol</span>
                          <span>{p.assists} Ast</span>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus ${p.name} dari skuad?`)) {
                              onDeletePlayer(p.id);
                              showToast(`Pemain ${p.name} berhasil dihapus.`);
                            }
                          }}
                          className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PERTANDINGAN */}
          {activeTab === 'pertandingan' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-white mb-2">Edit Skor & Status Pertandingan</h4>
              <div className="space-y-3">
                {matches.map((m) => (
                  <div key={m.id} className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left w-full sm:w-auto">
                      <div className="flex items-center gap-2 text-zinc-400 text-[11px] mb-1">
                        <span className="text-red-400 font-semibold">{m.round}</span>
                        <span>·</span>
                        <span>{m.date}</span>
                      </div>
                      <div className="font-bold text-white text-sm">
                        PSN NGADA vs {m.opponent} ({m.homeOrAway})
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <select
                        value={m.status}
                        onChange={(e) => {
                          onUpdateMatch(m.id, { status: e.target.value as any });
                          showToast(`Status pertandingan berhasil diubah menjadi ${e.target.value}`);
                        }}
                        className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-white text-xs"
                      >
                        <option value="Akan Datang">Akan Datang</option>
                        <option value="Live">Live</option>
                        <option value="Selesai">Selesai</option>
                      </select>

                      {m.status === 'Selesai' && (
                        <div className="flex items-center gap-1 font-mono">
                          <input
                            type="number"
                            min="0"
                            className="w-12 bg-zinc-950 border border-zinc-800 rounded text-center py-1 text-white"
                            value={m.psnScore ?? 0}
                            onChange={(e) => onUpdateMatch(m.id, { psnScore: parseInt(e.target.value) || 0 })}
                          />
                          <span className="text-zinc-500">:</span>
                          <input
                            type="number"
                            min="0"
                            className="w-12 bg-zinc-950 border border-zinc-800 rounded text-center py-1 text-white"
                            value={m.opponentScore ?? 0}
                            onChange={(e) => onUpdateMatch(m.id, { opponentScore: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: KLASEMEN */}
          {activeTab === 'klasemen' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-white mb-2">Edit Poin & Rekor Klasemen Grup</h4>
              <div className="space-y-2">
                {standings.map((s) => (
                  <div key={s.club} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-red-500 w-5">#{s.pos}</span>
                      <span className="font-bold text-white">{s.club}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-zinc-300">
                      <div className="flex items-center gap-1">
                        <span className="text-zinc-500 text-[10px]">M:</span>
                        <input
                          type="number"
                          className="w-10 bg-zinc-950 border border-zinc-800 rounded px-1 py-0.5 text-center"
                          value={s.won}
                          onChange={(e) => onUpdateStanding(s.club, { won: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-zinc-500 text-[10px]">Poin:</span>
                        <input
                          type="number"
                          className="w-12 bg-zinc-950 border border-zinc-800 rounded px-1 py-0.5 text-center font-bold text-red-400"
                          value={s.points}
                          onChange={(e) => onUpdateStanding(s.club, { points: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: JSON BACKUP / RESTORE */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-sm text-white mb-1">Cadangan Data (Backup & Restore)</h4>
                <p className="text-zinc-400 text-xs">
                  Anda dapat mengunduh seluruh data klub dalam format JSON atau memulihkan data dari teks JSON yang telah disimpan sebelumnya.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg cursor-pointer"
                >
                  <Download className="w-4 h-4 text-red-500" />
                  Unduh File Backup JSON
                </button>

                <button
                  onClick={() => {
                    if (confirm('Apakah Anda yakin ingin mengembalikan seluruh data ke pengaturan awal (default)?')) {
                      onResetToDefault();
                      showToast('Database berhasil direset ke pengaturan awal default.');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 font-bold rounded-lg cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset ke Data Default
                </button>

                {onClearAllData && (
                  <button
                    onClick={() => {
                      if (confirm('Apakah Anda yakin ingin MENGOSONGKAN SELURUH DATA pemain, jadwal, klasemen, berita, dan suporter? Tindakan ini tidak dapat dibatalkan.')) {
                        onClearAllData();
                        showToast('Seluruh data pemain, jadwal, klasemen, berita, dan suporter telah berhasil dikosongkan.');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-950/80 hover:bg-red-900 border border-red-700 text-red-200 font-bold rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                    Kosongkan Semua Data
                  </button>
                )}
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <label className="block font-semibold text-zinc-300 mb-1">
                  Tempel Data JSON untuk Impor:
                </label>
                <textarea
                  rows={5}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"clubInfo": {...}, "players": [...], ...}'
                  className="w-full bg-zinc-900 font-mono text-zinc-300 border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-red-500"
                />

                {jsonError && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {jsonError}
                  </p>
                )}

                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleImport}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    Impor & Terapkan Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase rounded-lg cursor-pointer"
          >
            Selesai / Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
