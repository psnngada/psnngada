import React from 'react';
import { ArrowUp, Heart, Shield } from 'lucide-react';
import { ClubInfo } from '../data/clubData';
import { OfficialClubLogo } from './OfficialClubLogo';

interface FooterProps {
  clubInfo: ClubInfo;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ clubInfo, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Profil', href: '#profil' },
    { label: 'Berita', href: '#berita' },
    { label: 'Tim', href: '#tim' },
    { label: 'Jadwal', href: '#jadwal' },
    { label: 'Hasil', href: '#jadwal' },
    { label: 'Klasemen', href: '#klasemen' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-8 border-b border-zinc-900">
          {/* Brand Col */}
          <div className="md:col-span-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 bg-zinc-950 flex-shrink-0 flex items-center justify-center p-0.5">
              <OfficialClubLogo customUrl={clubInfo.crestUrl} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-white tracking-wide">
                {clubInfo.name}
              </h3>
              <p className="text-zinc-400 font-medium text-xs">
                {clubInfo.fullName} – {clubInfo.competition}
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {clubInfo.city}, {clubInfo.province}
              </p>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div className="md:col-span-7 flex flex-wrap items-center justify-start md:justify-end gap-x-6 gap-y-2 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span>© 2026 PSN Ngada. All Rights Reserved.</span>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-zinc-500 hover:text-zinc-300 transition-colors underline cursor-pointer"
            >
              Mode Pengelola Data
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-zinc-500">
              Sepak Bola Bajawa <Heart className="w-3 h-3 text-red-600 fill-red-600" /> Nusa Tenggara Timur
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Kembali ke Atas"
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold uppercase">Atas</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
