import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Ticket, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import { ClubInfo } from '../data/clubData';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubInfo: ClubInfo;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, clubInfo }) => {
  const [pledgeName, setPledgeName] = useState('');
  const [pledged, setPledged] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  if (!isOpen) return null;

  const handlePledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName.trim()) return;
    setPledged(true);
    setTimeout(() => {
      setPledged(false);
      setPledgeName('');
    }, 3500);
  };

  const copyBankInfo = () => {
    navigator.clipboard.writeText('Bank NTT - 1234567890 a.n. PSN Ngada');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-950 border-b border-zinc-800">
          <button
            onClick={onClose}
            aria-label="Tutup Modal"
            className="absolute top-4 right-4 p-2 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
              <Heart className="w-5 h-5 fill-red-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">
              KAMPANYE SUPORTER
            </span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            DUKUNG PSN NGADA DI LIGA 3
          </h3>
          <p className="text-xs text-zinc-300 mt-1 max-w-lg">
            Setiap doa, kehadiran di tribun, dan dukungan dari masyarakat Bajawa serta diaspora NTT
            adalah nyawa perjuangan Laskar Jaramasi.
          </p>
        </div>

        {/* Content Tabs / Options */}
        <div className="p-6 sm:p-8 space-y-6 text-xs">
          {/* Card 1: Ikrar Suporter Digital (Fan Pledge) */}
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
            <h4 className="font-bold text-sm text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Ikrar Suporter Setia (Fan Pledge)
            </h4>
            <p className="text-zinc-400 mb-4">
              Daftarkan nama Anda sebagai pendukung kehormatan PSN Ngada musim {clubInfo.season}.
            </p>

            <form onSubmit={handlePledge} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Masukkan nama lengkap Anda..."
                value={pledgeName}
                onChange={(e) => setPledgeName(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Ikrar Sekarang
              </button>
            </form>

            {pledged && (
              <div className="mt-3 flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-400 rounded-lg">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Terima kasih! Nama Anda resmi tercatat dalam barisan doa suporter PSN Ngada.</span>
              </div>
            )}
          </div>

          {/* Card 2: Merchandise Resmi & Jersey */}
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-red-500" />
                Jersey & Merchandise Resmi
              </h4>
              <span className="text-[10px] font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">
                Official Store
              </span>
            </div>
            <p className="text-zinc-400 mb-3">
              Miliki jersey kandang merah-putih edisi Liga 3 Nasional, syal suporter, dan topi klub resmi untuk mendukung langsung di stadion.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
              <span className="text-zinc-300 font-semibold">Toko Resmi: Sekretariat Stadion Lebijaga</span>
              <a
                href={clubInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold uppercase transition-colors"
              >
                Pesan via WhatsApp
              </a>
            </div>
          </div>

          {/* Card 3: Tiket Pertandingan Stadion Lebijaga */}
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
            <h4 className="font-bold text-sm text-white mb-1 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-blue-400" />
              Informasi Tiket Pertandingan Kandang
            </h4>
            <p className="text-zinc-400 mb-3">
              Tiket laga kandang di Stadion Lebijaga tersedia pada hari pertandingan di loket resmi stadion. Datang lebih awal dan patuhi tata tertib fair play suporter.
            </p>
            <div className="grid grid-cols-2 gap-3 text-zinc-300">
              <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 text-center">
                <span className="text-zinc-400 block text-[11px]">Tribun Terbuka</span>
                <span className="font-bold text-sm">Rp 15.000 / Laga</span>
              </div>
              <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 text-center">
                <span className="text-zinc-400 block text-[11px]">Tribun Utama (VIP)</span>
                <span className="font-bold text-sm">Rp 35.000 / Laga</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold uppercase tracking-wider cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
